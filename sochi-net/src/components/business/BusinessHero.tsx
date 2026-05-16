import { motion } from 'framer-motion'
import { staggerContainer, fadeUp, scaleIn } from '../../utils/animations'
import { LeadForm } from '../ui/LeadForm'
import { TrendingUp, Users, Zap } from 'lucide-react'

const highlights = [
  { icon: TrendingUp, text: 'Больше клиентов через Instagram и Telegram' },
  { icon: Users, text: 'Команда работает в привычных инструментах' },
  { icon: Zap, text: 'Автоматизация без сбоев' },
]

export function BusinessHero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-20 pb-16 overflow-hidden bg-black">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] rounded-full blur-[140px]"
          style={{ background: 'rgba(255,255,255,0.03)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full blur-[100px]"
          style={{ background: 'rgba(255,255,255,0.02)' }} />
      </div>

      <div className="container-max px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <motion.div variants={fadeUp} className="mb-6">
              <span className="section-label">Для бизнеса · Сочи</span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white">
              <span className="gradient-text">Бизнес без ограничений</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg leading-relaxed mb-8 max-w-lg"
              style={{ color: 'rgba(255,255,255,0.4)' }}>
              Instagram и Telegram работают стабильно — ваш бизнес привлекает клиентов, сотрудники работают без ограничений, автоматизация не зависает.
            </motion.p>

            <motion.ul variants={staggerContainer} className="space-y-3 mb-8">
              {highlights.map(({ icon: Icon, text }) => (
                <motion.li key={text} variants={fadeUp} className="flex items-center gap-3"
                  style={{ color: 'rgba(255,255,255,0.7)' }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <Icon size={15} style={{ color: 'rgba(255,255,255,0.7)' }} />
                  </div>
                  {text}
                </motion.li>
              ))}
            </motion.ul>

            <motion.div variants={scaleIn} className="grid grid-cols-3 gap-6 pt-6"
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <div>
                <p className="text-2xl font-bold text-white">150+</p>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>Бизнесов в Сочи</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">от 900 ₽</p>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>В месяц</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">1 день</p>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>До запуска</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            id="lead-form"
          >
            <div className="rounded-2xl p-8 glass-card-bright">
              <h2 className="text-xl font-bold text-white mb-1">Заявка для бизнеса</h2>
              <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.35)' }}>
                Рассчитаем стоимость и приедем в удобное время
              </p>
              <LeadForm ctaText="Получить консультацию" />
              <div className="mt-4 flex items-center gap-2 text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
                <span className="w-2 h-2 rounded-full bg-success animate-pulse-slow" />
                Ответим в Telegram за 10 минут
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
