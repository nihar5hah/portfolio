'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

/**
 * Scroll Progress Indicator
 * Shows a thin line at the top of the page that fills as user scrolls
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-accent origin-left z-50"
      style={{ scaleX }}
    />
  )
}
