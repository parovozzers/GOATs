import { useState, useRef, MouseEvent, ReactNode, CSSProperties } from 'react'

interface Props {
  children: ReactNode
  className?: string
  innerClassName?: string
  innerStyle?: CSSProperties
}

export function SpotlightCard({ children, className = '', innerClassName = '', innerStyle }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 50, y: 50 })
  const [hovered, setHovered] = useState(false)

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative p-px rounded-2xl h-full ${className}`}
      style={{
        background: hovered
          ? `radial-gradient(circle at ${pos.x}% ${pos.y}%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.15) 40%, rgba(255,255,255,0.07) 70%, transparent 100%)`
          : 'rgba(255,255,255,0.08)',
        transition: hovered ? 'none' : 'background 0.5s ease',
      }}
    >
      <div className={`rounded-[15px] h-full ${innerClassName}`} style={innerStyle}>
        {children}
      </div>
    </div>
  )
}
