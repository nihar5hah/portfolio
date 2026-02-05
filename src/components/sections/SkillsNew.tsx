'use client'

import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { skillCategories } from '@/data/skills'
import { cn } from '@/lib/utils'
import { gridRevealContainer, gridRevealItem, easings } from '@/components/motion/animations'

type IconName = keyof typeof Icons

function getIcon(name: string) {
  const Icon = Icons[name as IconName] as React.ComponentType<{
    className?: string
  }>
  return Icon || Icons.Circle
}

export function SkillsNew() {
  return (
    <section id="skills" className="relative section-padding bg-background overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-1/3 -right-96 w-[800px] h-[800px] bg-accent/10 rounded-full pointer-events-none" style={{ filter: 'blur(120px)' }} />
      <div className="absolute -bottom-96 left-1/4 w-[800px] h-[800px] bg-accent/10 rounded-full pointer-events-none" style={{ filter: 'blur(120px)' }} />

      {/* Top fade overlay */}
      <div className="absolute top-0 left-0 right-0 h-64 md:h-80 bg-gradient-to-b from-background via-background/80 to-transparent z-10 pointer-events-none" />

      {/* Bottom fade overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-64 md:h-80 bg-gradient-to-t from-background via-background/80 to-transparent z-10 pointer-events-none" />

      <Container className="relative z-20">
        <SectionHeading
          title="Skills & Technologies"
          subtitle="Expertise across AI, full-stack development, and systems engineering"
        />

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max"
          variants={gridRevealContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {skillCategories.map((category, categoryIndex) => {
            const CategoryIcon = getIcon(category.icon)
            const isPrimary = category.id === 'ai-automation'

            return (
              <motion.div
                key={category.id}
                variants={gridRevealItem}
                className={cn(
                  'group relative overflow-hidden rounded-xl border border-border',
                  'bg-gradient-to-br from-background-secondary/50 to-background/50',
                  'hover:border-accent/50 transition-all duration-300',
                  'p-6 backdrop-blur-sm h-full',
                  // Featured card spans 2 columns but same height as others
                  isPrimary && 'lg:col-span-2'
                )}
              >
                {/* Hover gradient background */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                  style={{
                    background: 'linear-gradient(135deg, var(--accent) 0%, transparent 100%)',
                  }}
                />

                {/* Border accent on hover */}
                <div className="absolute inset-0 border-l-2 border-t-2 border-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none" />

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                  {/* Header with icon */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-start gap-3 flex-1">
                      <motion.div
                        className="p-2.5 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors duration-300 flex-shrink-0"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                      >
                        <CategoryIcon className="w-5 h-5 text-accent" />
                      </motion.div>
                      <div className="min-w-0">
                        <h3 className="font-serif text-lg font-medium text-foreground leading-tight">
                          {category.title}
                        </h3>
                        {isPrimary && (
                          <p className="text-xs text-accent mt-1 font-mono uppercase tracking-wider">
                            Featured
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Skills grid - grows to fill space */}
                  <div className={cn(
                    'grid gap-2 flex-1',
                    isPrimary ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-2'
                  )}>
                    {category.skills.map((skill, index) => {
                      const SkillIcon = getIcon(skill.icon)
                      return (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            delay: index * 0.05,
                            duration: 0.3,
                            ease: easings.mechanical,
                          }}
                          className="group/item relative flex items-center gap-2 px-3 py-2.5 rounded-lg overflow-hidden"
                          style={{
                            background: 'rgba(99, 102, 241, 0.05)',
                            border: '1px solid rgba(99, 102, 241, 0.1)',
                          }}
                          whileHover={{
                            background: 'rgba(99, 102, 241, 0.12)',
                            borderColor: 'rgba(99, 102, 241, 0.3)',
                            scale: 1.05,
                            y: -2,
                          }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {/* Glow effect on hover */}
                          <motion.div
                            className="absolute inset-0 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"
                            style={{
                              background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.15), transparent)',
                            }}
                          />
                          <SkillIcon className="w-4 h-4 text-accent flex-shrink-0 group-hover/item:scale-110 group-hover/item:rotate-12 transition-all duration-200 relative z-10" />
                          <span className="text-xs font-medium text-foreground-secondary group-hover/item:text-foreground transition-colors line-clamp-1 relative z-10">
                            {skill.name}
                          </span>
                        </motion.div>
                      )
                    })}
                  </div>

                  {/* Count badge - always at bottom */}
                  <motion.div
                    className="mt-6 pt-4 border-t border-border/30"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <p className="text-xs text-foreground-muted font-mono">
                      {category.skills.length} {category.skills.length === 1 ? 'skill' : 'skills'}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </Container>
    </section>
  )
}
