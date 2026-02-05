'use client'

import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { socialLinks } from '@/data/social'
import { cn } from '@/lib/utils'
import { easings } from '@/components/motion/animations'
import { FlickeringGrid } from '@/components/ui/flickering-grid'

type IconName = keyof typeof Icons

function getIcon(name: string) {
  const Icon = Icons[name as IconName] as React.ComponentType<{
    className?: string
  }>
  return Icon || Icons.Mail
}

export function ContactNew() {
  return (
    <section id="contact" className="section-padding bg-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Fade-in gradient mask for FlickeringGrid */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none z-10" />
        <FlickeringGrid
          squareSize={4}
          gridGap={6}
          flickerChance={0.3}
          color="rgb(99, 102, 241)"
          maxOpacity={0.4}
          className="w-full h-full opacity-fade"
        />
      </div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easings.mechanical }}
        >
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="font-serif text-5xl md:text-6xl font-medium text-foreground mb-6">
              Let&apos;s work
              <br />
              <span className="text-accent">together</span>
            </h2>
          </motion.div>

          {/* Description */}
          <motion.p
            className="text-lg text-foreground-secondary max-w-xl mx-auto mb-12 leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            I&apos;m always interested in hearing about new projects and opportunities.
            Feel free to reach out if you want to collaborate or just chat about AI and technology.
          </motion.p>

          {/* Email CTA */}
          <motion.a
            href={socialLinks.find(link => link.name === 'Email')?.url || 'mailto:niharshah0405@gmail.com'}
            className={cn(
              'relative inline-flex items-center gap-3 px-8 py-4 rounded-lg overflow-hidden group',
              'bg-gradient-to-r from-accent to-accent-light text-background',
              'font-medium hover:shadow-lg hover:shadow-accent/30',
              'transition-all duration-300'
            )}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 300, damping: 20 }}
            whileHover={{ y: -4, scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            />
            <span className="relative z-10">Send me an email</span>
            <Icons.ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
          </motion.a>

          {/* Social Links */}
          <motion.div
            className="flex items-center justify-center gap-4 mt-16 flex-wrap"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            {socialLinks.map((link, index) => {
              const Icon = getIcon(link.icon)
              return (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'relative group overflow-hidden',
                    'p-3 rounded-lg',
                    'bg-background-secondary hover:bg-background/60',
                    'border border-border hover:border-accent/50',
                    'transition-all duration-300'
                  )}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1, type: 'spring', stiffness: 400, damping: 20 }}
                  whileHover={{ y: -6, scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  title={link.name}
                >
                  {/* Hover background */}
                  <motion.div
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                    style={{
                      background: 'linear-gradient(135deg, var(--accent) 0%, transparent 100%)',
                    }}
                  />
                  {/* Glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)',
                    }}
                  />

                  <Icon className="w-5 h-5 relative z-10 text-accent group-hover:text-accent-light group-hover:scale-110 transition-all" />
                </motion.a>
              )
            })}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
