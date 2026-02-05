'use client'

import { motion } from 'framer-motion'
import { Terminal, Database, Cpu, Network } from 'lucide-react'
import { cn } from '@/lib/utils'
import { gridRevealContainer, gridRevealItem, mechanicalSlide, easings } from '@/components/motion/animations'

/**
 * Neural Brutalism Showcase Component
 *
 * Demonstrates the new visual system:
 * - IBM Plex Mono display typography
 * - Electric indigo accent color
 * - Algorithmic, grid-based animations
 * - Technical, structured aesthetic
 *
 * Use this as a reference for the design system.
 */

export function NeuralBrutalistShowcase() {
  return (
    <section className="relative py-32 bg-background overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 grid-brutalist opacity-30" />

      {/* Scanline effect */}
      <div className="scanline-effect absolute inset-0" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header with display font */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easings.mechanical }}
        >
          <div className="label-tech mb-4">{'//'} VISUAL_SYSTEM.tsx</div>
          <h2 className="font-display text-5xl md:text-7xl font-bold text-foreground mb-4">
            Neural
            <br />
            <span className="text-accent">Brutalism</span>
          </h2>
          <p className="text-foreground-secondary text-lg max-w-2xl">
            A technical, algorithmic design system built for AI engineers.
            Precise. Mechanical. Intentional.
          </p>
        </motion.div>

        {/* Grid of feature cards */}
        <motion.div
          className="grid md:grid-cols-2 gap-6"
          variants={gridRevealContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <FeatureCard
            icon={Terminal}
            label="TYPOGRAPHY"
            title="Display Font"
            description="IBM Plex Mono brings technical character and authentic AI aesthetic"
          />
          <FeatureCard
            icon={Cpu}
            label="COLOR SYSTEM"
            title="Electric Indigo"
            description="Moving beyond cyan to a distinctive purple-based accent palette"
          />
          <FeatureCard
            icon={Database}
            label="ANIMATIONS"
            title="Algorithmic Motion"
            description="Grid-based reveals and mechanical transitions replace organic floating"
          />
          <FeatureCard
            icon={Network}
            label="VISUAL DETAILS"
            title="Technical Depth"
            description="Scanlines, terminal borders, and structured geometric patterns"
          />
        </motion.div>

        {/* Typography showcase */}
        <motion.div
          className="mt-16 brutalist-card p-8 bg-background-secondary/50 backdrop-blur-sm"
          variants={mechanicalSlide}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="label-tech mb-6">{'//'} TYPOGRAPHY_SCALE</div>
          <div className="space-y-4">
            <div className="font-display text-4xl font-bold text-foreground">
              Display Heading
            </div>
            <div className="font-sans text-2xl text-foreground-secondary">
              Body text with Geist Sans
            </div>
            <div className="text-mono-detail">
              Technical_Detail_Text_12px
            </div>
          </div>
        </motion.div>

        {/* Color palette */}
        <motion.div
          className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <ColorSwatch
            color="bg-accent"
            label="ACCENT"
            hex="#6366f1"
          />
          <ColorSwatch
            color="bg-accent-light"
            label="ACCENT_LIGHT"
            hex="#818cf8"
          />
          <ColorSwatch
            color="bg-foreground"
            label="FOREGROUND"
            hex="#ffffff"
          />
          <ColorSwatch
            color="bg-background"
            label="BACKGROUND"
            hex="#0a0a0a"
          />
        </motion.div>
      </div>
    </section>
  )
}

interface FeatureCardProps {
  icon: React.ElementType
  label: string
  title: string
  description: string
}

function FeatureCard({ icon: Icon, label, title, description }: FeatureCardProps) {
  return (
    <motion.div
      className="group relative p-6 bg-background-secondary border-terminal data-flow"
      variants={gridRevealItem}
      whileHover={{
        y: -4,
        transition: { duration: 0.2, ease: easings.snap },
      }}
    >
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-accent/10 border border-accent/20">
            <Icon className="w-5 h-5 text-accent" />
          </div>
          <div className="label-tech">{label}</div>
        </div>
        <h3 className="font-display text-xl font-semibold text-foreground mb-2">
          {title}
        </h3>
        <p className="text-foreground-secondary text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  )
}

interface ColorSwatchProps {
  color: string
  label: string
  hex: string
}

function ColorSwatch({ color, label, hex }: ColorSwatchProps) {
  return (
    <motion.div
      className="border border-border p-4"
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 },
      }}
    >
      <div className={cn('w-full h-16 mb-3', color)} />
      <div className="label-tech">{label}</div>
      <div className="text-mono-detail">{hex}</div>
    </motion.div>
  )
}
