'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { BlogPostMeta } from '@/lib/blog-types'

interface BlogCardProps {
  post: BlogPostMeta
  index?: number
  className?: string
}

export function BlogCard({ post, index = 0, className }: BlogCardProps) {
  return (
    <motion.article
      className={cn('group', className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Link 
        href={`/blogs/${post.slug}`} 
        className="block min-h-[280px] touch-manipulation"
      >
        <div
          className={cn(
            'relative h-full p-6 md:p-6 bg-background-secondary border border-border',
            'transition-all duration-300 ease-out',
            'hover:border-accent/50 hover:bg-background-tertiary',
            'group-hover:translate-x-[-2px] group-hover:translate-y-[-2px]',
            'active:translate-x-[0px] active:translate-y-[0px]', // Touch feedback
          )}
          style={{
            boxShadow: '4px 4px 0 rgba(99, 102, 241, 0.15)',
          }}
        >
          {/* Data flow effect on hover */}
          <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(99, 102, 241, 0.05) 50%, transparent 100%)',
                backgroundSize: '200% 100%',
                animation: 'dataFlow 2s linear infinite',
              }}
            />
          </div>

          {/* Cover image (if available) */}
          {post.coverImage && (
            <div className="relative w-full h-40 mb-4 overflow-hidden border border-border">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-accent border border-accent/30 bg-accent/5"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-accent transition-colors line-clamp-2">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-foreground-secondary text-sm leading-relaxed mb-4 line-clamp-3">
            {post.excerpt}
          </p>

          {/* Meta info */}
          <div className="flex items-center gap-3 text-xs font-mono text-foreground-muted">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </time>
            <span className="text-accent">•</span>
            <span>{post.readingTime}</span>
          </div>

          {/* Arrow indicator */}
          <div className="absolute bottom-6 right-6 text-accent opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1">
            →
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
