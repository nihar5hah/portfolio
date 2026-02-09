'use client'

import React from 'react'
import { motion } from 'framer-motion'

type GradientDotsProps = React.ComponentProps<typeof motion.div> & {
  /** Dot size (default: 8) */
  dotSize?: number
  /** Spacing between dots (default: 10) */
  spacing?: number
  /** Animation duration (default: 30) */
  duration?: number
  /** Color cycle duration (default: 6) */
  colorCycleDuration?: number
  /** Background color (default: 'var(--background)') */
  backgroundColor?: string
}

export function GradientDots({
  dotSize = 8,
  spacing = 10,
  duration = 30,
  colorCycleDuration = 6,
  backgroundColor = 'var(--background)',
  className,
  ...props
}: GradientDotsProps) {
  const hexSpacing = spacing * 1.732 // Hexagonal spacing calculation

  return (
    <motion.div
      className={`absolute inset-0 ${className}`}
      style={{
        backgroundColor,
        backgroundImage: `
          radial-gradient(circle at 50% 50%, transparent 1.5px, ${backgroundColor} 0 ${dotSize}px, transparent ${dotSize}px),
          radial-gradient(circle at 50% 50%, transparent 1.5px, ${backgroundColor} 0 ${dotSize}px, transparent ${dotSize}px),
          radial-gradient(circle at 50% 50%, rgba(255, 0, 0, 0.6), transparent 50%),
          radial-gradient(circle at 50% 50%, rgba(255, 255, 0, 0.5), transparent 50%),
          radial-gradient(circle at 50% 50%, rgba(0, 255, 0, 0.5), transparent 50%),
          radial-gradient(ellipse at 50% 50%, rgba(0, 100, 255, 0.6), transparent 50%)
        `,
        backgroundSize: `
          ${spacing}px ${hexSpacing}px,
          ${spacing}px ${hexSpacing}px,
          250% 250%,
          250% 250%,
          250% 250%,
          250% ${hexSpacing}px
        `,
        backgroundPosition: `
          0px 0px, ${spacing / 2}px ${hexSpacing / 2}px,
          0% 0%,
          0% 0%,
          0% 0px
        `,
      }}
      {...props}
    />
  )
}
