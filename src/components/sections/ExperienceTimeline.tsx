'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Building2, Calendar, MapPin, ChevronDown } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { experiences } from '@/data/experience'
import type { Experience } from '@/types'
import { cn } from '@/lib/utils'
import { easings } from '@/components/motion/animations'
import { useParticleBurst } from '@/components/ui/ParticleBurst'

/**
 * Enhanced Experience Timeline
 *
 * Features:
 * - Vertical timeline with animated connector line
 * - Alternating card layout (left/right)
 * - Spring-animated timeline nodes
 * - Staggered content reveals
 * - Achievement bullets with icons
 * - Current role pulse badge
 */

export function ExperienceTimeline() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const { canvasRef, burst } = useParticleBurst()

  // Size the particle canvas properly
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }, [canvasRef])

  const handleNodeClick = (e: React.MouseEvent, experienceId: string) => {
    setExpandedId(expandedId === experienceId ? null : experienceId)

    // Trigger particle burst at click location
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect()
      burst({
        x: e.clientX,
        y: e.clientY,
        color: 'rgba(99, 102, 241, 0.7)',
        particleCount: 16,
      })
    }
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-40"
        style={{ width: '100vw', height: '100vh' }}
      />
      <section id="experience" className="section-padding bg-background relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 grid-brutalist opacity-5 pointer-events-none" />

      <Container className="relative z-10">
        <SectionHeading
          title="Experience"
          subtitle="Professional journey and key milestones"
        />

        {/* Timeline container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Animated timeline line */}
          <motion.div
            className="absolute left-0 md:left-1/2 w-0.5 h-full bg-gradient-to-b from-accent via-accent/50 to-transparent transform md:-translate-x-1/2"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: easings.mechanical }}
            style={{ originY: 0 }}
          />

          {/* Experience items */}
          <div className="space-y-0">
            {experiences.map((item: Experience, index: number) => {
              const isEven = index % 2 === 0

              return (
                <motion.div
                  key={item.id}
                  className={cn(
                    'relative flex gap-0 md:gap-0',
                    'group'
                  )}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  {/* Timeline node */}
                  <motion.div
                    className="absolute left-0 md:left-1/2 top-8 transform -translate-x-1/2 z-20 cursor-pointer"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: index * 0.1 + 0.3,
                      type: 'spring',
                      stiffness: 300,
                      damping: 20,
                    }}
                    onClick={(e) => handleNodeClick(e, item.id)}
                  >
                    <motion.div
                      className={cn(
                        'w-5 h-5 rounded-full border-4 border-background shadow-lg transition-all',
                        item.current ? 'bg-accent shadow-accent/50' : 'bg-accent',
                        expandedId === item.id && 'ring-4 ring-accent/50 scale-125'
                      )}
                      whileHover={{ scale: 1.4 }}
                      animate={item.current ? {
                        boxShadow: ['0 0 0 0 rgba(99, 102, 241, 0.7)', '0 0 0 10px rgba(99, 102, 241, 0)']
                      } : {}}
                      transition={item.current ? { whileHover: { type: 'spring', stiffness: 400, damping: 10 }, boxShadow: { duration: 2, repeat: Infinity } } : { type: 'spring', stiffness: 400, damping: 10 }}
                    />
                  </motion.div>

                  {/* Content wrapper */}
                  <div className={cn(
                    'w-full md:w-1/2 pt-4 md:pt-0',
                    isEven ? 'md:pr-16 md:text-right' : 'md:pl-16 md:ml-auto'
                  )}>
                    {/* Experience card */}
                    <motion.div
                      className={cn(
                        'relative overflow-visible rounded-xl p-6 md:p-8 cursor-pointer',
                        'bg-gradient-to-br from-background-secondary/70 to-background/50',
                        'border border-border hover:border-accent/50 transition-all duration-300',
                        'group-hover:shadow-lg group-hover:shadow-accent/10',
                        expandedId === item.id && 'border-accent/70'
                      )}
                      initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: index * 0.1 + 0.15,
                        duration: 0.6,
                        ease: easings.mechanical,
                      }}
                      whileHover={{ y: -8, scale: 1.02 }}
                      style={{ perspective: '1000px' }}
                      onClick={(e) => handleNodeClick(e, item.id)}
                    >
                      {/* Accent borders */}
                      <div className="absolute inset-0 border-l-2 border-t-2 border-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none" />
                      <motion.div
                        className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300"
                        style={{
                          background: 'linear-gradient(135deg, var(--accent) 0%, transparent 100%)',
                        }}
                      />

                      {/* Content */}
                      <div className="relative z-10 space-y-4">
                        {/* Header */}
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + 0.3 }}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-3 flex-1">
                              <Building2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                              <div className={cn(isEven && 'md:text-right', 'flex-1')}>
                                <h3 className="font-serif text-xl font-medium text-foreground">
                                  {item.company}
                                </h3>
                                <p className="text-accent font-medium text-sm mt-1">
                                  {item.role}
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.div>

                        {/* Meta info */}
                        <motion.div
                          className="flex flex-col gap-2 text-sm text-foreground-secondary"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + 0.35 }}
                        >
                          <div className={cn('flex items-center gap-2', isEven && 'md:justify-end')}>
                            <Calendar className="w-4 h-4 text-accent/60 flex-shrink-0" />
                            <span>{item.period}</span>
                          </div>
                          <div className={cn('flex items-center gap-2', isEven && 'md:justify-end')}>
                            <MapPin className="w-4 h-4 text-accent/60 flex-shrink-0" />
                            <span>{item.location}</span>
                          </div>
                        </motion.div>

                        {/* Description */}
                        <motion.p
                          className={cn(
                            'text-foreground-secondary leading-relaxed text-sm md:text-base',
                            isEven && 'md:text-right'
                          )}
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + 0.4 }}
                        >
                          {item.description}
                        </motion.p>

                        {/* Achievements */}
                        <motion.div
                          className="pt-4 border-t border-border/30"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + 0.45 }}
                        >
                          <p className={cn(
                            'text-xs text-foreground-muted font-mono uppercase tracking-wider mb-3',
                            isEven && 'md:text-right'
                          )}>
                            Key achievements
                          </p>
                          <ul className={cn('space-y-2', isEven && 'md:text-right')}>
                            {item.achievements.map((achievement: string, i: number) => (
                              <motion.li
                                key={i}
                                className={cn(
                                  'flex items-start gap-2 text-sm text-foreground-secondary',
                                  isEven && 'md:flex-row-reverse'
                                )}
                                initial={{ opacity: 0, x: isEven ? 10 : -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                  delay: index * 0.1 + 0.5 + i * 0.08,
                                  duration: 0.4,
                                }}
                              >
                                <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                                <span>{achievement}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>

                        {/* Current role badge */}
                        {item.current && (
                          <motion.div
                            className={cn(
                              'inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium',
                              'bg-accent/10 text-accent border border-accent/30',
                              isEven && 'md:ml-auto'
                            )}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{
                              delay: index * 0.1 + 0.6,
                              type: 'spring',
                              stiffness: 300,
                              damping: 20,
                            }}
                            animate={{ boxShadow: ['0 0 0 0 rgba(99, 102, 241, 0.3)', '0 0 0 8px rgba(99, 102, 241, 0)'] }}
                          >
                            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                            Current Role
                          </motion.div>
                        )}

                        {/* Expandable trigger */}
                        <motion.button
                          className="flex items-center gap-2 text-xs text-accent hover:text-accent-light transition-colors mt-4"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleNodeClick(e, item.id)
                          }}
                        >
                          <span>{expandedId === item.id ? 'Hide' : 'Show'} details</span>
                          <motion.div
                            animate={{ rotate: expandedId === item.id ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown className="w-3 h-3" />
                          </motion.div>
                        </motion.button>
                      </div>

                      {/* Expandable details section */}
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={expandedId === item.id ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="mt-6 pt-6 border-t border-border/30 space-y-4">
                          {/* Technologies */}
                          <div>
                            <p className="text-xs text-foreground-muted font-mono uppercase tracking-wider mb-3">
                              Technologies
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {item.technologies.map((tech: string) => (
                                <motion.span
                                  key={tech}
                                  className="px-2.5 py-1 rounded-lg bg-accent/10 border border-accent/20 text-xs text-accent"
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={expandedId === item.id ? { opacity: 1, scale: 1 } : { opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  {tech}
                                </motion.span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
    </>
  )
}
