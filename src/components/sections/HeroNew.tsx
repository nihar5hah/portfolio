'use client'

import { useRef, useState, useCallback } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { easings, gridRevealItem } from '@/components/motion/animations'
import { cn } from '@/lib/utils'

/**
 * Hero Section with Instrument Serif
 *
 * - Large, refined Instrument Serif headline
 * - Interactive cursor-following background
 * - Elegant CTA and social proof
 * - Scroll-triggered animations
 */

export function HeroNew() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Cursor-following orb animation
  const orb1X = useMotionValue(0)
  const orb1Y = useMotionValue(0)
  const orb2X = useMotionValue(0)
  const orb2Y = useMotionValue(0)

  const springConfig = { stiffness: 100, damping: 30 }
  const springOrb1X = useSpring(orb1X, springConfig)
  const springOrb1Y = useSpring(orb1Y, springConfig)
  const springOrb2X = useSpring(orb2X, springConfig)
  const springOrb2Y = useSpring(orb2Y, springConfig)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!heroRef.current) return
    const rect = heroRef.current.getBoundingClientRect()
    // Center blob on cursor (blob is 384px = w-96, so offset by half)
    const x = e.clientX - rect.left - 192
    const y = e.clientY - rect.top - 192

    setMousePosition({ x, y })

    // Primary orb - large one (centered on cursor)
    orb1X.set(x)
    orb1Y.set(y)

    // Secondary orb - offset for layered effect with parallax
    orb2X.set(x * 0.6) // Slower parallax movement
    orb2Y.set(y * 0.6)
  }, [orb1X, orb1Y, orb2X, orb2Y])

  const handleMouseLeave = useCallback(() => {
    orb1X.set(0)
    orb1Y.set(0)
    orb2X.set(0)
    orb2Y.set(0)
  }, [orb1X, orb1Y, orb2X, orb2Y])

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-background"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-brutalist opacity-20" />

      {/* Scanline effect */}
      <div className="scanline-effect absolute inset-0" />

      {/* Interactive cursor-following orbs */}
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-accent/25 to-accent/5 blur-3xl pointer-events-none"
        style={{
          x: springOrb1X,
          y: springOrb1Y,
          left: '-192px',
          top: '-192px',
        }}
      />
      <motion.div
        className="absolute w-72 h-72 rounded-full bg-gradient-to-b from-accent/15 to-transparent blur-3xl pointer-events-none"
        style={{
          x: springOrb2X,
          y: springOrb2Y,
          right: '-144px',
          bottom: '-144px',
        }}
      />

      {/* Content */}
      <Container className="relative z-10 py-32 md:py-40">
        <motion.div
          className="max-w-5xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easings.mechanical }}
        >
          {/* Status badge */}
          <motion.div
            className="flex items-center gap-2 mb-8 text-sm"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-accent"
              animate={{
                opacity: [1, 0.5, 1],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-foreground-secondary">
              Building AI systems that work in the real world
            </span>
          </motion.div>

          {/* Main headline with Instrument Serif */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: easings.mechanical }}
          >
            <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl font-medium leading-tight text-foreground">
              Nihar
              <br />
              <span className="text-accent">Shah</span>
              <br />
              <span className="text-3xl md:text-4xl lg:text-5xl font-light text-foreground-secondary">
                AI Engineer · CS Undergrad
              </span>
            </h1>
          </motion.div>

          {/* Subheading */}
          <motion.p
            className="text-lg md:text-xl text-foreground-secondary max-w-2xl mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: easings.mechanical }}
          >
            Specialized in voice assistants, prompt engineering, and computer vision.
            Currently at <span className="text-accent font-medium">Confido Health</span>,
            turning complex AI concepts into systems that solve real problems.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: easings.mechanical }}
          >
            {/* Primary CTA */}
            <motion.a
              href="#projects"
              className={cn(
                'relative px-8 py-4 bg-accent text-background font-medium overflow-hidden group',
                'border border-accent rounded-none',
                'flex items-center gap-2',
                'transition-all duration-300'
              )}
              whileHover={{ x: 4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Shimmer effect on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              />
              <span className="relative z-10">View my work</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            </motion.a>

            {/* Secondary CTA */}
            <motion.a
              href="#about"
              className={cn(
                'relative px-8 py-4 group overflow-hidden',
                'border border-border hover:border-accent/50',
                'text-foreground hover:text-accent',
                'rounded-none',
                'transition-all duration-300'
              )}
              whileHover={{ x: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Border glow effect */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.1), transparent)',
                }}
              />
              <span className="relative z-10">Learn more</span>
            </motion.a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="flex flex-col items-center gap-2 text-foreground-muted"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
            <div className="w-px h-8 bg-gradient-to-b from-foreground-muted to-transparent" />
          </motion.div>
        </motion.div>
      </Container>

      {/* Accent line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      />
    </section>
  )
}
