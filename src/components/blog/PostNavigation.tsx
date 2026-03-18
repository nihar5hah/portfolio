'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { BlogPostMeta } from '@/lib/blog-types'

interface PostNavigationProps {
  previous: BlogPostMeta | null
  next: BlogPostMeta | null
  className?: string
}

export function PostNavigation({ previous, next, className }: PostNavigationProps) {
  if (!previous && !next) return null

  return (
    <nav className={cn('border-t border-border pt-8 mt-12', className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Previous post */}
        {previous ? (
          <Link href={`/blogs/${previous.slug}`} className="group">
            <motion.div
              className={cn(
                'h-full p-6 bg-background-secondary border border-border',
                'transition-all duration-300',
                'hover:border-accent/50',
                'group-hover:translate-x-[-2px] group-hover:translate-y-[-2px]'
              )}
              style={{
                boxShadow: '4px 4px 0 rgba(99, 102, 241, 0.15)',
              }}
              whileHover={{ x: -2, y: -2 }}
            >
              <div className="flex items-center gap-2 text-accent font-mono text-xs uppercase tracking-wider mb-3">
                <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
                Previous Post
              </div>
              <h4 className="font-display text-lg font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-2">
                {previous.title}
              </h4>
            </motion.div>
          </Link>
        ) : (
          <div /> // Empty div to maintain grid layout
        )}

        {/* Next post */}
        {next ? (
          <Link href={`/blogs/${next.slug}`} className="group md:text-right">
            <motion.div
              className={cn(
                'h-full p-6 bg-background-secondary border border-border',
                'transition-all duration-300',
                'hover:border-accent/50',
                'group-hover:translate-x-[2px] group-hover:translate-y-[-2px]'
              )}
              style={{
                boxShadow: '4px 4px 0 rgba(99, 102, 241, 0.15)',
              }}
              whileHover={{ x: 2, y: -2 }}
            >
              <div className="flex items-center justify-end gap-2 text-accent font-mono text-xs uppercase tracking-wider mb-3">
                Next Post
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </div>
              <h4 className="font-display text-lg font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-2">
                {next.title}
              </h4>
            </motion.div>
          </Link>
        ) : (
          <div /> // Empty div to maintain grid layout
        )}
      </div>
    </nav>
  )
}
