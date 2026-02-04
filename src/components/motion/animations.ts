import { Variants } from 'framer-motion'

// Custom easing curves for smooth, premium feel
export const easings = {
  // Smooth deceleration - great for entrances
  smooth: [0.16, 1, 0.3, 1] as const,
  // Bouncy spring feel
  spring: [0.34, 1.56, 0.64, 1] as const,
  // Sharp expo curve
  expo: [0.87, 0, 0.13, 1] as const,
  // Gentle ease out
  gentle: [0.25, 0.1, 0.25, 1] as const,
}

// Glass reveal animation - for glass cards appearing
export const glassReveal: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easings.smooth,
    },
  },
}

// Fade in from direction
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easings.smooth },
  },
}

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easings.smooth },
  },
}

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: easings.smooth },
  },
}

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: easings.smooth },
  },
}

// Scale in animation
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: easings.spring },
  },
}

// Stagger container for lists/grids
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

// Stagger item for use inside staggerContainer
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easings.smooth },
  },
}

// Wave stagger - alternating animation for variety
export const waveContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: 1,
    },
  },
}

export const waveItem: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
    },
  },
}

// Hover lift effect - use with whileHover
export const hoverLift = {
  y: -8,
  scale: 1.02,
  transition: { duration: 0.3, ease: easings.smooth },
}

// Subtle hover lift
export const hoverLiftSubtle = {
  y: -4,
  transition: { duration: 0.2, ease: easings.smooth },
}

// Tap scale effect - use with whileTap
export const tapScale = {
  scale: 0.98,
  transition: { duration: 0.1 },
}

// Card tilt on hover - 3D effect
export const cardTilt = {
  rotateX: 0,
  rotateY: 0,
  transition: { duration: 0.3, ease: easings.smooth },
}

// Timeline draw animation for SVG paths
export const drawLine: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.5, ease: easings.smooth },
      opacity: { duration: 0.3 },
    },
  },
}

// Pulse glow animation
export const pulseGlow: Variants = {
  initial: {
    boxShadow: '0 0 20px rgba(6, 182, 212, 0.4)',
  },
  animate: {
    boxShadow: [
      '0 0 20px rgba(6, 182, 212, 0.4)',
      '0 0 35px rgba(6, 182, 212, 0.6)',
      '0 0 20px rgba(6, 182, 212, 0.4)',
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

// Float animation for background orbs
export const floatAnimation = {
  y: [0, -20, 0],
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: 'easeInOut',
  },
}

export const floatAnimationSlow = {
  y: [0, -15, 0],
  transition: {
    duration: 8,
    repeat: Infinity,
    ease: 'easeInOut',
  },
}

export const floatAnimationSlower = {
  y: [0, -10, 0],
  transition: {
    duration: 10,
    repeat: Infinity,
    ease: 'easeInOut',
  },
}

// Magnetic effect helper - returns transform values based on mouse position
export const createMagneticEffect = (
  mouseX: number,
  mouseY: number,
  centerX: number,
  centerY: number,
  strength: number = 0.25
) => {
  const x = (mouseX - centerX) * strength
  const y = (mouseY - centerY) * strength
  return { x, y }
}

// Viewport settings for whileInView
export const viewportOnce = { once: true, margin: '-100px' }
export const viewportAlways = { once: false, margin: '-50px' }

// Spring configurations
export const springConfig = {
  gentle: { stiffness: 100, damping: 30 },
  snappy: { stiffness: 300, damping: 30 },
  bouncy: { stiffness: 400, damping: 10 },
}

// Scroll transform helper types
export type ScrollTransformConfig = {
  inputRange: [number, number]
  outputRange: [number, number]
}

// Common scroll transform configurations
export const scrollFade: ScrollTransformConfig = {
  inputRange: [0, 400],
  outputRange: [1, 0],
}

export const scrollScale: ScrollTransformConfig = {
  inputRange: [0, 400],
  outputRange: [1, 0.9],
}

export const scrollY: ScrollTransformConfig = {
  inputRange: [0, 400],
  outputRange: [0, 100],
}
