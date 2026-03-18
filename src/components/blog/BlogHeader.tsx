'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { BlogPostMeta } from '@/lib/blog-types'
import { formatDate } from '@/lib/blog-types'

interface BlogHeaderProps {
  post: BlogPostMeta
  className?: string
}

export function BlogHeader({ post, className }: BlogHeaderProps) {
  return (
    <motion.header
      className={cn('mb-10 md:mb-12', className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Back link */}
      <Link
        href="/blogs"
        className="inline-flex items-center gap-2 text-accent hover:text-accent-light font-mono text-sm mb-8 group transition-colors"
      >
        <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
        <span>Back to Blogs</span>
      </Link>

      {/* Technical label */}
      <div className="label-tech mb-4">{`// POST.tsx`}</div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.map((tag) => (
          <Link
            key={tag}
            href={`/blogs/tag/${tag.toLowerCase()}`}
            className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-accent border border-accent/30 bg-accent/5 hover:bg-accent/10 hover:border-accent/50 transition-colors"
          >
            {tag}
          </Link>
        ))}
      </div>

      {/* Title */}
      <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight tracking-tight">
        {post.title}
      </h1>

      {/* Meta info */}
      <div className="flex flex-wrap items-center gap-4 text-foreground-secondary font-mono text-sm">
        <time dateTime={post.date} className="flex items-center gap-2">
          <span className="text-accent">⏱</span>
          {formatDate(post.date)}
        </time>
        <span className="text-border-light">|</span>
        <span className="flex items-center gap-2">
          <span className="text-accent">📖</span>
          {post.readingTime}
        </span>
      </div>

      {/* Decorative line */}
      <div className="mt-8 h-px bg-gradient-to-r from-accent/50 via-border to-transparent" />
    </motion.header>
  )
}
