'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Container } from '@/components/layout/Container'
import { BlogCard } from '@/components/blog'
import type { BlogPostMeta } from '@/lib/blog-types'

interface TagPageProps {
  tag: string
  posts: BlogPostMeta[]
  allTags: string[]
}

export function TagPage({ tag, posts, allTags }: TagPageProps) {
  const capitalizedTag = tag.charAt(0).toUpperCase() + tag.slice(1)

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-16">
        <Container>
          {/* Header section */}
          <motion.div
            className="mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Back to blogs */}
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-accent hover:text-accent-light font-mono text-sm mb-8 group transition-colors"
            >
              <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
              <span>Back to Blogs</span>
            </Link>

            {/* Technical label */}
            <div className="label-tech mb-4">{`// TAGGED: ${capitalizedTag.toUpperCase()}`}</div>

            {/* Title */}
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 tracking-tight">
              Posts tagged with{' '}
              <span className="text-accent">&quot;{capitalizedTag}&quot;</span>
            </h1>

            {/* Post count */}
            <p className="text-foreground-secondary text-lg">
              {posts.length} {posts.length === 1 ? 'post' : 'posts'} found
            </p>
          </motion.div>

          {/* Other tags */}
          {allTags.length > 1 && (
            <motion.div
              className="mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex flex-wrap gap-2">
                <span className="text-foreground-muted font-mono text-xs uppercase tracking-wider mr-2 py-1">
                  Other tags:
                </span>
                {allTags
                  .filter((t) => t.toLowerCase() !== tag.toLowerCase())
                  .map((t) => (
                    <Link
                      key={t}
                      href={`/blogs/tag/${t.toLowerCase()}`}
                      className="px-3 py-1 text-xs font-mono uppercase tracking-wider text-foreground-secondary border border-border bg-background-secondary hover:border-accent/50 hover:text-accent transition-colors"
                    >
                      {t}
                    </Link>
                  ))}
              </div>
            </motion.div>
          )}

          {/* Blog grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <BlogCard key={post.slug} post={post} index={index} />
            ))}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  )
}
