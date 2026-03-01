'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/layout/Container'
import { easings } from '@/components/motion/animations'
import { cn } from '@/lib/utils'

const principles = [
  'Structured prompt design',
  'Evaluation-first architectures',
  'Multi-agent orchestration',
  'Workflow reliability',
  'Deployment-aware AI systems',
]

export function HowIBuild() {
  return (
    <section className="relative py-20 md:py-28 bg-background overflow-hidden">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easings.mechanical }}
        >
          <div className="label-tech mb-4">{'//'} APPROACH</div>
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground mb-6">
            How I Build AI Systems
          </h2>

          <div className="max-w-2xl space-y-6">
            <p className="text-lg text-foreground-secondary leading-relaxed">
              I focus on:
            </p>

            <ul className="space-y-3">
              {principles.map((principle, index) => (
                <motion.li
                  key={principle}
                  className="flex items-center gap-3 text-foreground-secondary"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                >
                  <div className="w-1.5 h-1.5 bg-accent flex-shrink-0" />
                  <span>{principle}</span>
                </motion.li>
              ))}
            </ul>

            <p className={cn(
              'text-foreground-secondary leading-relaxed pt-2',
              'border-t border-border/30'
            )}>
              I prioritize production-oriented systems over experimental demos.
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
