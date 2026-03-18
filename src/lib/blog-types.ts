// Blog post frontmatter type
export interface BlogFrontmatter {
  title: string
  date: string
  tags: string[]
  excerpt: string
  coverImage?: string
  featured?: boolean
}

// Full blog post with computed fields
export interface BlogPost extends BlogFrontmatter {
  slug: string
  readingTime: string
  content: string
}

// Blog post metadata (without content, for listings)
export interface BlogPostMeta extends Omit<BlogPost, 'content'> {}

/**
 * Format date for display
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Extract headings from MDX content for table of contents
 */
export function extractHeadings(content: string): { id: string; text: string; level: number }[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm
  const headings: { id: string; text: string; level: number }[] = []
  
  let match
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const text = match[2].trim()
    // Generate slug-style ID (same as rehype-slug)
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
    
    headings.push({ id, text, level })
  }
  
  return headings
}
