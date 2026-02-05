'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ExternalLink, Github, ChevronRight } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ShineCard } from '@/components/ui/InteractiveCard'
import { projects } from '@/data/projects'
import { cn } from '@/lib/utils'
import { easings } from '@/components/motion/animations'

function ProjectPlaceholder({ id, isFirst }: { id: string; isFirst: boolean }) {
  const gradients: Record<string, string> = {
    'healthcare-ai':
      'from-cyan-500/30 via-blue-500/20 to-purple-500/30',
    faceattend: 'from-emerald-500/30 via-teal-500/20 to-cyan-500/30',
  }

  return (
    <div
      className={cn(
        'w-full h-full rounded-xl bg-gradient-to-br relative overflow-hidden',
        gradients[id] || 'from-accent/20 to-accent/5',
        'flex items-center justify-center'
      )}
    >
      {isFirst && (
        <div className="absolute inset-0 animate-pulse-subtle">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent shimmer" />
        </div>
      )}
      <div className="w-3/4 h-3/4 rounded-xl glass-secondary p-6 relative">
        <div className="h-3 w-1/2 bg-foreground-muted/20 rounded-full mb-4" />
        <div className="h-2 w-3/4 bg-foreground-muted/10 rounded-full mb-2" />
        <div className="h-2 w-2/3 bg-foreground-muted/10 rounded-full mb-6" />
        <div className="flex gap-2">
          <div className="h-8 w-20 bg-accent/20 rounded-lg" />
          <div className="h-8 w-24 bg-accent/10 rounded-lg" />
        </div>
      </div>
    </div>
  )
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0]
  index: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40])
  const contentY = useTransform(scrollYProgress, [0, 1], [20, -20])
  const isFirst = index === 0

  return (
    <motion.article
      ref={cardRef}
      className={cn(
        'grid lg:grid-cols-2 gap-8 lg:gap-12 items-center',
        index % 2 === 1 && 'lg:grid-flow-dense'
      )}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: easings.smooth }}
    >
      <motion.div
        className={cn(index % 2 === 1 && 'lg:col-start-2')}
        style={{ y: imageY }}
      >
        <ShineCard
          variant={isFirst ? 'primary' : 'secondary'}
          className={cn('aspect-video overflow-hidden rounded-2xl p-0', isFirst && 'glow-accent-subtle')}
        >
          <ProjectPlaceholder id={project.id} isFirst={isFirst} />
        </ShineCard>
      </motion.div>

      <motion.div
        className={cn(index % 2 === 1 && 'lg:col-start-1')}
        style={{ y: contentY }}
      >
        {project.featured && (
          <Badge variant={isFirst ? 'glow' : 'accent'} className="mb-4">
            {isFirst ? 'Featured Project' : 'Project'}
          </Badge>
        )}

        <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          {project.title}
        </h3>

        <p className="text-foreground-secondary mb-6 leading-relaxed">
          {project.longDescription}
        </p>

        <ul className="space-y-2 mb-6">
          {project.highlights.slice(0, 4).map((highlight, i) => (
            <motion.li
              key={i}
              className="flex items-start gap-2 text-foreground-secondary"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <ChevronRight className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <span>{highlight}</span>
            </motion.li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="outline">
              {tech}
            </Badge>
          ))}
        </div>

        <div className="flex gap-4">
          {project.links.github && (
            <Button
              href={project.links.github}
              variant="secondary"
              size="sm"
            >
              <Github className="w-4 h-4" />
              View Code
            </Button>
          )}
          {project.links.demo && (
            <Button href={project.links.demo} size="sm">
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </Button>
          )}
        </div>
      </motion.div>
    </motion.article>
  )
}

export function Projects() {
  return (
    <section id="projects" className="section-padding bg-background">
      <Container>
        <SectionHeading
          title="Projects"
          subtitle="Real systems built for real problems"
        />

        <div className="space-y-20 lg:space-y-32">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </Container>
    </section>
  )
}
