import { createClient } from '@supabase/supabase-js'
import { embed } from 'ai'
import { openai } from '@ai-sdk/openai'
import { resume } from '../src/data/resume'
import { projects } from '../src/data/projects'
import { experiences } from '../src/data/experience'
import { skills } from '../src/data/skills'
import { siteConfig } from '../src/data/social'
import { chatbotContext } from '../src/data/chatbot-context'
import fs from 'fs'
import path from 'path'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const openaiKey = process.env.OPENAI_API_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase env vars')
  process.exit(1)
}
if (!openaiKey) {
  console.error('Missing OPENAI_API_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

const chunkText = (text: string, size = 1500) => {
  const chunks: string[] = []
  let start = 0
  while (start < text.length) {
    chunks.push(text.slice(start, start + size))
    start += size
  }
  return chunks
}

const buildContent = () => {
  const aboutPath = path.join(process.cwd(), 'src/components/sections/AboutNew.tsx')
  const aboutSource = fs.readFileSync(aboutPath, 'utf8')

  const payloads: { content: string; source: string; metadata?: Record<string, unknown> }[] = []

  payloads.push({
    content: JSON.stringify(resume, null, 2),
    source: 'resume',
  })
  payloads.push({
    content: JSON.stringify(projects, null, 2),
    source: 'projects',
  })
  payloads.push({
    content: JSON.stringify(experiences, null, 2),
    source: 'experience',
  })
  payloads.push({
    content: JSON.stringify(skills, null, 2),
    source: 'skills',
  })
  payloads.push({
    content: JSON.stringify(siteConfig, null, 2),
    source: 'social',
  })
  payloads.push({
    content: JSON.stringify(chatbotContext, null, 2),
    source: 'context',
  })
  payloads.push({
    content: aboutSource,
    source: 'about',
  })

  return payloads
}

const main = async () => {
  const contentItems = buildContent()

  for (const item of contentItems) {
    const chunks = chunkText(item.content)
    for (const chunk of chunks) {
      const { embedding } = await embed({
        model: openai.embedding('text-embedding-3-small'),
        value: chunk,
      })

      await supabase.from('portfolio_embeddings').insert({
        content: chunk,
        embedding,
        metadata: item.metadata || {},
        source: item.source,
      })
    }
  }

  console.log('Embedding sync complete')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
