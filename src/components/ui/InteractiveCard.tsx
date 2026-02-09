'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

// Check if device supports hover (desktop) vs touch
const useIsHoverDevice = () => {
  const [isHover, setIsHover] = useState(true)
  useEffect(() => {
    setIsHover(!window.matchMedia('(hover: none)').matches)
  }, [])
  return isHover
}

type GlassVariant = 'primary' | 'secondary' | 'tertiary'

interface InteractiveCardProps {
  children: React.ReactNode
  className?: string
  variant?: GlassVariant
  /** Enable 3D tilt effect that follows mouse */
  tilt?: boolean
  /** Tilt intensity (lower = more dramatic) */
  tiltIntensity?: number
  /** Enable spotlight glow that follows mouse */
  spotlight?: boolean
  /** Spotlight color (Neural Brutalism: Electric indigo) */
  spotlightColor?: string
  /** Enable animated gradient border */
  gradientBorder?: boolean
  /** Enable floating ambient particles */
  particles?: boolean
  /** Number of particles (1-5) */
  particleCount?: number
  /** Disable hover lift */
  noLift?: boolean
}

const glassClasses: Record<GlassVariant, string> = {
  primary: 'glass-primary',
  secondary: 'glass-secondary',
  tertiary: 'glass-tertiary',
}

