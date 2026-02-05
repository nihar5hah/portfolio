'use client'

import { motion } from 'framer-motion'
import {
  Mic,
  MessageSquare,
  Eye,
  Terminal,
  Sparkles,
  GraduationCap,
} from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { InteractiveCard, Magnetic } from '@/components/ui/InteractiveCard'
import { FadeIn } from '@/components/motion/FadeIn'
import { staggerContainer, staggerItem, easings } from '@/components/motion/animations'
import { siteConfig } from '@/data/social'

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

export function About() {
  return (
    <section id="about" className="section-padding bg-background-secondary">
      <Container>
        <SectionHeading
          title="About"
          subtitle="Turning complex AI concepts into working systems"
        />

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <FadeIn>
            <motion.div
              className="space-y-6 glass-primary p-8 glass-edge glass-vibrancy"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: easings.smooth }}
            >
              <p className="text-lg text-foreground-secondary leading-relaxed">
                I&apos;m a Computer Science student at{' '}
                <span className="text-foreground font-medium">{siteConfig.university}</span>
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
                className="flex items-center gap-4 pt-4 border-t border-border/30"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center gap-2 text-foreground-secondary">
                  <GraduationCap className="w-5 h-5 text-accent" />
                  <span>{siteConfig.degree}</span>
                </div>
              </motion.div>
            </motion.div>
          </FadeIn>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {highlights.map((item, index) => (
              <motion.div key={item.title} variants={staggerItem}>
                <InteractiveCard
                  variant={index === 0 ? 'primary' : 'secondary'}
                  tilt
                  tiltIntensity={12}
                  spotlight
                  spotlightColor={index === 0 ? 'rgba(99, 102, 241, 0.15)' : 'rgba(99, 102, 241, 0.08)'}
                  particles={index === 0}
                  particleCount={2}
                  className="h-full"
                >
                  <Magnetic strength={0.25}>
                    <motion.div
                      className="p-2 rounded-xl bg-accent/10 w-fit mb-3"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    >
                      <item.icon className="w-6 h-6 text-accent" />
                    </motion.div>
                  </Magnetic>
                  <h3 className="text-foreground font-semibold mb-1">
                    {item.title}
                  </h3>
                  <p className="text-foreground-muted text-sm">
                    {item.description}
                  </p>
                </InteractiveCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
