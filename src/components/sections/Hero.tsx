'use client'

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { ArrowDown, FileText, Folder } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'
import { GradientDots } from '@/components/ui/gradient-dots'
import { staggerContainer, staggerItem } from '@/components/motion/animations'


export function Hero() {
  const { scrollY } = useScroll()

  // Parallax transforms
  const heroY = useTransform(scrollY, [0, 500], [0, 150])
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0])
  const heroScale = useTransform(scrollY, [0, 400], [1, 0.95])

  // Smooth spring for parallax
  const smoothY = useSpring(heroY, { stiffness: 100, damping: 30 })
  const smoothOpacity = useSpring(heroOpacity, { stiffness: 100, damping: 30 })
  const smoothScale = useSpring(heroScale, { stiffness: 100, damping: 30 })

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient dots background */}
      <GradientDots
        duration={25}
        colorCycleDuration={8}
        spacing={12}
        dotSize={10}
        backgroundColor="rgb(5, 5, 5)"
        className="opacity-80"
      />

      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background z-[1]" />

      {/* Main content with parallax */}
      <motion.div
        style={{
          y: smoothY,
          opacity: smoothOpacity,
          scale: smoothScale,
        }}
        className="relative z-10 w-full"
      >
        <Container className="py-20 md:py-32">
          <motion.div
            className="max-w-4xl"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Status badge */}
            <motion.div variants={staggerItem} className="mb-6">
              <motion.span
                className="inline-flex items-center px-4 py-2 rounded-full glass-tertiary text-accent text-sm font-medium border border-accent/20"
                whileHover={{ scale: 1.02, borderColor: 'rgba(6, 182, 212, 0.4)' }}
              >
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                </span>
                Currently building at Confido Health
              </motion.span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-6 leading-[1.1]"
              variants={staggerItem}
            >
              Building AI systems that{' '}
              <span className="text-gradient-accent">actually work</span> in the
              real world.
            </motion.h1>

            {/* Subheading */}
            <motion.p
              className="text-base sm:text-lg md:text-xl text-foreground-secondary mb-8 max-w-2xl leading-relaxed"
              variants={staggerItem}
            >
              Computer Science undergraduate specializing in AI voice assistants,
              prompt engineering, and computer vision. Currently developing
              production AI systems for healthcare at Confido Health.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap gap-4"
              variants={staggerItem}
            >
              <Button onClick={scrollToProjects} size="lg">
                <Folder className="w-5 h-5" />
                View Projects
              </Button>
              <Button
                href="/resume.pdf"
                variant="secondary"
                size="lg"
                download
              >
                <FileText className="w-5 h-5" />
                Download Resume
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        style={{ opacity: smoothOpacity }}
      >
        <motion.button
          onClick={() =>
            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
          }
          className="p-3 text-foreground-muted hover:text-accent transition-colors glass-tertiary rounded-full"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          whileHover={{ scale: 1.1 }}
          aria-label="Scroll down"
        >
          <ArrowDown className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </section>
  )
}
