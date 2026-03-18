import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import type { BlogFrontmatter, BlogPost, BlogPostMeta } from './blog-types'

// Re-export types and pure utilities for convenience
export type { BlogFrontmatter, BlogPost, BlogPostMeta } from './blog-types'
export { formatDate, extractHeadings } from './blog-types'

const BLOG_DIR = path.join(process.cwd(), 'src/content/blogs')

/**
 * Get all blog post slugs (for static generation)
 */
export function getAllBlogSlugs(): string[] {
  // Create directory if it doesn't exist
  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true })
    return []
  }
  
  const files = fs.readdirSync(BLOG_DIR)
  return files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''))
}

/**
 * Get a single blog post by slug
 */
export function getBlogPost(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`)
  
  if (!fs.existsSync(filePath)) {
    return null
  }
  
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  const frontmatter = data as BlogFrontmatter
  const stats = readingTime(content)
  
  return {
    ...frontmatter,
    slug,
    readingTime: stats.text,
    content,
  }
}

/**
 * Get all blog posts (sorted by date, newest first)
 */
export function getAllBlogPosts(): BlogPost[] {
  const slugs = getAllBlogSlugs()
  const posts = slugs
    .map((slug) => getBlogPost(slug))
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  
  return posts
}

/**
 * Get all blog post metadata (without content, for listings)
 */
export function getAllBlogPostsMeta(): BlogPostMeta[] {
  return getAllBlogPosts().map(({ content, ...meta }) => meta)
}

/**
 * Get the featured post (or latest if none marked as featured)
 */
export function getFeaturedPost(): BlogPostMeta | null {
  const posts = getAllBlogPostsMeta()
  
  if (posts.length === 0) return null
  
  // Find explicitly featured post
  const featured = posts.find((post) => post.featured)
  if (featured) return featured
  
  // Fall back to latest post
  return posts[0]
}

/**
 * Get all posts except the featured one
 */
export function getNonFeaturedPosts(): BlogPostMeta[] {
  const featured = getFeaturedPost()
  const posts = getAllBlogPostsMeta()
  
  if (!featured) return posts
  
  return posts.filter((post) => post.slug !== featured.slug)
}

/**
 * Get all unique tags
 */
export function getAllTags(): string[] {
  const posts = getAllBlogPosts()
  const tagsSet = new Set<string>()
  
  posts.forEach((post) => {
    post.tags.forEach((tag) => tagsSet.add(tag))
  })
  
  return Array.from(tagsSet).sort()
}

/**
 * Get posts by tag
 */
export function getPostsByTag(tag: string): BlogPostMeta[] {
  return getAllBlogPostsMeta().filter((post) =>
    post.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  )
}

/**
 * Get previous and next posts for navigation
 */
export function getAdjacentPosts(slug: string): {
  previous: BlogPostMeta | null
  next: BlogPostMeta | null
} {
  const posts = getAllBlogPostsMeta()
  const currentIndex = posts.findIndex((post) => post.slug === slug)
  
  if (currentIndex === -1) {
    return { previous: null, next: null }
  }
  
  return {
    previous: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null,
    next: currentIndex > 0 ? posts[currentIndex - 1] : null,
  }
}
