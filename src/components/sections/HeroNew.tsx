'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { easings } from '@/components/motion/animations'
import { cn } from '@/lib/utils'

const useIsHoverDevice = () => {
  const [isHover, setIsHover] = useState(true)
  useEffect(() => {
    setIsHover(!window.matchMedia('(hover: none)').matches)
  }, [])
  return isHover
}

const NIHAR = 'Nihar'
const SHAH = 'Shah'
const TOTAL_CHARS = NIHAR.length + 1 + SHAH.length // 10 (space is a timing beat)

const FONTS = [
  { family: 'var(--font-serif)', label: 'Serif' },
  { family: 'var(--font-display)', label: 'Mono' },
  { family: "Georgia, 'Times New Roman', serif", label: 'Classic' },
  { family: "'Courier New', Courier, monospace", label: 'Typewriter' },
  { family: "Impact, 'Arial Black', sans-serif", label: 'Impact' },
]

export function HeroNew() {
  const heroRef = useRef<HTMLDivElement>(null)
  const isHoverDevice = useIsHoverDevice()

  // Cursor-following orb animation
  const orb1X = useMotionValue(0)
  const orb1Y = useMotionValue(0)
  const orb2X = useMotionValue(0)
  const orb2Y = useMotionValue(0)
  const springConfig = { stiffness: 100, damping: 30 }
  const springOrb1X = useSpring(orb1X, springConfig)
  const springOrb1Y = useSpring(orb1Y, springConfig)
  const springOrb2X = useSpring(orb2X, springConfig)
  const springOrb2Y = useSpring(orb2Y, springConfig)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!heroRef.current || !isHoverDevice) return
    const rect = heroRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - 192
    const y = e.clientY - rect.top - 192
    orb1X.set(x)
    orb1Y.set(y)
    orb2X.set(x * 0.6)
    orb2Y.set(y * 0.6)
  }, [orb1X, orb1Y, orb2X, orb2Y, isHoverDevice])

  const handleMouseLeave = useCallback(() => {
    orb1X.set(0); orb1Y.set(0); orb2X.set(0); orb2Y.set(0)
  }, [orb1X, orb1Y, orb2X, orb2Y])

  // ── Typewriter + font cycling state ──────────────────────────────────────
  const [typedChars, setTypedChars] = useState(0)
  const [isCycling, setIsCycling] = useState(false)
  const [fontIdx, setFontIdx] = useState(0)
  // hasFlipped becomes true the moment the FIRST real font change fires.
  // Until then, no 3D entrance/exit animation plays (typing appears naturally).
  const [hasFlipped, setHasFlipped] = useState(false)

  const isTypingDone = typedChars >= TOTAL_CHARS
  // Which text to display: full name once cycling, progressive during typing
  const niharDisplay = hasFlipped ? NIHAR : NIHAR.slice(0, Math.min(typedChars, NIHAR.length))
  const shahDisplay  = hasFlipped ? SHAH  : (typedChars > NIHAR.length ? SHAH.slice(0, Math.max(0, typedChars - NIHAR.length - 1)) : '')
  const showCursor = !isTypingDone

  // Typewriter: one char every 75ms (with a 180ms pause at the space beat)
  useEffect(() => {
    if (typedChars >= TOTAL_CHARS) return
    const isSpaceBeat = typedChars === NIHAR.length
    const delay = typedChars === 0 ? 1000 : isSpaceBeat ? 180 : 75
    const t = setTimeout(() => setTypedChars(c => c + 1), delay)
    return () => clearTimeout(t)
  }, [typedChars])

  // Arm cycling 2.8 s after typing finishes
  useEffect(() => {
    if (!isTypingDone) return
    const t = setTimeout(() => setIsCycling(true), 2800)
    return () => clearTimeout(t)
  }, [isTypingDone])

  // Font cycling: every 3 s, advance fontIdx and mark the first flip
  useEffect(() => {
    if (!isCycling) return
    const interval = setInterval(() => {
      setFontIdx(i => (i + 1) % FONTS.length)
      setHasFlipped(true)
    }, 3000)
    return () => clearInterval(interval)
  }, [isCycling])

  // AnimatePresence key: stable 'typing' until the first real font change fires
  const nameKey = hasFlipped ? `font-${fontIdx}` : 'typing'
  const currentFont = FONTS[fontIdx].family

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-background"
      onMouseMove={isHoverDevice ? handleMouseMove : undefined}
      onMouseLeave={isHoverDevice ? handleMouseLeave : undefined}
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-brutalist opacity-20 hidden md:block" />
      {isHoverDevice && <div className="scanline-effect absolute inset-0 hidden md:block" />}

      {/* Cursor-following orbs */}
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-accent/25 to-accent/5 blur-3xl pointer-events-none"
        style={{ x: springOrb1X, y: springOrb1Y, left: '-192px', top: '-192px' }}
      />
      <motion.div
        className="absolute w-72 h-72 rounded-full bg-gradient-to-b from-accent/15 to-transparent blur-3xl pointer-events-none"
        style={{ x: springOrb2X, y: springOrb2Y, right: '-144px', bottom: '-144px' }}
      />

      <Container className="relative z-10 py-32 md:py-40">
        <motion.div
          className="max-w-5xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easings.mechanical }}
        >
          {/* Status badge */}
          <motion.div
            className="flex items-center gap-2 mb-8 text-sm"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-accent"
              animate={{ opacity: [1, 0.5, 1], scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-foreground-secondary">
              Building AI systems that work in the real world
            </span>
          </motion.div>

          {/* ── Headline ──────────────────────────────────────────────────── */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: easings.mechanical }}
          >
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-medium leading-tight text-foreground">

              {/*
               * Perspective wrapper — gives the 3D context for the rotateX flip.
               * display:block keeps it in flow (valid: span can be display:block via CSS).
               */}
              <span style={{ perspective: '1000px', display: 'block' }}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={nameKey}
                    style={{ display: 'block', transformStyle: 'preserve-3d' }}

                    /*
                     * Cuboid flip:
                     *   enter — rotateX(90deg → 0): front face rises from below
                     *   exit  — rotateX(0 → -90deg): front face rolls away upward
                     *
                     * initial=false during the pure typing phase (hasFlipped=false)
                     * so the name appears naturally as characters are typed.
                     */
                    initial={hasFlipped ? { rotateX: 90, opacity: 0 } : false}
                    animate={{ rotateX: 0, opacity: 1 }}
                    exit={
                      hasFlipped
                        ? { rotateX: -90, opacity: 0 }
                        : { opacity: 0, transition: { duration: 0.15 } }
                    }
                    transition={{
                      rotateX: { duration: 0.55, ease: [0.2, 0.6, 0.4, 1] },
                      opacity:  { duration: 0.3 },
                    }}
                  >
                    {/* ── "Nihar" — left-aligned, per-char TextReveal stagger ── */}
                    <span style={{ display: 'block' }}>
                      {niharDisplay.split('').map((char, i) => (
                        <motion.span
                          /*
                           * Stable key: during typing, 'nihar-typing-0' etc. so only the
                           * newly mounted char animates. During cycling, 'nihar-N-0' etc.
                           * so all chars re-mount and stagger on each font change.
                           */
                          key={`nihar-${hasFlipped ? fontIdx : 'typing'}-${i}`}
                          style={{ display: 'inline-block', fontFamily: currentFont }}
                          initial={{ y: 22, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{
                            // During typing: instant (no stagger), just reveal as typed
                            // During cycling: staggered reveal synced with the flip
                            delay:    hasFlipped ? i * 0.045 : 0,
                            duration: hasFlipped ? 0.38 : 0.22,
                            ease: [0.4, 0, 0.2, 1],
                          }}
                        >
                          {char}
                        </motion.span>
                      ))}
                      {/* blinking cursor on nihar line */}
                      {showCursor && typedChars <= NIHAR.length && (
                        <motion.span
                          className="text-accent"
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{ duration: 0.65, repeat: Infinity, ease: 'linear' }}
                          style={{ display: 'inline-block' }}
                        >_</motion.span>
                      )}
                    </span>

                    {/* ── "Shah" — accent color, left-aligned ── */}
                    <span className="text-accent" style={{ display: 'block' }}>
                      {shahDisplay.split('').map((char, i) => (
                        <motion.span
                          key={`shah-${hasFlipped ? fontIdx : 'typing'}-${i}`}
                          style={{ display: 'inline-block', fontFamily: currentFont }}
                          initial={{ y: 22, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{
                            delay:    hasFlipped ? (NIHAR.length + 1 + i) * 0.045 : 0,
                            duration: hasFlipped ? 0.38 : 0.22,
                            ease: [0.4, 0, 0.2, 1],
                          }}
                        >
                          {char}
                        </motion.span>
                      ))}
                      {/* blinking cursor on shah line */}
                      {showCursor && typedChars > NIHAR.length && (
                        <motion.span
                          className="text-accent"
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{ duration: 0.65, repeat: Infinity, ease: 'linear' }}
                          style={{ display: 'inline-block' }}
                        >_</motion.span>
                      )}
                    </span>
                  </motion.span>
                </AnimatePresence>
              </span>

              {/* Sub-title — static */}
              <span className="text-3xl md:text-4xl lg:text-5xl font-light text-foreground-secondary font-serif">
                AI Engineer · CS Undergrad
              </span>
            </h1>

            {/* Active font label — tiny, left-aligned, fades per cycle */}
            <AnimatePresence mode="wait">
              {isCycling && (
                <motion.div
                  key={fontIdx}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.25 }}
                  className="mt-3"
                >
                  <span className="text-[10px] text-foreground-muted uppercase tracking-widest">
                    {FONTS[fontIdx].label}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Subheading */}
          <motion.p
            className="text-lg md:text-xl text-foreground-secondary max-w-2xl mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: easings.mechanical }}
          >
            Specialized in voice assistants, prompt engineering, and computer vision.
            Currently at <span className="text-accent font-medium">Confido Health</span>,
            turning complex AI concepts into systems that solve real problems.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: easings.mechanical }}
          >
            <motion.a
              href="#projects"
              className={cn(
                'relative px-8 py-4 bg-accent text-background font-medium overflow-hidden group',
                'border border-accent rounded-none flex items-center gap-2 transition-all duration-300'
              )}
              whileHover={{ x: 4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              />
              <span className="relative z-10">View my work</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            </motion.a>

            <motion.a
              href="#about"
              className={cn(
                'relative px-8 py-4 group overflow-hidden rounded-none',
                'border border-border hover:border-accent/50',
                'text-foreground hover:text-accent transition-all duration-300'
              )}
              whileHover={{ x: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.1), transparent)' }}
              />
              <span className="relative z-10">Learn more</span>
            </motion.a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="flex flex-col items-center gap-2 text-foreground-muted"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
            <div className="w-px h-8 bg-gradient-to-b from-foreground-muted to-transparent" />
          </motion.div>
        </motion.div>
      </Container>

      {/* Accent line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      />
    </section>
  )
}
