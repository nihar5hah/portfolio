'use client'

import { motion } from 'framer-motion'
import { Rocket, Bot } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { easings } from '@/components/motion/animations'
import { cn } from '@/lib/utils'

const currentProjects = [
  {
    icon: Rocket,
    title: 'KalExam',
    description: 'AI-powered RAG learning & evaluation platform',
  },
  {
    icon: Bot,
    title: 'Multi-Agent Infrastructure',
    description: 'Multi-agent automation infrastructure using OpenClaw',
  },
]

export function CurrentlyBuilding() {
  return (
    <section className="relative py-16 md:py-20 bg-background overflow-hidden">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easings.mechanical }}
        >
          <div className="label-tech mb-6">{'//'} CURRENTLY BUILDING</div>

          <div className="grid sm:grid-cols-2 gap-4">
            {currentProjects.map((project, index) => {
              const Icon = project.icon
              return (
                <motion.div
                  key={project.title}
                  className={cn(
                    'group relative p-5 overflow-hidden',
                    'bg-background-secondary/40 border border-border',
                    'hover:border-accent/50 transition-colors duration-300'
                  )}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1, ease: easings.mechanical }}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-accent/10 border border-accent/20">
                      <Icon className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground text-sm mb-1">
                        {project.title}
                      </h3>
                      <p className="text-foreground-secondary text-xs leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  {/* Active indicator */}
                  <motion.div
                    className="absolute top-3 right-3 flex items-center gap-1.5"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full bg-accent"
                      animate={{ opacity: [1, 0.4, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="text-[10px] text-accent font-mono uppercase tracking-wide">
                      Active
                    </span>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
