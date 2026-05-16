import { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'

interface WireframeDottedGlobeProps {
  size?: number
  width?: number
  height?: number
  className?: string
  transparent?: boolean
}

export function WireframeDottedGlobe({
  size,
  width = size ?? 800,
  height = size ?? 600,
  className = '',
  transparent = false,
}: WireframeDottedGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    if (!context) return

    const containerWidth = Math.min(width, window.innerWidth - 40)
    const containerHeight = Math.min(height, window.innerHeight - 100)
    const radius = Math.min(containerWidth, containerHeight) / 2.05

    const dpr = window.devicePixelRatio || 1
    canvas.width = containerWidth * dpr
    canvas.height = containerHeight * dpr
    canvas.style.width = `${containerWidth}px`
    canvas.style.height = `${containerHeight}px`
    context.scale(dpr, dpr)

    const projection = d3
      .geoOrthographic()
      .scale(radius)
      .translate([containerWidth / 2, containerHeight / 2])
      .clipAngle(90)

    const path = d3.geoPath().projection(projection).context(context)

    const pointInPolygon = (point: [number, number], polygon: number[][]): boolean => {
      const [x, y] = point
      let inside = false
      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [xi, yi] = polygon[i]
        const [xj, yj] = polygon[j]
        if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
          inside = !inside
        }
      }
      return inside
    }

    const pointInFeature = (point: [number, number], feature: any): boolean => {
      const geometry = feature.geometry
      if (geometry.type === 'Polygon') {
        if (!pointInPolygon(point, geometry.coordinates[0])) return false
        for (let i = 1; i < geometry.coordinates.length; i++) {
          if (pointInPolygon(point, geometry.coordinates[i])) return false
        }
        return true
      } else if (geometry.type === 'MultiPolygon') {
        for (const polygon of geometry.coordinates) {
          if (pointInPolygon(point, polygon[0])) {
            let inHole = false
            for (let i = 1; i < polygon.length; i++) {
              if (pointInPolygon(point, polygon[i])) { inHole = true; break }
            }
            if (!inHole) return true
          }
        }
      }
      return false
    }

    const generateDotsInPolygon = (feature: any, dotSpacing = 16) => {
      const dots: [number, number][] = []
      const [[minLng, minLat], [maxLng, maxLat]] = d3.geoBounds(feature)
      const stepSize = dotSpacing * 0.08
      for (let lng = minLng; lng <= maxLng; lng += stepSize) {
        for (let lat = minLat; lat <= maxLat; lat += stepSize) {
          const point: [number, number] = [lng, lat]
          if (pointInFeature(point, feature)) dots.push(point)
        }
      }
      return dots
    }

    interface DotData { lng: number; lat: number; visible: boolean }
    const allDots: DotData[] = []
    let landFeatures: any

    const toRad = (deg: number) => deg * Math.PI / 180

    const isOnFrontHemisphere = (lng: number, lat: number): boolean => {
      const cl = toRad(-rotation[0])
      const cp = toRad(-rotation[1])
      const dl = toRad(lng)
      const dp = toRad(lat)
      const dot = Math.sin(dp) * Math.sin(cp) + Math.cos(dp) * Math.cos(cp) * Math.cos(dl - cl)
      return dot > 0.03
    }

    const render = () => {
      context.clearRect(0, 0, containerWidth, containerHeight)
      const currentScale = projection.scale()
      const scaleFactor = currentScale / radius

      context.beginPath()
      context.arc(containerWidth / 2, containerHeight / 2, currentScale, 0, 2 * Math.PI)
      if (!transparent) {
        context.fillStyle = '#000000'
        context.fill()
      }
      context.strokeStyle = transparent ? 'rgba(255,255,255,0.5)' : '#ffffff'
      context.lineWidth = (transparent ? 1 : 2) * scaleFactor
      context.stroke()

      if (landFeatures) {
        const graticule = d3.geoGraticule()
        context.beginPath()
        path(graticule())
        context.strokeStyle = '#ffffff'
        context.lineWidth = 1 * scaleFactor
        context.globalAlpha = transparent ? 0.18 : 0.25
        context.stroke()
        context.globalAlpha = 1

        context.beginPath()
        landFeatures.features.forEach((feature: any) => path(feature))
        context.strokeStyle = '#ffffff'
        context.lineWidth = 1 * scaleFactor
        context.globalAlpha = transparent ? 0.6 : 1
        context.stroke()
        context.globalAlpha = 1

        allDots.forEach(dot => {
          if (!isOnFrontHemisphere(dot.lng, dot.lat)) return
          const projected = projection([dot.lng, dot.lat])
          if (projected) {
            context.beginPath()
            context.arc(projected[0], projected[1], 1.2 * scaleFactor, 0, 2 * Math.PI)
            context.fillStyle = transparent ? '#ffffff' : '#999999'
            context.fill()
          }
        })
      }
    }

    const loadWorldData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(
          'https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json',
        )
        if (!response.ok) throw new Error('Failed to load land data')
        landFeatures = await response.json()
        landFeatures.features.forEach((feature: any) => {
          generateDotsInPolygon(feature, 16).forEach(([lng, lat]) => {
            allDots.push({ lng, lat, visible: true })
          })
        })
        render()
        setIsLoading(false)
      } catch {
        setError('Failed to load map data')
        setIsLoading(false)
      }
    }

    const rotation: [number, number] = [0, 0]
    let autoRotate = true

    const rotationTimer = d3.timer(() => {
      if (autoRotate) {
        rotation[0] += 0.12
        projection.rotate(rotation)
        render()
      }
    })

    const handleMouseDown = (event: MouseEvent) => {
      autoRotate = false
      const startX = event.clientX
      const startY = event.clientY
      const startRotation: [number, number] = [...rotation]

      const handleMouseMove = (e: MouseEvent) => {
        rotation[0] = startRotation[0] + (e.clientX - startX) * 0.5
        rotation[1] = startRotation[1] - (e.clientY - startY) * 0.5
        rotation[1] = Math.max(-90, Math.min(90, rotation[1]))
        projection.rotate(rotation)
        render()
      }
      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
        setTimeout(() => { autoRotate = true }, 10)
      }
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault()
      const scaleFactor = event.deltaY > 0 ? 0.9 : 1.1
      const newRadius = Math.max(radius * 0.5, Math.min(radius * 3, projection.scale() * scaleFactor))
      projection.scale(newRadius)
      render()
    }

    canvas.addEventListener('mousedown', handleMouseDown)
    canvas.addEventListener('wheel', handleWheel, { passive: false })
    loadWorldData()

    return () => {
      rotationTimer.stop()
      canvas.removeEventListener('mousedown', handleMouseDown)
      canvas.removeEventListener('wheel', handleWheel)
    }
  }, [width, height, transparent])

  if (error) {
    return (
      <div className={`flex items-center justify-center rounded-2xl p-8 ${className}`}
        style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>Не удалось загрузить глобус</p>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="cursor-grab active:cursor-grabbing"
        style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
      />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full border border-white/20 animate-ping" />
        </div>
      )}
    </div>
  )
}
