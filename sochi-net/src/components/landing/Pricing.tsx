import { motion } from 'framer-motion'
import { staggerContainer, fadeUp, scaleIn, viewportOnce } from '../../utils/animations'
import { Check } from 'lucide-react'
import { HoverBorderGradient } from '../ui/HoverBorderGradient'


const included = [
  'Настройка под ключ — мастер всё делает сам',
  'YouTube, Telegram, Discord, Instagram',
  'Работает на всех устройствах в сети',
  'Мониторинг и поддержка 24/7',
  'Удалённое решение проблем',
  'Без скрытых платежей',
]

export function Pricing() {
  return (
    <section id="section-pricing" className="section-padding" style={{ background: '#080808' }}>
      <div className="container-max w-full max-w-[1000px]">
        <motion.div
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}
          className="text-center mb-14"
        >
          <motion.div variants={fadeUp} className="mb-5 inline-block">
            <HoverBorderGradient duration={5} contentClassName="px-3 py-1 text-xs font-semibold uppercase tracking-widest">
              Цены
            </HoverBorderGradient>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-white mb-4">Просто и честно</motion.h2>
          <motion.p variants={fadeUp} style={{ color: 'rgba(255,255,255,0.4)' }}>Никаких звёздочек, никаких скрытых условий</motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <motion.div
            variants={scaleIn} initial="hidden" whileInView="visible" viewport={viewportOnce}
          >
            <div className="liquid-card p-8">
              <p className="text-xs uppercase tracking-widest mb-3" style={{ color: 'rgba(255,255,255,0.25)' }}>Разовая оплата</p>
              <p className="text-5xl font-black text-white mb-1">
                5 000 <span className="text-2xl font-semibold" style={{ color: 'rgba(255,255,255,0.3)' }}>₽</span>
              </p>
              <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.3)' }}>Установка и настройка</p>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.35)' }}>
                Мастер приезжает, настраивает систему под ключ. Один раз и навсегда.
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={scaleIn} initial="hidden" whileInView="visible" viewport={viewportOnce}
            transition={{ delay: 0.1 }}
            className="relative"
          >
            <div className="absolute -top-3 left-6 z-10">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white text-black">Ежемесячно</span>
            </div>
            <div className="liquid-card-featured p-8">
              <p className="text-xs uppercase tracking-widest mb-3" style={{ color: 'rgba(255,255,255,0.4)' }}>Абонентская плата</p>
              <p className="text-5xl font-black text-white mb-1">
                600 <span className="text-2xl font-semibold" style={{ color: 'rgba(255,255,255,0.4)' }}>₽/мес</span>
              </p>
              <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>Доступ + поддержка</p>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
                Сервис работает, мы следим. Что-то пошло не так — чиним быстро.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce}
          transition={{ delay: 0.2 }}
          className=""
        >
          <div className="liquid-card p-8">
            <p className="text-xs uppercase tracking-widest font-semibold mb-4" style={{ color: 'rgba(255,255,255,0.25)' }}>
              Что входит
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {included.map(item => (
                <li key={item} className="flex items-start gap-3 text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: 'rgba(255,255,255,0.08)' }}>
                    <Check size={9} className="text-white" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
