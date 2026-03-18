'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { BlogPostMeta } from '@/lib/blog-types'

interface FeaturedPostProps {
  post: BlogPostMeta
  className?: string
}

export function FeaturedPost({ post, className }: FeaturedPostProps) {
  return (
    <motion.article
      className={cn('group', className)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/blogs/${post.slug}`} className="block">
        <div
          className={cn(
            'relative overflow-hidden bg-background-secondary border border-border',
            'transition-all duration-300 ease-out',
            'hover:border-accent/50',
            'group-hover:translate-x-[-4px] group-hover:translate-y-[-4px]',
          )}
          style={{
            boxShadow: '8px 8px 0 rgba(99, 102, 241, 0.2)',
          }}
        >
          {/* Data flow effect */}
          <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(99, 102, 241, 0.08) 50%, transparent 100%)',
                backgroundSize: '200% 100%',
                animation: 'dataFlow 3s linear infinite',
              }}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-0">
            {/* Cover image or gradient placeholder */}
            <div className="relative h-64 md:h-80 overflow-hidden border-b md:border-b-0 md:border-r border-border">
              {post.coverImage ? (
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-background-tertiary to-background-secondary grid-brutalist" />
              )}
              
              {/* Featured badge */}
              <div className="absolute top-4 left-4 px-3 py-1 bg-accent text-background text-xs font-mono uppercase tracking-wider">
                Featured
              </div>
            </div>

            {/* Content */}
            <div className="p-8 md:p-10 flex flex-col justify-center">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-accent border border-accent/30 bg-accent/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 group-hover:text-accent transition-colors leading-tight">
                {post.title}
              </h2>

              {/* Excerpt */}
              <p className="text-foreground-secondary text-base md:text-lg leading-relaxed mb-6 line-clamp-3">
                {post.excerpt}
              </p>

              {/* Meta info */}
              <div className="flex items-center gap-4 text-sm font-mono text-foreground-muted">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </time>
                <span className="text-accent">•</span>
                <span>{post.readingTime}</span>
              </div>

              {/* Read more indicator */}
              <div className="mt-6 flex items-center gap-2 text-accent font-mono text-sm group-hover:gap-4 transition-all duration-300">
                <span>Read article</span>
                <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
