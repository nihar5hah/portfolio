import { createClient } from '@supabase/supabase-js'
import { pipeline } from '@xenova/transformers'
import fs from 'fs'
import path from 'path'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing Supabase env vars')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceRoleKey)

let embeddingModel: any = null
async function getEmbeddingModel() {
  if (!embeddingModel) {
    embeddingModel = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2')
  }
  return embeddingModel
}

const chunkText = (text: string, size = 1500) => {
  const chunks: string[] = []
  let start = 0
  while (start < text.length) {
    chunks.push(text.slice(start, start + size))
    start += size
  }
  return chunks
}

const buildContent = async () => {
  const aboutPath = path.join(process.cwd(), 'src/components/sections/AboutNew.tsx')
  const aboutSource = fs.readFileSync(aboutPath, 'utf8')

  const { resume } = await import('../src/data/resume')
  const { projects } = await import('../src/data/projects')
  const { experiences } = await import('../src/data/experience')
  const { skillCategories } = await import('../src/data/skills')
  const { siteConfig } = await import('../src/data/social')
  const { chatbotContext } = await import('../src/data/chatbot-context')

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
    content: JSON.stringify(skillCategories, null, 2),
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
  const contentItems = await buildContent()

  for (const item of contentItems) {
    const chunks = chunkText(item.content)
    for (const chunk of chunks) {
      const model = await getEmbeddingModel()
      const output = await model(chunk, { pooling: 'mean', normalize: true })
      const embedding = Array.from(output.data as Float32Array)

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
