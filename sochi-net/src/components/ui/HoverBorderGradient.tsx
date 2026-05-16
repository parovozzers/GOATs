import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export type Direction = 'TOP' | 'LEFT' | 'BOTTOM' | 'RIGHT'

const movingMapDark: Record<Direction, string> = {
  TOP: 'radial-gradient(20.7% 50% at 50% 0%, hsl(0,0%,100%) 0%, rgba(255,255,255,0) 100%)',
  LEFT: 'radial-gradient(16.6% 43.1% at 0% 50%, hsl(0,0%,100%) 0%, rgba(255,255,255,0) 100%)',
  BOTTOM: 'radial-gradient(20.7% 50% at 50% 100%, hsl(0,0%,100%) 0%, rgba(255,255,255,0) 100%)',
  RIGHT: 'radial-gradient(16.2% 41.2% at 100% 50%, hsl(0,0%,100%) 0%, rgba(255,255,255,0) 100%)',
}

const movingMapLight: Record<Direction, string> = {
  TOP: 'radial-gradient(20.7% 50% at 50% 0%, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0) 100%)',
  LEFT: 'radial-gradient(16.6% 43.1% at 0% 50%, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0) 100%)',
  BOTTOM: 'radial-gradient(20.7% 50% at 50% 100%, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0) 100%)',
  RIGHT: 'radial-gradient(16.2% 41.2% at 100% 50%, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0) 100%)',
}

const highlightDark = 'radial-gradient(75% 181.16% at 50% 50%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 100%)'
const highlightLight = 'radial-gradient(75% 181.16% at 50% 50%, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 100%)'

const ORDER: Direction[] = ['TOP', 'LEFT', 'BOTTOM', 'RIGHT']

interface Props {
  children: React.ReactNode
  direction?: Direction
  duration?: number
  className?: string
  contentClassName?: string
  rounded?: string
  block?: boolean
  theme?: 'dark' | 'light'
  liquidGlass?: boolean
}

export function HoverBorderGradient({
  children,
  direction,
  duration = 2,
  className,
  contentClassName,
  rounded = 'rounded-full',
  block = false,
  theme = 'dark',
  liquidGlass = false,
}: Props) {
  const [hovered, setHovered] = useState(false)
  const [internalDir, setInternalDir] = useState<Direction>('TOP')
  const activeDir = direction ?? internalDir

  useEffect(() => {
    if (direction !== undefined) return
    const id = setInterval(() => {
      setInternalDir(prev => ORDER[(ORDER.indexOf(prev) + 1) % ORDER.length])
    }, duration * 1000)
    return () => clearInterval(id)
  }, [direction, duration])

  const movingMap = theme === 'light' ? movingMapLight : movingMapDark
  const highlight = theme === 'light' ? highlightLight : highlightDark

  const glassStyle = liquidGlass
    ? {
        background: hovered
          ? 'linear-gradient(160deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.12) 100%)'
          : 'linear-gradient(160deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 50%, rgba(255,255,255,0.07) 100%)',
        backdropFilter: 'blur(28px) saturate(200%) brightness(1.08)',
        WebkitBackdropFilter: 'blur(28px) saturate(200%) brightness(1.08)',
        boxShadow: hovered
          ? 'inset 0 1.5px 0 rgba(255,255,255,0.55), inset 0 -1px 0 rgba(255,255,255,0.08), inset 1px 0 0 rgba(255,255,255,0.15)'
          : 'inset 0 1.5px 0 rgba(255,255,255,0.35), inset 0 -1px 0 rgba(255,255,255,0.05), inset 1px 0 0 rgba(255,255,255,0.08)',
        transition: 'background 0.3s ease, box-shadow 0.3s ease',
      }
    : theme === 'light'
    ? {
        background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,248,248,0.98) 100%)',
        backdropFilter: 'blur(16px) saturate(140%)',
        WebkitBackdropFilter: 'blur(16px) saturate(140%)',
        boxShadow: 'inset 0 -1px 0 rgba(0,0,0,0.06)',
      }
    : {
        background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%), rgb(0,0,0)',
        backdropFilter: 'blur(16px) saturate(140%)',
        WebkitBackdropFilter: 'blur(16px) saturate(140%)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.10)',
      }

  const contentColor = theme === 'light' ? 'rgba(0,0,0,0.8)' : '#fff'

  const baseClass = block
    ? `relative flex items-stretch p-px overflow-hidden ${rounded} ${className ?? ''}`
    : `relative inline-flex items-center justify-center p-px overflow-hidden ${rounded} ${className ?? ''}`

  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={baseClass}
    >
      {!liquidGlass && (
        <motion.span
          className="absolute inset-0 z-0 rounded-[inherit]"
          style={{ filter: 'blur(2px)' }}
          initial={{ background: movingMap[activeDir] }}
          animate={{
            background: hovered ? [movingMap[activeDir], highlight] : movingMap[activeDir],
          }}
          transition={{ ease: 'linear', duration }}
        />
      )}

      <span
        className="absolute inset-[1px] z-[1] rounded-[inherit]"
        style={glassStyle}
      />

      <span
        className={`relative z-10 ${contentClassName ?? 'px-3 py-1.5 text-sm font-medium'}`}
        style={{ color: contentColor }}
      >
        {children}
      </span>
    </span>
  )
}
