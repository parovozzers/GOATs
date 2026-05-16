import { useEffect, useRef, useState, useCallback } from 'react'
import { WireframeDottedGlobe } from './WireframeDottedGlobe'

interface GlobePosition {
  top: number
  left: number
  scale: number
  opacity: number
}

// Positions for each landing section (9 sections: Hero→FinalCTA)
const SECTION_POSITIONS: GlobePosition[] = [
  { top: 45, left: 73, scale: 0.92, opacity: 0.82 },  // Hero
  { top: 28, left: 79, scale: 0.62, opacity: 0.28 },  // Problem
  { top: 52, left: 50, scale: 0.70, opacity: 0.28 },  // Technology
  { top: 50, left: 83, scale: 0.55, opacity: 0.22 },  // Comparison
  { top: 38, left: 75, scale: 0.65, opacity: 0.25 },  // HowItWorks
  { top: 50, left: 17, scale: 0.70, opacity: 0.25 },  // Pricing
  { top: 22, left: 80, scale: 0.52, opacity: 0.20 },  // Reviews
  { top: 50, left: 81, scale: 0.48, opacity: 0.18 },  // FAQ
  { top: 45, left: 71, scale: 0.80, opacity: 0.32 },  // FinalCTA
]

export function ScrollGlobePortal() {
  const [active, setActive] = useState(0)
  const rafRef = useRef<number>()

  const findActiveSection = useCallback(() => {
    const sections = document.querySelectorAll<HTMLElement>('[data-scroll-section]')
    if (!sections.length) return

    const viewportMid = window.innerHeight / 2
    let closest = 0
    let minDist = Infinity

    sections.forEach((el, i) => {
      const rect = el.getBoundingClientRect()
      const dist = Math.abs(rect.top + rect.height / 2 - viewportMid)
      if (dist < minDist) {
        minDist = dist
        closest = i
      }
    })

    setActive(closest)
  }, [])

  useEffect(() => {
    let ticking = false

    const onScroll = () => {
      if (!ticking) {
        rafRef.current = requestAnimationFrame(() => {
          findActiveSection()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    findActiveSection()

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [findActiveSection])

  const pos = SECTION_POSITIONS[active] ?? SECTION_POSITIONS[0]
  const transform = `translate3d(${pos.left}vw, ${pos.top}vh, 0) translate3d(-50%, -50%, 0) scale3d(${pos.scale}, ${pos.scale}, 1)`

  return (
    <div
      className="fixed top-0 left-0 z-0 pointer-events-none hidden lg:block will-change-transform"
      style={{
        transform,
        opacity: pos.opacity,
        transition: 'transform 1.4s cubic-bezier(0.23, 1, 0.32, 1), opacity 1.2s ease',
      }}
    >
      <WireframeDottedGlobe size={360} />
    </div>
  )
}
