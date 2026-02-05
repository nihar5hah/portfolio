'use client'

import { useEffect, useRef } from 'react'

interface ParticleBurstProps {
  x: number
  y: number
  color?: string
  particleCount?: number
  duration?: number
}

export function useParticleBurst() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const burst = (options: ParticleBurstProps) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const { x, y, color = 'rgba(99, 102, 241, 0.8)', particleCount = 12, duration = 600 } = options

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      life: number
      maxLife: number
    }> = []

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount
      const velocity = 2 + Math.random() * 3

      particles.push({
        x,
        y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        life: 1,
        maxLife: 1,
      })
    }

    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        p.life = 1 - elapsed / duration
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.1 // gravity

        const alpha = p.life * 0.8
        ctx.fillStyle = color.replace(/[\d.]+\)/, `${alpha}`)
        ctx.beginPath()
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2)
        ctx.fill()
      })

      if (elapsed < duration) {
        requestAnimationFrame(animate)
      }
    }

    animate()
  }

  return { canvasRef, burst }
}

export function ParticleBurstCanvas() {
  return (
    <canvas
      className="fixed inset-0 pointer-events-none"
      style={{ width: '100%', height: '100%' }}
    />
  )
}
