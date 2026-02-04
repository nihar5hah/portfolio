'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { MapPin, Calendar, ChevronRight } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Badge } from '@/components/ui/Badge'
import { experiences } from '@/data/experience'
import { cn } from '@/lib/utils'
import { easings, staggerContainer, staggerItem } from '@/components/motion/animations'

function TimelineDot({ isCurrent }: { isCurrent: boolean }) {
  return (
    <div
      className={cn(
        'absolute left-0 md:left-8 top-2 -translate-x-1/2 w-4 h-4 rounded-full border-2 z-10',
        isCurrent
          ? 'bg-accent border-accent'
          : 'bg-background-secondary border-border'
      )}
    >
      {isCurrent && (
        <>
          <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-75" />
          <span className="absolute -inset-1 rounded-full bg-accent/20 animate-pulse" />
        </>
      )}
    </div>
  )
}

function ExperienceCard({
  exp,
  index
}: {
  exp: typeof experiences[0]
  index: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'center center'],
  })

  const cardOpacity = useTransform(scrollYProgress, [0, 0.5], [0.5, 1])
  const cardX = useTransform(scrollYProgress, [0, 0.5], [-20, 0])

  return (
    <motion.div
      ref={cardRef}
      className="relative pl-8 md:pl-20"
      style={{ opacity: cardOpacity, x: cardX }}
    >
      <TimelineDot isCurrent={exp.current} />

      <motion.div
        className={cn(
          'rounded-xl p-6 md:p-8 relative overflow-hidden',
          exp.current
            ? 'glass-primary glass-edge glass-vibrancy glow-accent-subtle'
            : 'glass-secondary',
          'glass-interactive'
        )}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.15, ease: easings.smooth }}
      >
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl md:text-2xl font-bold text-foreground">
                {exp.company}
              </h3>
              {exp.current && (
                <Badge variant="glow">Current</Badge>
              )}
            </div>
            <p className="text-lg text-accent font-medium">{exp.role}</p>
          </div>

          <div className="flex flex-col gap-1 text-sm text-foreground-muted">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{exp.period}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{exp.location}</span>
            </div>
          </div>
        </div>

        <p className="text-foreground-secondary mb-4 leading-relaxed">
          {exp.description}
        </p>

        <motion.ul
          className="space-y-2 mb-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {exp.achievements.map((achievement, i) => (
            <motion.li
              key={i}
              className="flex items-start gap-2 text-foreground-secondary"
              variants={staggerItem}
            >
              <ChevronRight className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <span>{achievement}</span>
            </motion.li>
          ))}
        </motion.ul>

        <div className="flex flex-wrap gap-2">
          {exp.technologies.map((tech) => (
            <Badge key={tech} variant="outline">
              {tech}
            </Badge>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="experience" className="section-padding">
      <Container>
        <SectionHeading
          title="Experience"
          subtitle="Where I've worked and what I've built"
        />

        <div ref={containerRef} className="relative">
          {/* Static timeline track */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-border/30" />

          {/* Animated timeline fill */}
          <motion.div
            className="absolute left-0 md:left-8 top-0 w-px bg-gradient-to-b from-accent via-accent to-accent/50"
            style={{ height: lineHeight }}
          />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <ExperienceCard key={exp.id} exp={exp} index={index} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
