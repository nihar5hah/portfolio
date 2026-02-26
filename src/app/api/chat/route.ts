import { NextRequest } from 'next/server'

const GATEWAY_URL = process.env.BEGU_GATEWAY_URL || 'http://100.105.130.84:18789'
const SESSION_KEY = process.env.BEGU_SESSION_KEY || 'agent:begu-agent:main'

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

  const response = await fetch(`${GATEWAY_URL}/api/sessions/send`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sessionKey: SESSION_KEY,
      message: userMessage,
      timeoutSeconds: 0,
    }),
  })

  if (!response.ok) {
    return new Response('Begu agent request failed', { status: 502 })
  }

  const data = await response.json().catch(() => null)
  const reply =
    data?.response || data?.message || data?.data?.response || data?.result || data?.text || ''

  if (!reply) {
    return new Response('Begu agent returned no response', { status: 502 })
  }

  return new Response(toSseStream(reply), {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  })
}
