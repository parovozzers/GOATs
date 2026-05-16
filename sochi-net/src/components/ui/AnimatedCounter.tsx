import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface Props {
  to: number
  duration?: number
  suffix?: string
  prefix?: string
  className?: string
}

export function AnimatedCounter({ to, duration = 2000, suffix = '', prefix = '', className }: Props) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const startedRef = useRef(false)

  useEffect(() => {
    if (!inView || startedRef.current) return
    startedRef.current = true

    const startTime = performance.now()
    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * to))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, to, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}{count.toLocaleString('ru-RU')}{suffix}
    </span>
  )
}
