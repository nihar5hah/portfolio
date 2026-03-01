'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface GooeyTextProps {
  texts: string[]
  fontFamilies?: string[]
  morphTime?: number
  cooldownTime?: number
  className?: string
  textClassName?: string
}

export function GooeyText({
  texts,
  fontFamilies,
  morphTime = 1,
  cooldownTime = 0.25,
  className,
  textClassName,
}: GooeyTextProps) {
  const text1Ref = React.useRef<HTMLSpanElement>(null)
  const text2Ref = React.useRef<HTMLSpanElement>(null)
  const uid = React.useId().replace(/:/g, '')
  const filterId = `gooey-${uid}`

  React.useEffect(() => {
    let textIndex = texts.length - 1
    let time = new Date()
    let morph = 0
    let cooldown = cooldownTime
    let rafId: number

    const applyFont = (idx: number, ref: React.RefObject<HTMLSpanElement | null>) => {
      if (fontFamilies && fontFamilies.length > 0 && ref.current) {
        ref.current.style.fontFamily = fontFamilies[idx % fontFamilies.length]
      }
    }

    const setMorph = (fraction: number) => {
      if (text1Ref.current && text2Ref.current) {
        text2Ref.current.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`
        text2Ref.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`

        fraction = 1 - fraction
        text1Ref.current.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`
        text1Ref.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`
      }
    }

    const doCooldown = () => {
      morph = 0
      if (text1Ref.current && text2Ref.current) {
        text2Ref.current.style.filter = ''
        text2Ref.current.style.opacity = '100%'
        text1Ref.current.style.filter = ''
        text1Ref.current.style.opacity = '0%'
      }
    }

    const doMorph = () => {
      morph -= cooldown
      cooldown = 0
      let fraction = morph / morphTime

      if (fraction > 1) {
        cooldown = cooldownTime
        fraction = 1
      }

      setMorph(fraction)
    }

    // Initialize text content and fonts
    if (text1Ref.current) {
      text1Ref.current.textContent = texts[textIndex % texts.length]
      applyFont(textIndex % texts.length, text1Ref)
    }
    if (text2Ref.current) {
      text2Ref.current.textContent = texts[(textIndex + 1) % texts.length]
      applyFont((textIndex + 1) % texts.length, text2Ref)
    }

    function animate() {
      rafId = requestAnimationFrame(animate)
      const newTime = new Date()
      const shouldIncrementIndex = cooldown > 0
      const dt = (newTime.getTime() - time.getTime()) / 1000
      time = newTime

      cooldown -= dt

      if (cooldown <= 0) {
        if (shouldIncrementIndex) {
          textIndex = (textIndex + 1) % texts.length
          if (text1Ref.current) {
            text1Ref.current.textContent = texts[textIndex % texts.length]
            applyFont(textIndex % texts.length, text1Ref)
          }
          if (text2Ref.current) {
            text2Ref.current.textContent = texts[(textIndex + 1) % texts.length]
            applyFont((textIndex + 1) % texts.length, text2Ref)
          }
        }
        doMorph()
      } else {
        doCooldown()
      }
    }

    animate()

    return () => {
      cancelAnimationFrame(rafId)
    }
  }, [texts, fontFamilies, morphTime, cooldownTime])

  return (
    <div className={cn('relative', className)}>
      <svg className="absolute h-0 w-0" aria-hidden="true" focusable="false">
        <defs>
          <filter id={filterId}>
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>

      <div
        style={{ display: 'grid', justifyItems: 'start', filter: `url(#${filterId})` }}
      >
        <span
          ref={text1Ref}
          style={{ gridArea: '1/1' }}
          className={cn('select-none whitespace-nowrap', textClassName)}
        />
        <span
          ref={text2Ref}
          style={{ gridArea: '1/1' }}
          className={cn('select-none whitespace-nowrap', textClassName)}
        />
      </div>
    </div>
  )
}
