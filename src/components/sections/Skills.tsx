'use client'

import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { skillCategories } from '@/data/skills'
import { cn } from '@/lib/utils'
import { waveContainer, waveItem, easings } from '@/components/motion/animations'

type IconName = keyof typeof Icons

function getIcon(name: string) {
  const Icon = Icons[name as IconName] as React.ComponentType<{
    className?: string
  }>
  return Icon || Icons.Circle
}

export function Skills() {
  return (
    <section id="skills" className="section-padding">
      <Container>
        <SectionHeading
          title="Skills"
          subtitle="Technologies and tools I work with"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, categoryIndex) => {
            const CategoryIcon = getIcon(category.icon)
            const isPrimary = category.id === 'ai-automation'

            return (
              <motion.div
                key={category.id}
                className={cn(
                  'p-6',
                  isPrimary ? 'glass-primary glass-edge glass-vibrancy lg:col-span-2' : 'glass-secondary',
                  'glass-interactive'
                )}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: categoryIndex * 0.1,
                  ease: easings.smooth,
                }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <motion.div
                    className={cn(
                      'p-2.5 rounded-xl',
                      isPrimary ? 'bg-accent/20' : 'bg-accent/10'
                    )}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  >
                    <CategoryIcon
                      className={cn(
                        'w-5 h-5',
                        isPrimary ? 'text-accent' : 'text-accent'
                      )}
                    />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {category.title}
                  </h3>
                </div>

                <motion.div
                  className="flex flex-wrap gap-2"
                  variants={waveContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {category.skills.map((skill) => {
                    const SkillIcon = getIcon(skill.icon)
                    return (
                      <motion.div
                        key={skill.name}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg glass-tertiary text-sm group"
                        variants={waveItem}
                        whileHover={{
                          scale: 1.05,
                          borderColor: 'rgba(6, 182, 212, 0.4)',
                        }}
                      >
                        <SkillIcon className="w-4 h-4 text-foreground-muted group-hover:text-accent transition-colors" />
                        <span className="text-foreground-secondary group-hover:text-foreground transition-colors">
                          {skill.name}
                        </span>
                      </motion.div>
                    )
                  })}
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
