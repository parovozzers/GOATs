import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  size: number
  baseOpacity: number
  layer: number
  twinklePhase: number
  twinkleSpeed: number
}

const LAYER_PARALLAX = [0.008, 0.02, 0.042]
const STAR_COUNT = 220

export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let targetX = mouseX
    let targetY = mouseY

    const stars: Star[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()

    for (let i = 0; i < STAR_COUNT; i++) {
      const layer = i < 110 ? 0 : i < 180 ? 1 : 2
      const sizeBase = layer === 0 ? 0.35 : layer === 1 ? 0.6 : 0.9
      stars.push({
        x: Math.random(),
        y: Math.random(),
        size: sizeBase + Math.random() * sizeBase,
        baseOpacity: layer === 0 ? Math.random() * 0.35 + 0.15 : layer === 1 ? Math.random() * 0.45 + 0.25 : Math.random() * 0.5 + 0.35,
        layer,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.018 + 0.004,
      })
    }

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      mouseX += (targetX - mouseX) * 0.06
      mouseY += (targetY - mouseY) * 0.06

      const halfW = canvas.width / 2
      const halfH = canvas.height / 2
      const dx = mouseX - halfW
      const dy = mouseY - halfH

      for (const s of stars) {
        s.twinklePhase += s.twinkleSpeed
        const twinkle = 0.75 + Math.sin(s.twinklePhase) * 0.25
        const p = LAYER_PARALLAX[s.layer]
        const px = s.x * canvas.width + dx * p
        const py = s.y * canvas.height + dy * p

        ctx.beginPath()
        ctx.arc(px, py, s.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${(s.baseOpacity * twinkle).toFixed(3)})`
        ctx.fill()
      }

      animId = requestAnimationFrame(tick)
    }

    animId = requestAnimationFrame(tick)

    const onMove = (e: MouseEvent) => { targetX = e.clientX; targetY = e.clientY }
    const onResize = () => resize()

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 2, mixBlendMode: 'screen' }}
    />
  )
}
