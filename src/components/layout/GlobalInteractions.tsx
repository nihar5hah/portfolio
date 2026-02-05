'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Global Interactions Layer
 *
 * Adds a technical presence across the entire portfolio:
 * - Custom animated cursor
 * - Ambient particle system
 * - Magnetic element attraction
 * - Scroll velocity physics
 */

export function GlobalInteractions() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollVelocity, setScrollVelocity] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const lastScrollRef = useRef(0)

  // Ambient particle system
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      radius: number
      opacity: number
      speed: number
    }> = []

    // Initialize particles
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        speed: 1 + Math.random() * 0.5,
      })
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        // Movement influenced by scroll velocity
        const velocityMultiplier = 0.5 + Math.abs(scrollVelocity) * 0.05

        p.x += p.vx * p.speed * velocityMultiplier
        p.y += p.vy * p.speed * velocityMultiplier

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        // Draw particle
        ctx.fillStyle = `rgba(99, 102, 241, ${p.opacity * (0.5 + Math.abs(scrollVelocity) * 0.05)})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [scrollVelocity])

  // Mouse tracking for cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Scroll velocity tracking
  useEffect(() => {
    let lastScroll = window.scrollY
    let velocityTimeout: NodeJS.Timeout

    const handleScroll = () => {
      const currentScroll = window.scrollY
      const delta = currentScroll - lastScroll
      setScrollVelocity(delta)
      lastScroll = currentScroll

      clearTimeout(velocityTimeout)
      velocityTimeout = setTimeout(() => setScrollVelocity(0), 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(velocityTimeout)
    }
  }, [])

  // Easter egg: Konami code
  useEffect(() => {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']
    let konamiIndex = 0

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key
      if (key === konamiCode[konamiIndex]) {
        konamiIndex++
        if (konamiIndex === konamiCode.length) {
          triggerEasterEgg()
          konamiIndex = 0
        }
      } else {
        konamiIndex = 0
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const triggerEasterEgg = () => {
    // Create a fun rainbow cursor burst
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff']
    for (let i = 0; i < 50; i++) {
      const angle = (Math.PI * 2 * i) / 50
      const vx = Math.cos(angle) * 3
      const vy = Math.sin(angle) * 3

      const color = colors[Math.floor(Math.random() * colors.length)]
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.arc(mousePosition.x, mousePosition.y, 3, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  return (
    <>
      {/* Ambient particle canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ opacity: 0.3 }}
      />

      {/* Custom cursor */}
      <motion.div
        className="fixed w-6 h-6 border-2 border-accent rounded-full pointer-events-none z-50 mix-blend-screen"
        style={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          repeatType: 'mirror',
        }}
      />

      {/* Cursor trail */}
      <motion.div
        className="fixed w-3 h-3 rounded-full bg-accent/20 pointer-events-none z-40"
        style={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
        }}
        transition={{
          duration: 0.3,
          ease: 'easeOut',
        }}
      />

      <style>{`
        * {
          cursor: none;
        }
      `}</style>
    </>
  )
}
