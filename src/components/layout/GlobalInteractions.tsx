'use client'

import { useEffect, useRef, useCallback } from 'react'

/**
 * Global Interactions Layer (Mobile Optimized)
 *
 * - Lightweight ambient particle system using refs (no state re-renders)
 * - Disabled on mobile and low-power devices to prevent lag
 * - Scroll velocity affects particle speed via refs
 * - Single RAF loop with proper cancellation
 * - Easter egg: Konami code
 */

const PARTICLE_COUNT = 15
const ACCENT_R = 99
const ACCENT_G = 102
const ACCENT_B = 241

// Detect if device is mobile or low-power
const isMobileOrLowPower = () => {
  if (typeof window === 'undefined') return false

  // Check for touch device
  const isTouchDevice = () => {
    return (
      (navigator.maxTouchPoints > 0) ||
      window.matchMedia('(hover: none)').matches
    )
  }

  // Check for low RAM devices
  const hasLowRAM = () => {
    if ('deviceMemory' in navigator) {
      return (navigator as any).deviceMemory < 4
    }
    return false
  }

  return isTouchDevice() || hasLowRAM()
}

export function GlobalInteractions() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const scrollVelocityRef = useRef(0)
  const particlesRef = useRef<Array<{
    x: number; y: number; vx: number; vy: number
    radius: number; opacity: number; speed: number
  }>>([])

  // Skip particles on mobile/low-power devices
  const isLowPowerDevice = isMobileOrLowPower()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || isLowPowerDevice) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()

    // Initialize particles once
    if (particlesRef.current.length === 0) {
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.3 + 0.1,
          speed: 0.5 + Math.random() * 0.5,
        })
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const vel = Math.min(Math.abs(scrollVelocityRef.current) * 0.02, 2)
      const particles = particlesRef.current

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        const mult = 0.5 + vel

        p.x += p.vx * p.speed * mult
        p.y += p.vy * p.speed * mult

        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        const alpha = p.opacity * (0.4 + vel * 0.3)
        ctx.fillStyle = `rgba(${ACCENT_R},${ACCENT_G},${ACCENT_B},${alpha})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fill()
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    window.addEventListener('resize', resize, { passive: true })

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  // Scroll velocity via ref (no re-renders)
  useEffect(() => {
    let lastScroll = window.scrollY
    let decayTimeout: ReturnType<typeof setTimeout>

    const handleScroll = () => {
      const now = window.scrollY
      scrollVelocityRef.current = now - lastScroll
      lastScroll = now

      clearTimeout(decayTimeout)
      decayTimeout = setTimeout(() => { scrollVelocityRef.current = 0 }, 150)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(decayTimeout)
    }
  }, [])

  // Easter egg: Konami code
  useEffect(() => {
    const code = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a']
    let idx = 0

    const onKey = (e: KeyboardEvent) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key
      if (k === code[idx]) {
        idx++
        if (idx === code.length) {
          // Trigger burst
          const canvas = canvasRef.current
          if (canvas) {
            const ctx = canvas.getContext('2d')
            if (ctx) {
              const cx = canvas.width / 2, cy = canvas.height / 2
              const colors = ['#6366f1','#818cf8','#a5b4fc','#c7d2fe']
              for (let i = 0; i < 30; i++) {
                const angle = (Math.PI * 2 * i) / 30
                const dist = 20 + Math.random() * 60
                ctx.fillStyle = colors[i % colors.length]
                ctx.beginPath()
                ctx.arc(cx + Math.cos(angle) * dist, cy + Math.sin(angle) * dist, 3, 0, Math.PI * 2)
                ctx.fill()
              }
            }
          }
          idx = 0
        }
      } else {
        idx = 0
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      {!isLowPowerDevice && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none z-0"
          style={{ opacity: 0.25 }}
        />
      )}
    </>
  )
}
