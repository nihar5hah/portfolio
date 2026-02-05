'use client'

import { motion } from 'framer-motion'
import { Code2, Zap, Brain, Shield } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { gridRevealContainer, gridRevealItem, easings } from '@/components/motion/animations'
import { cn } from '@/lib/utils'

/**
 * Interactive Showcase Section
 *
 * Highlights key expertise areas with interactive cards
 * and engaging animations
 */

const showcaseItems = [
  {
    icon: Brain,
    title: 'AI Voice Assistants',
    description: 'Building conversational systems for healthcare that handle patient calls at scale',
    accent: 'from-indigo-500 to-indigo-600',
  },
  {
    icon: Code2,
    title: 'Prompt Engineering',
    description: 'Designing reliable LLM interactions through careful prompt design and validation',
    accent: 'from-indigo-500 to-purple-600',
  },
  {
    icon: Zap,
    title: 'Computer Vision',
    description: 'Real-time visual analysis for automated attendance and object detection systems',
    accent: 'from-purple-500 to-pink-600',
  },
  {
    icon: Shield,
    title: 'Production Systems',
    description: 'Deploying AI systems that work reliably in real-world conditions with monitoring',
    accent: 'from-indigo-500 to-indigo-400',
  },
]

export function InteractiveShowcase() {
  return (
    <section className="relative py-32 md:py-48 bg-background overflow-hidden">
      {/* Top fade overlay */}
      <div className="absolute top-0 left-0 right-0 h-64 md:h-80 bg-gradient-to-b from-background via-background/80 to-transparent z-10 pointer-events-none" />

      {/* Bottom fade overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-64 md:h-80 bg-gradient-to-t from-background via-background/80 to-transparent z-10 pointer-events-none" />

      {/* Background elements */}
      <div className="absolute inset-0 grid-brutalist opacity-10" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full pointer-events-none" style={{ filter: 'blur(120px)' }} />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full pointer-events-none" style={{ filter: 'blur(120px)' }} />

      <Container className="relative z-10">
        {/* Header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easings.mechanical }}
        >
          <div className="label-tech mb-4">{'//'} EXPERTISE</div>
          <h2 className="font-serif text-5xl md:text-6xl font-medium text-foreground mb-6">
            What I build
          </h2>
          <p className="text-lg text-foreground-secondary max-w-2xl leading-relaxed">
            Specialized in translating complex AI concepts into production systems
            that solve real problems for real people.
          </p>
        </motion.div>

        {/* Showcase grid */}
        <motion.div
          className="grid md:grid-cols-2 gap-6"
          variants={gridRevealContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {showcaseItems.map((item, index) => (
            <ShowcaseCard
              key={item.title}
              item={item}
              index={index}
            />
          ))}
        </motion.div>
      </Container>
    </section>
  )
}

interface ShowcaseItem {
  icon: React.ElementType
  title: string
  description: string
  accent: string
}

interface ShowcaseCardProps {
  item: ShowcaseItem
  index: number
}

function ShowcaseCard({ item, index }: ShowcaseCardProps) {
  const Icon = item.icon

  return (
    <motion.div
      variants={gridRevealItem}
      className={cn(
        'group relative p-8 overflow-hidden',
        'bg-background-secondary border-terminal data-flow',
        'hover:border-accent/50 transition-colors duration-300'
      )}
    >
      {/* Gradient accent background (hidden, revealed on hover) */}
      <motion.div
        className={cn(
          'absolute inset-0 opacity-0 group-hover:opacity-5 bg-gradient-to-br',
          item.accent,
          'transition-opacity duration-300 pointer-events-none'
        )}
      />

      {/* Icon container */}
      <motion.div
        className="mb-6"
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          delay: index * 0.1,
          duration: 0.4,
          ease: easings.mechanical,
        }}
      >
        <div className="w-fit p-3 bg-accent/10 border border-accent/20 group-hover:border-accent/40 transition-colors duration-300">
          <Icon className="w-6 h-6 text-accent" />
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="font-serif text-2xl font-medium text-foreground mb-3">
          {item.title}
        </h3>
        <p className="text-foreground-secondary leading-relaxed mb-6">
          {item.description}
        </p>

        {/* Technical indicator */}
        <motion.div
          className="flex items-center gap-2 text-xs text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ x: -10 }}
          whileInView={{ x: 0 }}
          viewport={{ once: true }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-accent" />
          <span className="font-mono uppercase tracking-wide">Active</span>
        </motion.div>
      </div>

      {/* Hover border accent */}
      <motion.div
        className="absolute inset-0 border-l-2 border-t-2 border-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      />
    </motion.div>
  )
}
