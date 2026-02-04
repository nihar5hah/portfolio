'use client'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { cva, type VariantProps } from 'class-variance-authority'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-3 py-1 text-sm font-medium transition-all duration-300',
  {
    variants: {
      variant: {
        default: 'glass-tertiary text-foreground-secondary',
        accent:
          'bg-accent/10 text-accent border border-accent/20 hover:border-accent/40',
        outline:
          'bg-transparent text-foreground-secondary border border-border hover:border-accent/30',
        glow: 'bg-accent/10 text-accent border border-accent/20 shadow-lg shadow-accent/20',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  animate?: boolean
}

export function Badge({
  className,
  variant,
  animate = false,
  children,
}: BadgeProps) {
  if (animate) {
    return (
      <motion.span
        className={cn(badgeVariants({ variant }), className)}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.span>
    )
  }

  return (
    <span className={cn(badgeVariants({ variant }), className)}>
      {children}
    </span>
  )
}
