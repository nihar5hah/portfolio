'use client'

import { motion } from 'framer-motion'
import {
  Mic,
  MessageSquare,
  Eye,
  Terminal,
  Sparkles,
  GraduationCap,
  ArrowRight,
} from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { FadeIn } from '@/components/motion/FadeIn'
import { staggerContainer, staggerItem, easings } from '@/components/motion/animations'
import { siteConfig } from '@/data/social'
import { cn } from '@/lib/utils'

const highlights = [
  {
    icon: Mic,
    title: 'AI Voice Assistants',
    description: 'Healthcare call automation',
  },
  {
    icon: MessageSquare,
    title: 'Prompt Engineering',
    description: 'LLMs & Voice Agents',
  },
  {
    icon: Eye,
    title: 'Computer Vision',
    description: 'OpenCV & face detection',
  },
  {
    icon: Terminal,
    title: 'Linux & Systems',
    description: 'CLI, Docker, Edge AI',
  },
  {
    icon: Sparkles,
    title: 'Vibe Coding',
    description: 'Rapid AI-assisted prototyping',
  },
]

export function AboutNew() {
  return (
    <section id="about" className="relative section-padding bg-background overflow-hidden">
      {/* Bottom fade overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-64 md:h-80 bg-gradient-to-t from-background via-background/80 to-transparent z-10 pointer-events-none" />

      <Container className="relative z-20">
        <SectionHeading
          title="About Me"
          subtitle="Building AI systems that actually work in the real world"
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Bio Section */}
          <FadeIn>
            <motion.div
              className={cn(
                'relative overflow-hidden rounded-xl p-8 lg:p-10',
                'bg-gradient-to-br from-background-secondary/50 to-background/50',
                'border border-border hover:border-accent/50 transition-all duration-300'
              )}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: easings.mechanical }}
            >
              {/* Accent border */}
              <div className="absolute inset-0 border-l-2 border-t-2 border-accent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none" />

              <div className="relative z-10 space-y-6">
                <p className="text-lg text-foreground-secondary leading-relaxed">
                  I&apos;m a Computer Science student at{' '}
                  <span className="text-accent font-medium">{siteConfig.university}</span>
                  , graduating in {siteConfig.graduationYear}. My focus is on
                  building AI systems that solve real problems, not just demos
                  that look good in presentations.
                </p>

                <p className="text-lg text-foreground-secondary leading-relaxed">
                  At <span className="text-accent font-medium">Confido Health</span>,
                  I&apos;m working on AI voice assistants that handle patient
                  calls for healthcare clinics. This involves designing
                  conversational flows, engineering prompts for reliability, and
                  optimizing systems for production use across multiple locations.
                </p>

                <p className="text-lg text-foreground-secondary leading-relaxed">
                  Beyond voice AI, I&apos;ve built computer vision systems for
                  automated attendance and explored the intersection of AI with
                  practical applications. I enjoy the challenge of making AI
                  systems work reliably in real-world conditions.
                </p>

                <motion.div
                  className="flex items-center gap-4 pt-6 border-t border-border/30"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center gap-2 text-foreground-secondary">
                    <GraduationCap className="w-5 h-5 text-accent" />
                    <span className="font-medium">{siteConfig.degree}</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </FadeIn>

          {/* Highlights Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {highlights.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  variants={staggerItem}
                  className={cn(
                    'group relative overflow-hidden rounded-lg p-5 cursor-default',
                    'bg-gradient-to-br from-background-secondary/40 to-background/40',
                    'border border-border hover:border-accent/50 transition-all duration-300',
                    'hover:shadow-lg hover:shadow-accent/5'
                  )}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Hover effect background */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                    style={{
                      background: 'linear-gradient(135deg, var(--accent) 0%, transparent 100%)',
                    }}
                  />
                  {/* Border glow on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)',
                    }}
                  />

                  <div className="relative z-10">
                    <motion.div
                      className="p-2 rounded-lg bg-accent/10 w-fit mb-3"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    >
                      <Icon className="w-5 h-5 text-accent" />
                    </motion.div>

                    <h3 className="font-serif text-base font-medium text-foreground mb-1">
                      {item.title}
                    </h3>

                    <p className="text-foreground-muted text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
