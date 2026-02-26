import { NextRequest } from 'next/server'

const GATEWAY_URL = process.env.BEGU_GATEWAY_URL || 'https://millennium-tones-harmony-levels.trycloudflare.com'
const SESSION_KEY = process.env.BEGU_SESSION_KEY || 'agent:begu:session'
const GATEWAY_TOKEN = process.env.BEGU_TOKEN || ''

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

function extractText(message: unknown): string {
  if (typeof message === 'string') return message
  const m = message as Record<string, unknown>
  if (!m) return ''
  if (typeof m.content === 'string') return m.content
  if (Array.isArray(m.content)) {
    return (m.content as Array<{ type: string; text: string }>)
      .filter((c) => c.type === 'text')
      .map((c) => c.text)
      .join('')
  }
  return ''
}

async function queryOpenClaw(userMessage: string): Promise<string> {
  const wsUrl = GATEWAY_URL.replace(/^https?:\/\//, 'wss://')

  return new Promise((resolve, reject) => {
    const ws = new WebSocket(wsUrl)
    const runId = crypto.randomUUID()
    const pending = new Map<string, { resolve: (v: unknown) => void; reject: (e: Error) => void }>()
    let chatSendAcked = false

    const timeout = setTimeout(() => {
      ws.close()
      reject(new Error('timeout waiting for agent response'))
    }, 60_000)

    function cleanup() {
      clearTimeout(timeout)
      try { ws.close() } catch { /* ignore */ }
    }

    function sendReq(method: string, params: unknown): Promise<unknown> {
      const id = crypto.randomUUID()
      const msg = JSON.stringify({ type: 'req', id, method, params })
      return new Promise((res, rej) => {
        pending.set(id, { resolve: res, reject: rej })
        ws.send(msg)
      })
    }

    ws.onmessage = (event: MessageEvent) => {
      let msg: Record<string, unknown>
      try { msg = JSON.parse(String(event.data)) } catch { return }

      if (msg.type === 'res') {
        const id = msg.id as string
        const handler = pending.get(id)
        if (handler) {
          pending.delete(id)
          if (msg.ok) handler.resolve(msg.payload)
          else handler.reject(new Error((msg.error as Record<string, string>)?.message ?? 'rpc error'))
        }
        return
      }

      if (msg.type === 'event') {
        const evt = msg.event as string
        const payload = msg.payload as Record<string, unknown>

        if (evt === 'connect.challenge') {
          sendReq('connect', {
            minProtocol: 3,
            maxProtocol: 3,
            client: { id: 'portfolio-chatbot', version: '1.0.0', platform: 'server', mode: 'webchat' },
            role: 'operator',
            scopes: ['operator.admin', 'operator.approvals', 'operator.pairing'],
            caps: [],
            auth: { token: GATEWAY_TOKEN },
            userAgent: 'portfolio-chatbot/1.0',
            locale: 'en',
          }).then(() => {
            return sendReq('chat.send', {
              sessionKey: SESSION_KEY,
              message: userMessage,
              deliver: false,
              idempotencyKey: runId,
            })
          }).then(() => {
            chatSendAcked = true
          }).catch((err: Error) => {
            cleanup()
            reject(err)
          })
          return
        }

        if (evt === 'chat' && chatSendAcked) {
          if (payload?.runId !== runId) return
          const state = payload.state as string

          if (state === 'final') {
            const text = extractText(payload.message)
            cleanup()
            resolve(text || 'No response')
          } else if (state === 'error') {
            cleanup()
            reject(new Error((payload.errorMessage as string) ?? 'chat error'))
          } else if (state === 'aborted') {
            cleanup()
            reject(new Error('chat aborted'))
          }
        }
      }
    }

    ws.onerror = () => {
      cleanup()
      reject(new Error('websocket error'))
    }

    ws.onclose = () => {
      if (pending.size > 0) {
        cleanup()
        reject(new Error('websocket closed unexpectedly'))
      }
    }
  })
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || 'anonymous'
  if (!rateLimit(ip)) {
    return new Response('Rate limit exceeded', { status: 429 })
  }

  const { messages } = await req.json()
  const userMessage = messages?.[messages.length - 1]?.content || ''

  try {
    const reply = await queryOpenClaw(userMessage)
    return new Response(toSseStream(reply), {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        Connection: 'keep-alive',
      },
    })
  } catch {
    return new Response('Agent error', { status: 502 })
  }
}
