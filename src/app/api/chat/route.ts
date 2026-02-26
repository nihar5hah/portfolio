import { NextRequest } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { profileContext } from '@/data/profile-context'

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || ''
const client = new GoogleGenerativeAI(GEMINI_API_KEY)

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

function toSseStream(text: string) {
  const encoder = new TextEncoder()
  return new ReadableStream({
    start(controller) {
      const payload = JSON.stringify({
        choices: [{ delta: { content: text } }],
      })
      controller.enqueue(encoder.encode(`data: ${payload}\n\n`))
      controller.enqueue(encoder.encode('data: [DONE]\n\n'))
      controller.close()
    },
  })
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || 'anonymous'
  if (!rateLimit(ip)) {
    return new Response('Rate limit exceeded', { status: 429 })
  }

  const { messages } = await req.json()
  const userMessage = messages?.[messages.length - 1]?.content || ''

  if (!GEMINI_API_KEY) {
    return new Response('GEMINI_API_KEY not configured', { status: 500 })
  }

  try {
    const model = client.getGenerativeModel({ model: 'gemini-2.5-flash' })

    const response = await model.generateContent([
      {
        text: profileContext,
      },
      {
        text: userMessage,
      },
    ])

    // Extract text from response
    const respObj = response as any
    const text =
      respObj.response?.text?.() ||
      respObj.response?.text ||
      respObj.text?.() ||
      respObj.text ||
      'No response'
    return new Response(toSseStream(text), {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        Connection: 'keep-alive',
      },
    })
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err)
    console.error('[chat API] error:', errorMsg)
    return new Response(`Agent error: ${errorMsg}`, { status: 502 })
  }
}
