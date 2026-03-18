'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Heading {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  headings: Heading[]
  className?: string
}

export function TableOfContents({ headings, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')
  const [isExpanded, setIsExpanded] = useState(false)

  // Intersection observer to track active heading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-100px 0px -80% 0px',
        threshold: 0,
      }
    )

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [headings])

  const handleClick = useCallback((id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveId(id)
      setIsExpanded(false) // Close mobile menu after click
    }
  }, [])

  if (headings.length === 0) return null

  return (
    <>
      {/* Desktop: Sticky sidebar */}
      <nav
        className={cn(
          'hidden lg:block sticky top-24 self-start max-h-[calc(100vh-8rem)] overflow-y-auto',
          'w-64 pr-8',
          className
        )}
      >
        <div className="border-l border-border pl-4">
          <div className="label-tech mb-4">On this page</div>
          <ul className="space-y-2">
            {headings.map((heading) => (
              <li
                key={heading.id}
                style={{ paddingLeft: `${(heading.level - 2) * 12}px` }}
              >
                <button
                  onClick={() => handleClick(heading.id)}
                  className={cn(
                    'text-left text-sm font-mono transition-all duration-200 w-full py-1',
                    'hover:text-accent',
                    activeId === heading.id
                      ? 'text-accent border-l-2 border-accent pl-3 -ml-[17px]'
                      : 'text-foreground-muted'
                  )}
                >
                  {heading.text}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile: Collapsible accordion */}
      <div className={cn('lg:hidden mb-8', className)}>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            'w-full min-h-[44px] flex items-center justify-between px-4 py-3',
            'bg-background-secondary border border-border',
            'font-mono text-sm text-foreground-secondary',
            'transition-colors hover:border-accent/30',
            'touch-manipulation' // Improve touch responsiveness
          )}
          aria-expanded={isExpanded}
          aria-label="Table of contents"
        >
          <span className="flex items-center gap-2">
            <span className="text-accent">≡</span>
            On this page
          </span>
          <motion.span
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            ↓
          </motion.span>
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <ul className="bg-background-secondary border border-t-0 border-border px-4 py-3 space-y-2 max-h-[50vh] overflow-y-auto">
                {headings.map((heading) => (
                  <li
                    key={heading.id}
                    style={{ paddingLeft: `${(heading.level - 2) * 12}px` }}
                  >
                    <button
                      onClick={() => handleClick(heading.id)}
                      className={cn(
                        'text-left text-sm font-mono transition-colors w-full py-2 min-h-[44px]',
                        'hover:text-accent touch-manipulation',
                        activeId === heading.id
                          ? 'text-accent'
                          : 'text-foreground-muted'
                      )}
                    >
                      {heading.text}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
