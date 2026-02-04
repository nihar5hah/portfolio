'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Container } from './Container'
import { navItems, siteConfig } from '@/data/social'
import { easings } from '@/components/motion/animations'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  const { scrollY } = useScroll()
  const headerBlur = useTransform(scrollY, [0, 100], [0, 16])
  const headerBg = useTransform(
    scrollY,
    [0, 100],
    ['rgba(10, 10, 10, 0)', 'rgba(10, 10, 10, 0.8)']
  )

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      const sections = navItems.map((item) => item.href.slice(1))
      const current = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 150 && rect.bottom >= 150
        }
        return false
      })
      if (current) setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: easings.smooth }}
        style={{
          backgroundColor: headerBg,
          backdropFilter: `blur(${headerBlur}px) saturate(180%)`,
          WebkitBackdropFilter: `blur(${headerBlur}px) saturate(180%)`,
        }}
      >
        <motion.div
          className="absolute inset-x-0 bottom-0 h-px"
          style={{
            opacity: useTransform(scrollY, [0, 100], [0, 1]),
            background:
              'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
          }}
        />

        <Container>
          <nav className="flex items-center justify-between h-16 md:h-20">
            <motion.a
              href="#"
              className="text-xl font-bold text-foreground hover:text-accent transition-colors duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {siteConfig.name}
            </motion.a>

            <ul className="hidden md:flex items-center gap-1">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className={cn(
                      'relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300',
                      activeSection === item.href.slice(1)
                        ? 'text-accent'
                        : 'text-foreground-secondary hover:text-foreground'
                    )}
                  >
                    {activeSection === item.href.slice(1) && (
                      <motion.span
                        layoutId="activeNav"
                        className="absolute inset-0 glass-tertiary rounded-lg"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </button>
                </motion.li>
              ))}
            </ul>

            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-foreground-secondary hover:text-foreground transition-colors rounded-lg glass-tertiary"
              aria-label="Toggle menu"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </nav>
        </Container>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'rgba(10, 10, 10, 0.9)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
              }}
              onClick={() => setIsMobileMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.nav
              className="absolute top-16 left-4 right-4 glass-primary p-4"
              initial={{ y: -20, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: easings.smooth }}
            >
              <ul className="flex flex-col gap-1">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <button
                      onClick={() => handleNavClick(item.href)}
                      className={cn(
                        'w-full text-left px-4 py-3 text-base font-medium rounded-xl transition-all duration-300',
                        activeSection === item.href.slice(1)
                          ? 'text-accent glass-tertiary'
                          : 'text-foreground-secondary hover:text-foreground hover:bg-background-tertiary/50'
                      )}
                    >
                      {item.label}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