// Floating particle component
function FloatingParticle({
  index,
  isHovered
}: {
  index: number
  isHovered: boolean
}) {
  const sizes = [4, 6, 3, 5, 4]
  const delays = [0, 0.5, 1, 1.5, 2]
  const positions = [
    { x: '15%', y: '20%' },
    { x: '80%', y: '30%' },
    { x: '25%', y: '75%' },
    { x: '70%', y: '80%' },
    { x: '50%', y: '50%' },
  ]

  return (
    <motion.div
      className="absolute rounded-full bg-accent/30 pointer-events-none"
      style={{
        width: sizes[index % 5],
        height: sizes[index % 5],
        left: positions[index % 5].x,
        top: positions[index % 5].y,
        filter: 'blur(1px)',
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={isHovered ? {
        opacity: [0, 0.8, 0.4],
        scale: [0, 1.2, 1],
        y: [0, -15, -10, -20, -15],
        x: [0, 5, -3, 8, 0],
      } : {
        opacity: 0,
        scale: 0,
      }}
      transition={{
        duration: 3,
        delay: delays[index % 5],
        repeat: isHovered ? Infinity : 0,
        repeatType: 'reverse',
        ease: 'easeInOut',
      }}
    />
  )
}

export function InteractiveCard({
  children,
  className,
  variant = 'secondary',
  tilt = true,
  tiltIntensity = 20,
  spotlight = true,
  spotlightColor = 'rgba(99, 102, 241, 0.15)', // Neural Brutalism: indigo
  gradientBorder = false,
  particles = false,
  particleCount = 3,
  noLift = false,
}: InteractiveCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const isHoverDevice = useIsHoverDevice()

  // Mouse position relative to card center
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth spring animation for tilt
  const springConfig = { stiffness: 150, damping: 20 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [tiltIntensity / 2, -tiltIntensity / 2]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-tiltIntensity / 2, tiltIntensity / 2]), springConfig)

  // Spotlight position (as percentage)
  const spotlightX = useMotionValue(50)
  const spotlightY = useMotionValue(50)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !isHoverDevice) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Normalized position (-0.5 to 0.5)
    const normalizedX = (e.clientX - centerX) / rect.width
    const normalizedY = (e.clientY - centerY) / rect.height

    mouseX.set(normalizedX)
    mouseY.set(normalizedY)

    // Spotlight position (0-100%)
    const percentX = ((e.clientX - rect.left) / rect.width) * 100
    const percentY = ((e.clientY - rect.top) / rect.height) * 100
    spotlightX.set(percentX)
    spotlightY.set(percentY)
  }, [mouseX, mouseY, spotlightX, spotlightY, isHoverDevice])

  const handleMouseEnter = useCallback(() => {
    if (isHoverDevice) setIsHovered(true)
  }, [isHoverDevice])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    mouseX.set(0)
    mouseY.set(0)
    spotlightX.set(50)
    spotlightY.set(50)
  }, [mouseX, mouseY, spotlightX, spotlightY])

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        'relative p-6 overflow-hidden',
        glassClasses[variant],
        gradientBorder && 'gradient-border-wrapper',
        className
      )}
      style={{
        transformStyle: 'preserve-3d',
        rotateX: tilt && isHoverDevice ? rotateX : 0,
        rotateY: tilt && isHoverDevice ? rotateY : 0,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={noLift ? undefined : {
        y: -4,
        transition: { duration: 0.2 },
      }}
    >
      {/* Animated gradient border */}
      {gradientBorder && (
        <motion.div
          className="absolute inset-0 rounded-[inherit] pointer-events-none"
          style={{
            background: 'linear-gradient(var(--gradient-angle, 0deg), transparent 40%, rgba(99, 102, 241, 0.5) 50%, transparent 60%)',
            padding: '1px',
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'xor',
            WebkitMaskComposite: 'xor',
          }}
          animate={{
            '--gradient-angle': ['0deg', '360deg'],
          } as any}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      )}

      {/* Spotlight glow effect - only on hover devices */}
      {spotlight && isHoverDevice && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-[inherit] opacity-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${spotlightX.get()}% ${spotlightY.get()}%, ${spotlightColor}, transparent 40%)`,
            opacity: isHovered ? 1 : 0,
          }}
        />
      )}

      {/* Floating particles */}
      {particles && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[inherit]">
          {Array.from({ length: Math.min(particleCount, 5) }).map((_, i) => (
            <FloatingParticle key={i} index={i} isHovered={isHovered} />
          ))}
        </div>
      )}

      {/* Content with 3D depth */}
      <motion.div
        style={{
          transform: tilt ? 'translateZ(30px)' : undefined,
          transformStyle: 'preserve-3d',
        }}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

// Magnetic element that pulls toward cursor
interface MagneticProps {
  children: React.ReactNode
  className?: string
  strength?: number
}

export function Magnetic({ children, className, strength = 0.3 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springX = useSpring(x, { stiffness: 150, damping: 15 })
  const springY = useSpring(y, { stiffness: 150, damping: 15 })

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    x.set((e.clientX - centerX) * strength)
    y.set((e.clientY - centerY) * strength)
  }, [x, y, strength])

  const handleMouseLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  return (
    <motion.div
      ref={ref}
      className={cn('inline-block', className)}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  )
}

// Card with border shine effect on hover
interface ShineCardProps {
  children: React.ReactNode
  className?: string
  variant?: GlassVariant
}

export function ShineCard({ children, className, variant = 'secondary' }: ShineCardProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const ticking = useRef(false)
  const isHoverDevice = useIsHoverDevice()

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current || ticking.current || !isHoverDevice) return
    ticking.current = true
    const x = e.clientX
    const y = e.clientY

    requestAnimationFrame(() => {
      if (!cardRef.current) return
      const rect = cardRef.current.getBoundingClientRect()
      setPosition({ x: x - rect.left, y: y - rect.top })
      ticking.current = false
    })
  }, [isHoverDevice])

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        'relative p-6 overflow-hidden',
        glassClasses[variant],
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => isHoverDevice && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4 }}
    >
      {/* Shine effect - only on hover devices */}
      {isHoverDevice && (
        <>
          <motion.div
            className="absolute pointer-events-none"
            style={{
              width: 200,
              height: 200,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, transparent 70%)',
              left: position.x - 100,
              top: position.y - 100,
              filter: 'blur(20px)',
            }}
            animate={{
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0.8,
            }}
            transition={{ duration: 0.2 }}
          />

          {/* Border shine */}
          <motion.div
            className="absolute inset-0 rounded-[inherit] pointer-events-none"
            style={{
              background: `radial-gradient(300px circle at ${position.x}px ${position.y}px, rgba(99, 102, 241, 0.4), transparent 40%)`,
              mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              maskComposite: 'xor',
              WebkitMaskComposite: 'xor',
              padding: '1px',
            }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          />
        </>
      )}

      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
