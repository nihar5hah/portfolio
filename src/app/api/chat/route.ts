import { NextRequest } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { resume } from '@/data/resume'

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

function buildResumeContext(): string {
  const exp = resume.experience
    .map(
      (e) =>
        `${e.company} - ${e.role} (${e.period})\n${e.achievements?.join('\n') || e.description}`
    )
    .join('\n\n')

  const proj = resume.projects
    .map((p) => `${p.title}\n${p.longDescription || p.description}`)
    .join('\n\n')

  const skills = resume.skills
    .map((cat) => `${cat.title}: ${cat.skills.map((s) => s.name).join(', ')}`)
    .join('\n')

  return `
# About Nihar Shah

## Education
${resume.education.map((e) => `${e.degree} from ${e.school} (${e.period})`).join('\n')}

## Experience
${exp}

## Projects
${proj}

## Skills
${skills}

## Certifications
${resume.certifications.join('\n')}

---
You are Nihar's AI assistant. Answer questions about his background, experience, projects, and skills based on the information above. Be helpful, concise, and accurate. Only answer questions related to Nihar's professional profile.
`.trim()
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
    const model = client.getGenerativeModel({ model: 'gemini-2.5-flash-preview' })

    const response = await model.generateContent([
      {
        text: buildResumeContext(),
      },
      {
        text: userMessage,
      },
    ])

    const text = response.content.parts[0]?.text || 'No response'
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
