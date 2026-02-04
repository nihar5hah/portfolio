'use client'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { glassReveal, hoverLiftSubtle, easings } from '@/components/motion/animations'

type GlassVariant = 'primary' | 'secondary' | 'tertiary'

interface CardProps {
  children: React.ReactNode
  className?: string
  variant?: GlassVariant
  hover?: boolean
  animate?: boolean
  edge?: boolean
  vibrancy?: boolean
}

const glassClasses: Record<GlassVariant, string> = {
  primary: 'glass-primary',
  secondary: 'glass-secondary',
  tertiary: 'glass-tertiary',
}

export function Card({
  children,
  className,
  variant = 'secondary',
  hover = true,
  animate = true,
  edge = false,
  vibrancy = false,
}: CardProps) {
  const Component = animate ? motion.div : 'div'

  const animationProps = animate
    ? {
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once: true, margin: '-50px' },
        variants: glassReveal,
        whileHover: hover ? hoverLiftSubtle : undefined,
      }
    : {}

  return (
    <Component
      className={cn(
        'p-6',
        glassClasses[variant],
        hover && 'glass-interactive',
        edge && 'glass-edge',
        vibrancy && 'glass-vibrancy',
        className
      )}
      {...animationProps}
    >
      {children}
    </Component>
  )
}

// Glass panel for larger containers
interface GlassPanelProps {
  children: React.ReactNode
  className?: string
  variant?: GlassVariant
}

export function GlassPanel({
  children,
  className,
  variant = 'primary',
}: GlassPanelProps) {
  return (
    <motion.div
      className={cn('p-8', glassClasses[variant], 'glass-edge glass-vibrancy', className)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: easings.smooth }}
    >
      {children}
    </motion.div>
  )
}

// Tilt card with 3D hover effect
interface TiltCardProps {
  children: React.ReactNode
  className?: string
  variant?: GlassVariant
}

export function TiltCard({
  children,
  className,
  variant = 'secondary',
}: TiltCardProps) {
  return (
    <motion.div
      className={cn(
        'p-6',
        glassClasses[variant],
        'glass-interactive glass-edge',
        'perspective-1000',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: easings.smooth }}
      whileHover={{
        scale: 1.02,
        rotateX: 2,
        rotateY: -2,
        transition: { duration: 0.3 },
      }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  )
}
