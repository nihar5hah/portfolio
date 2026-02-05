'use client'

import { useRef } from 'react'

interface ParticleBurstProps {
  x: number
  y: number
  color?: string
  particleCount?: number
  duration?: number
}

export function useParticleBurst() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)

  const burst = (options: ParticleBurstProps) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Cancel any previous burst animation
    cancelAnimationFrame(rafRef.current)

    const { x, y, particleCount = 12, duration = 600 } = options

    const particles: Array<{
      x: number; y: number; vx: number; vy: number
    }> = []

    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount
      const velocity = 2 + Math.random() * 3
      particles.push({
        x, y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
      })
    }

    const startTime = performance.now()

    const animate = (now: number) => {
      const elapsed = now - startTime
      const life = 1 - elapsed / duration

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (life <= 0) return // Stop - no more RAF calls

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.1

        ctx.fillStyle = `rgba(99,102,241,${life * 0.8})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2)
        ctx.fill()
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
  }

  return { canvasRef, burst }
}
