import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { staggerContainer, fadeUp, scaleIn } from '../../utils/animations'
import { AnimatedCounter } from '../ui/AnimatedCounter'
import { WireframeDottedGlobe } from '../ui/WireframeDottedGlobe'
import { HoverBorderGradient, type Direction } from '../ui/HoverBorderGradient'

const DIRECTIONS: Direction[] = ['TOP', 'LEFT', 'BOTTOM', 'RIGHT']
import { ChevronDown } from 'lucide-react'

const services = ['YouTube', 'Telegram', 'Discord', 'Instagram']

export function Hero() {
  const [direction, setDirection] = useState<Direction>('TOP')

  useEffect(() => {
    const id = setInterval(() => {
      setDirection(prev => DIRECTIONS[(DIRECTIONS.indexOf(prev) + 1) % DIRECTIONS.length])
    }, 5000)
    return () => clearInterval(id)
  }, [])

  const { scrollY } = useScroll()
  const heroH = window.innerHeight
  const globeOpacity = useTransform(scrollY, [0, heroH * 0.55], [1, 0])
  const globeScale = useTransform(scrollY, [0, heroH * 0.55], [1, 0.75])

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-20 pb-16 overflow-hidden bg-black">
      {/* background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[160px]"
          style={{ background: 'rgba(255,255,255,0.04)' }} />
      </div>

      {/* dot grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 0%, transparent 100%)',
        }} />

      <div className="container-max px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT — text */}
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.div variants={fadeUp} className="mb-6">
              <HoverBorderGradient direction={direction} duration={5} contentClassName="px-3 py-1 text-xs font-semibold uppercase tracking-widest">
                Сочи · с 2021 года
              </HoverBorderGradient>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6 text-white"
            >
              Дома не работает{' '}
              <span className="gradient-text">YouTube?</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg leading-relaxed mb-8 max-w-md"
              style={{ color: 'rgba(255,255,255,0.45)' }}>
              Один визит мастера — и YouTube, Telegram, Instagram, Discord, иные сервисы работают на каждом устройстве в доме. <span style={{ color: '#fff' }}>Быстро, без перебоев и без сторонних приложений с <span style={{ fontWeight: 700 }}>RICH CONNECT</span>.</span>
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mb-10">
              {services.map(s => (
                <HoverBorderGradient key={s} direction={direction} duration={5}>
                  {s}
                </HoverBorderGradient>
              ))}
            </motion.div>

            <motion.div variants={scaleIn} className="grid grid-cols-3 gap-6 pt-6"
              style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
              <Stat value={1200} suffix="+" label="Клиентов в Сочи" />
              <Stat value={97} suffix="%" label="Довольны с первого раза" />
              <Stat value={3} suffix=" ч" label="Выезд мастера" />
            </motion.div>
          </motion.div>

          {/* RIGHT — globe */}
          <motion.div style={{ opacity: globeOpacity, scale: globeScale }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center justify-center"
            >
              <WireframeDottedGlobe size={500} />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        style={{ color: 'rgba(255,255,255,0.2)' }}
      >
        <span className="text-xs tracking-widest uppercase">Далее</span>
        <ChevronDown size={14} className="animate-bounce" />
      </motion.div>
    </section>
  )
}

function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  return (
    <div>
      <p className="text-2xl font-bold text-white">
        <AnimatedCounter to={value} suffix={suffix} />
      </p>
      <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>{label}</p>
    </div>
  )
}
