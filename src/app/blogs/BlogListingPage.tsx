'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Footer } from '@/components/layout/Footer'
import { Container } from '@/components/layout/Container'
import { FeaturedPost, BlogCard } from '@/components/blog'
import type { BlogPostMeta } from '@/lib/blog-types'

interface BlogListingPageProps {
  featuredPost: BlogPostMeta | null
  posts: BlogPostMeta[]
  tags: string[]
}

/**
 * Filter posts by search query (title, excerpt, tags)
 */
function filterPosts(posts: BlogPostMeta[], query: string): BlogPostMeta[] {
  if (!query.trim()) return posts
  
  const lowerQuery = query.toLowerCase()
  return posts.filter(post => 
    post.title.toLowerCase().includes(lowerQuery) ||
    post.excerpt.toLowerCase().includes(lowerQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  )
}

export function BlogListingPage({ featuredPost, posts, tags }: BlogListingPageProps) {
  const [searchQuery, setSearchQuery] = useState('')
  
  // Filter posts based on search query
  const filteredPosts = useMemo(
    () => filterPosts(posts, searchQuery),
    [posts, searchQuery]
  )
  
  // Check if featured post matches search
  const showFeaturedPost = !searchQuery.trim() || (
    featuredPost && (
      featuredPost.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      featuredPost.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      featuredPost.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  )
  
  const hasPosts = featuredPost || posts.length > 0
  const hasResults = (showFeaturedPost && featuredPost) || filteredPosts.length > 0
  
  return (
    <>
      <main className="min-h-screen pt-24 pb-16">
        <Container>
          {/* Header section */}
          <motion.div
            className="mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Back to portfolio */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-accent hover:text-accent-light font-mono text-sm mb-8 group transition-colors"
            >
              <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
              <span>Back to Portfolio</span>
            </Link>

            {/* Technical label */}
            <div className="label-tech mb-4">{`// BLOGS.tsx`}</div>

            {/* Title */}
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 tracking-tight">
              Thoughts &<br />
              <span className="text-accent">Insights</span>
            </h1>

            {/* Subtitle */}
            <p className="text-foreground-secondary text-lg md:text-xl max-w-2xl">
              Weekly reflections on AI systems, building products, and the journey of an engineer.
            </p>
          </motion.div>

          {/* Search bar */}
          {hasPosts && (
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative max-w-xl">
                <input
                  type="text"
                  placeholder="Search posts by title, content, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 min-h-[44px] bg-background-secondary border border-border text-foreground placeholder:text-foreground-muted focus:border-accent/50 focus:outline-none transition-colors font-mono text-sm touch-manipulation"
                  aria-label="Search blog posts"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-muted hover:text-accent transition-colors px-2 py-1 min-h-[44px] min-w-[44px] flex items-center justify-center"
                    aria-label="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {/* Tags filter */}
          {tags.length > 0 && (
            <motion.div
              className="mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex flex-wrap gap-2">
                <span className="text-foreground-muted font-mono text-xs uppercase tracking-wider mr-2 py-1">
                  Filter:
                </span>
                {tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blogs/tag/${tag.toLowerCase()}`}
                    className="px-3 py-1 text-xs font-mono uppercase tracking-wider text-foreground-secondary border border-border bg-background-secondary hover:border-accent/50 hover:text-accent transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}

          {hasPosts ? (
            <>
              {/* Featured post */}
              {showFeaturedPost && featuredPost && (
                <div className="mb-12">
                  <FeaturedPost post={featuredPost} />
                </div>
              )}

              {/* Blog grid */}
              {filteredPosts.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPosts.map((post, index) => (
                    <BlogCard key={post.slug} post={post} index={index} />
                  ))}
                </div>
              )}
              
              {/* No results state */}
              {!hasResults && searchQuery && (
                <motion.div
                  className="text-center py-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className="inline-block p-8 border border-border bg-background-secondary mb-6"
                    style={{ boxShadow: '4px 4px 0 rgba(99, 102, 241, 0.15)' }}
                  >
                    <div className="text-6xl mb-4">🔍</div>
                    <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
                      No posts found
                    </h2>
                    <p className="text-foreground-secondary max-w-md mb-4">
                      No posts match &quot;{searchQuery}&quot;. Try a different search term.
                    </p>
                    <button
                      onClick={() => setSearchQuery('')}
                      className="px-4 py-2 bg-accent text-white hover:bg-accent-light transition-colors font-mono text-sm"
                    >
                      Clear search
                    </button>
                  </div>
                </motion.div>
              )}
            </>
          ) : (
            /* Empty state */
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div
                className="inline-block p-8 border border-border bg-background-secondary mb-6"
                style={{ boxShadow: '4px 4px 0 rgba(99, 102, 241, 0.15)' }}
              >
                <div className="text-6xl mb-4">📝</div>
                <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
                  Coming Soon
                </h2>
                <p className="text-foreground-secondary max-w-md">
                  I&apos;m working on some exciting content. Check back soon for insights on AI, technology, and more.
                </p>
              </div>
            </motion.div>
          )}
        </Container>
      </main>
      <Footer />
    </>
  )
}
