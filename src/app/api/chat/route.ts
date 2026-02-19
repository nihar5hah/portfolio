import { NextRequest } from 'next/server'
import { openai } from '@ai-sdk/openai'
import { streamText, embed } from 'ai'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase env variables')
}

const supabase = createClient(supabaseUrl, supabaseKey)

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

  const { embedding } = await embed({
    model: openai.embedding('text-embedding-3-small'),
    value: userMessage,
  })

  const { data: matches } = await supabase.rpc('match_portfolio_embeddings', {
    query_embedding: embedding,
    match_count: 5,
  })

  const context = (matches || [])
    .map((m: any) => m.content)
    .join('\n---\n')

  const system = `You are Nihar Shah's personal assistant chatbot. You ONLY answer questions about Nihar Shah — his background, skills, projects, experience, education, and how to contact him.

If asked about anything else, politely say: "I can only help with questions about Nihar Shah. Feel free to ask about his projects, experience, or skills!"

Be concise, friendly, and helpful. Use the provided context to answer accurately. If the context doesn't contain the answer, say you don't have that information.`

  const result = await streamText({
    model: openai('gpt-4o-mini'),
    system,
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: `Context:\n${context}\n\nQuestion: ${userMessage}` },
    ],
  })

  return result.toTextStreamResponse()
}
