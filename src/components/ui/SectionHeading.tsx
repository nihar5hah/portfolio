'use client'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface SectionHeadingProps {
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({
  title,
  subtitle,
  align = 'left',
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      className={cn(
        'mb-12 md:mb-16',
        align === 'center' && 'text-center',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-foreground mb-4 leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          'text-lg md:text-xl text-foreground-secondary max-w-2xl',
          align === 'center' && 'mx-auto'
        )}>
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
