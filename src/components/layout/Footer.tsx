'use client'

import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'
import { Container } from './Container'
import { socialLinks, siteConfig } from '@/data/social'
import { cn } from '@/lib/utils'
import { easings } from '@/components/motion/animations'

type IconName = keyof typeof Icons

function getIcon(name: string) {
  const Icon = Icons[name as IconName] as React.ComponentType<{
    className?: string
  }>
  return Icon || Icons.Mail
}

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-border/40 bg-gradient-to-b from-background via-background-secondary/30 to-background-secondary/50 backdrop-blur-sm">
      {/* Grid background */}
      <div className="absolute inset-0 grid-brutalist opacity-3 pointer-events-none" />

      {/* Top accent line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      />

      <Container className="relative z-10 py-12 md:py-16">
        <motion.div
          className="grid md:grid-cols-3 gap-12 md:gap-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easings.mechanical }}
        >
          {/* Brand Section */}
          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="font-serif text-lg font-medium text-foreground">
              {siteConfig.name}
            </h3>
            <p className="text-foreground-secondary text-sm leading-relaxed">
              AI Engineer focused on building production systems that solve real problems.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-medium text-foreground text-sm">Quick Links</h4>
            <div className="flex flex-col gap-2 text-sm text-foreground-secondary">
              {['About', 'Projects', 'Experience', 'Contact'].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="hover:text-accent transition-colors duration-200 w-fit"
                  whileHover={{ x: 4 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Connect Section */}
          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="font-medium text-foreground text-sm">Connect</h4>
            <div className="flex items-center gap-3">
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
                      'p-2 rounded-lg',
                      'bg-background-secondary/40 hover:bg-accent/10',
                      'border border-border/40 hover:border-accent/50',
                      'transition-all duration-300'
                    )}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.35 + index * 0.08, type: 'spring', stiffness: 400, damping: 20 }}
                    whileHover={{ y: -4, scale: 1.15, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={link.name}
                  >
                    {/* Hover background */}
                    <motion.div
                      className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-5 transition-opacity duration-300"
                      style={{
                        background: 'linear-gradient(135deg, var(--accent) 0%, transparent 100%)',
                      }}
                    />
                    {/* Glow effect */}
                    <motion.div
                      className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        boxShadow: '0 0 15px rgba(99, 102, 241, 0.3)',
                      }}
                    />

                    <Icon className="w-4 h-4 relative z-10 text-foreground-secondary group-hover:text-accent group-hover:scale-110 transition-all" />
                  </motion.a>
                )
              })}
            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-border/30 to-transparent mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        />

        {/* Bottom Section */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-foreground-muted"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p>
            © {currentYear} {siteConfig.name}. All rights reserved.
          </p>

          <p className="font-mono text-xs tracking-wider uppercase">
            Designed & Built with Craft
          </p>
        </motion.div>
      </Container>
    </footer>
  )
}
