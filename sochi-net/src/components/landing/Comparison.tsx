import { motion } from 'framer-motion'
import { staggerContainer, fadeUp, viewportOnce } from '../../utils/animations'
import { Check, X } from 'lucide-react'
import { HoverBorderGradient } from '../ui/HoverBorderGradient'

const rows = [
  { param: 'Скорость', them: 'Снижается на 30–60%', us: 'Полная скорость вашего интернета' },
  { param: 'Стабильность', them: 'Обрывается, зависает', us: 'Работает без перебоев' },
  { param: 'Удобство', them: 'Включать вручную каждый раз', us: 'Работает само — вы ничего не делаете' },
  { param: 'ТВ и приставки', them: 'Приложение не установить', us: 'Работает на любом устройстве в сети' },
  { param: 'Гости', them: 'Не работает', us: 'Работает на всех в сети' },
  { param: 'Надёжность', them: 'Слетает после обновлений', us: 'Мы следим и чиним удалённо' },
]

export function Comparison() {
  return (
    <section id="section-comparison" className="section-padding" style={{ background: '#080808' }}>
      <div className="container-max w-full max-w-[1000px]">
        <motion.div
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}
          className="text-center mb-14"
        >
          <motion.div variants={fadeUp} className="mb-5 inline-block">
            <HoverBorderGradient duration={5} contentClassName="px-3 py-1 text-xs font-semibold uppercase tracking-widest">
              Сравнение
            </HoverBorderGradient>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-white mb-4">
            Почему это лучше обычных приложений
          </motion.h2>
          <motion.p variants={fadeUp} className="max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Конкретные различия по параметрам, которые важны каждый день
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce}
          className="glass-card-bright overflow-hidden"
        >
          {/* Header */}
          <div className="grid grid-cols-[1fr_1fr_1fr] md:grid-cols-[1.2fr_1fr_1fr]">
            <div className="px-6 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
              <span className="text-xs uppercase tracking-widest font-semibold" style={{ color: 'rgba(255,255,255,0.55)' }}>
                Параметр
              </span>
            </div>

            {/* RICH CONNECT header */}
            <div className="px-6 py-5 flex flex-col items-start gap-1 relative"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', borderLeft: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.04)' }}>
              <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: 'rgba(255,255,255,0.4)' }} />
              <div className="flex items-center gap-1.5">
                <Check size={12} className="text-white" />
                <span className="text-xs font-semibold uppercase tracking-wider text-white">
                  RICH CONNECT
                </span>
              </div>
            </div>

            {/* VPN header */}
            <div className="px-6 py-5 flex flex-col items-start gap-1"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', borderLeft: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.01)' }}>
              <div className="flex items-center gap-1.5 mb-0.5">
                <X size={12} style={{ color: 'rgba(255,255,255,0.55)' }} />
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  VPN-приложения
                </span>
              </div>
            </div>
          </div>

          {/* Rows */}
          {rows.map(({ param, them, us }, i) => (
            <motion.div
              key={param}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportOnce}
              transition={{ delay: i * 0.07 }}
              className="grid grid-cols-[1fr_1fr_1fr] md:grid-cols-[1.2fr_1fr_1fr]"
              style={{ borderBottom: i < rows.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}
            >
              {/* Param */}
              <div className="px-6 py-4 flex items-center"
                style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'transparent' }}>
                <span className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.55)' }}>{param}</span>
              </div>

              {/* Us */}
              <div className="px-5 py-4 flex items-start gap-2"
                style={{ borderLeft: '1px solid rgba(255,255,255,0.08)', background: i % 2 === 0 ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.025)' }}>
                <Check size={13} className="shrink-0 mt-0.5 text-white" />
                <span className="text-sm font-medium text-white">{us}</span>
              </div>

              {/* Them */}
              <div className="px-5 py-4 flex items-start gap-2"
                style={{ borderLeft: '1px solid rgba(255,255,255,0.04)', background: i % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'transparent' }}>
                <X size={13} className="shrink-0 mt-0.5" style={{ color: 'rgba(255,255,255,0.55)' }} />
                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>{them}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
