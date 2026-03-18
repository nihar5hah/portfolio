import { Metadata } from 'next'
import { BlogListingPage } from './BlogListingPage'
import { getFeaturedPost, getNonFeaturedPosts, getAllTags } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Blogs',
  description: 'Thoughts on AI, technology, and building systems that work. Weekly insights from an Applied AI Systems Builder.',
  openGraph: {
    title: 'Blogs | Nihar Shah',
    description: 'Thoughts on AI, technology, and building systems that work.',
    type: 'website',
  },
}

export default function BlogsPage() {
  const featuredPost = getFeaturedPost()
  const posts = getNonFeaturedPosts()
  const tags = getAllTags()

  return (
    <BlogListingPage
      featuredPost={featuredPost}
      posts={posts}
      tags={tags}
    />
  )
}
