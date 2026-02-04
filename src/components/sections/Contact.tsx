'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Mail, Github, Linkedin, ArrowRight, MapPin } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'
import { FlickeringGrid } from '@/components/ui/flickering-grid'
import { socialLinks, siteConfig } from '@/data/social'
import { easings, staggerContainer, staggerItem } from '@/components/motion/animations'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Github,
  Linkedin,
  Mail,
}

function MagneticSocialLink({
  link
}: {
  link: typeof socialLinks[0]
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { stiffness: 150, damping: 15 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const rotateX = useTransform(springY, [-20, 20], [10, -10])
  const rotateY = useTransform(springX, [-20, 20], [-10, 10])

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    x.set((e.clientX - centerX) / 3)
    y.set((e.clientY - centerY) / 3)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const Icon = iconMap[link.icon]

  return (
    <motion.a
      ref={ref}
      href={link.url}
      target={link.url.startsWith('http') ? '_blank' : undefined}
      rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
      className="flex flex-col items-center gap-3 p-6 rounded-xl glass-secondary glass-interactive group relative"
      style={{
        x: springX,
        y: springY,
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="p-3 rounded-xl bg-accent/10 group-hover:bg-accent/20 transition-colors"
        whileHover={{ rotate: 5 }}
      >
        {Icon && (
          <Icon className="w-6 h-6 text-foreground-secondary group-hover:text-accent transition-colors" />
        )}
      </motion.div>
      <span className="text-sm font-medium text-foreground-muted group-hover:text-foreground transition-colors">
        {link.name}
      </span>

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-xl bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
    </motion.a>
  )
}

export function Contact() {
  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Flickering Grid Background */}
      <FlickeringGrid
        className="absolute inset-0 z-0"
        squareSize={4}
        gridGap={6}
        color="#06b6d4"
        maxOpacity={0.3}
        flickerChance={0.1}
      />

      {/* Gradient fade from previous section */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-background-secondary via-background/80 to-transparent z-[1]" />

      <Container size="narrow" className="relative z-10">
        <SectionHeading
          title="Get in Touch"
          subtitle="Open to AI, Product, and Startup Internships"
          align="center"
        />

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easings.smooth }}
        >
          <motion.div
            className="glass-primary glass-edge p-8 rounded-2xl mb-8 relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent pointer-events-none" />

            <p className="text-lg text-foreground-secondary mb-6 max-w-xl mx-auto leading-relaxed relative z-10">
              I&apos;m always interested in hearing about new opportunities,
              especially in AI, conversational systems, and product development.
              Feel free to reach out.
            </p>

            <div className="flex items-center justify-center gap-2 text-foreground-muted mb-6 relative z-10">
              <MapPin className="w-5 h-5 text-accent" />
              <span>{siteConfig.location}</span>
            </div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center relative z-10"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Button href={`mailto:${siteConfig.email}`} size="lg">
                <Mail className="w-5 h-5" />
                Send Email
                <ArrowRight className="w-5 h-5" />
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex justify-center gap-4 sm:gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {socialLinks.map((link) => (
              <motion.div key={link.name} variants={staggerItem}>
                <MagneticSocialLink link={link} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
