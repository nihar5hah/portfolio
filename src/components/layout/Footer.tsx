'use client'

import { Github, Linkedin, Mail } from 'lucide-react'
import { motion } from 'framer-motion'
import { Container } from './Container'
import { socialLinks, siteConfig } from '@/data/social'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Github,
  Linkedin,
  Mail,
}

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-8 border-t border-border">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-foreground-muted text-sm">
            {currentYear} {siteConfig.name}. Built with Next.js.
          </p>

          <div className="flex items-center gap-4">
            {socialLinks.map((link) => {
              const Icon = iconMap[link.icon]
              return (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target={link.url.startsWith('http') ? '_blank' : undefined}
                  rel={
                    link.url.startsWith('http')
                      ? 'noopener noreferrer'
                      : undefined
                  }
                  className="p-2 text-foreground-muted hover:text-accent transition-colors"
                  aria-label={link.name}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {Icon && <Icon className="w-5 h-5" />}
                </motion.a>
              )
            })}
          </div>
        </div>
      </Container>
    </footer>
  )
}
