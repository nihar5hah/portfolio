import { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const KILO_API_KEY = process.env.KILO_API_KEY
const KILO_API_URL = 'https://opencode.ai/zen/v1'

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase env variables')
}
if (!KILO_API_KEY) {
  throw new Error('Missing KILO_API_KEY')
}

const supabase = createClient(supabaseUrl, supabaseKey)

let embeddingModel: any = null
async function getEmbeddingModel() {
  if (!embeddingModel) {
    const { pipeline } = await import('@xenova/transformers')
    embeddingModel = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2')
  }
  return embeddingModel
}

const limiter = new Map<string, { count: number; ts: number }>()
const LIMIT = 10
const WINDOW_MS = 60 * 60 * 1000

function rateLimit(key: string) {
  const now = Date.now()
  const entry = limiter.get(key)
  if (!entry || now - entry.ts > WINDOW_MS) {
    limiter.set(key, { count: 1, ts: now })
    return true
  }
  if (entry.count >= LIMIT) return false
  entry.count += 1
  return true
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || 'anonymous'
  if (!rateLimit(ip)) {
    return new Response('Rate limit exceeded', { status: 429 })
  }

  const { messages } = await req.json()
  const userMessage = messages?.[messages.length - 1]?.content || ''

  const model = await getEmbeddingModel()
  const output = await model(userMessage, { pooling: 'mean', normalize: true })
  const embedding = Array.from(output.data as Float32Array)

  const { data: matches } = await supabase.rpc('match_portfolio_embeddings', {
    query_embedding: embedding,
    match_count: 5,
  })

  const context = (matches || [])
    .map((m: any) => m.content)
    .join('\n---\n')

  const systemPrompt = `You are Nihar Shah's personal assistant chatbot. You ONLY answer questions about Nihar Shah — his background, skills, projects, experience, education, and how to contact him.

If asked about anything else, politely say: "I can only help with questions about Nihar Shah. Feel free to ask about his projects, experience, or skills!"

Be concise, friendly, and helpful. Use the provided context to answer accurately. If the context doesn't contain the answer, say you don't have that information.`

  const contextMessage = `Context:\n${context}\n\nQuestion: ${userMessage}`

  const response = await fetch(`${KILO_API_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${KILO_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'glm-5',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: contextMessage },
      ],
      stream: true,
    }),
  })

  if (!response.ok || !response.body) {
    return new Response('Kilo request failed', { status: 500 })
  }

  return new Response(response.body, {
    status: 200,
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  })
}
