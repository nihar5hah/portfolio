import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { TagPage } from './TagPage'
import { getPostsByTag, getAllTags } from '@/lib/blog'

interface Props {
  params: Promise<{ tag: string }>
}

export async function generateStaticParams() {
  const tags = getAllTags()
  return tags.map((tag) => ({ tag: tag.toLowerCase() }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params
  const decodedTag = decodeURIComponent(tag)
  const capitalizedTag = decodedTag.charAt(0).toUpperCase() + decodedTag.slice(1)

  return {
    title: `Posts tagged "${capitalizedTag}"`,
    description: `All blog posts tagged with ${capitalizedTag}`,
    openGraph: {
      title: `Posts tagged "${capitalizedTag}" | Nihar Shah`,
      description: `All blog posts tagged with ${capitalizedTag}`,
      type: 'website',
    },
  }
}

export default async function TagFilterPage({ params }: Props) {
  const { tag } = await params
  const decodedTag = decodeURIComponent(tag)
  const posts = getPostsByTag(decodedTag)
  const allTags = getAllTags()

  if (posts.length === 0) {
    notFound()
  }

  return (
    <TagPage
      tag={decodedTag}
      posts={posts}
      allTags={allTags}
    />
  )
}
