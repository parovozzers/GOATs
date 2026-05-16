import { motion } from 'framer-motion'
import { staggerContainer, fadeUp, scaleIn, viewportOnce } from '../../utils/animations'
import { Check } from 'lucide-react'
import { LeadForm } from '../ui/LeadForm'
import { HoverBorderGradient } from '../ui/HoverBorderGradient'


const points = [
  'Ничего не нужно включать — работает само',
  'Скорость не снижается — как обычный интернет',
  'Новые устройства подключаются автоматически',
  'Гости в вашей сети получают всё то же самое',
]

export function Technology() {
  return (
    <section id="section-technology" className="section-padding bg-black">
      <div className="container-max">
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}
          className="mb-8 flex justify-center -mt-10"
        >
          <HoverBorderGradient duration={5} contentClassName="px-3 py-1 text-xs font-semibold uppercase tracking-widest">
            Наша технология
          </HoverBorderGradient>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">

          {/* Text */}
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce} className="h-full flex flex-col">
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-white mb-6">
              Один раз приехали —<br />
              <span className="gradient-text">всё работает само</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>
              <span className="text-white font-semibold">Перенастраиваем вашу домашнюю сеть на уровне роутера.</span>{' '}
              Никаких приложений. Ничего не нужно включать.
            </motion.p>
            <motion.p variants={fadeUp} className="leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.4)' }}>
              После визита мастера YouTube грузится мгновенно, Telegram<br />не отключается, Discord не прерывается — на каждом устройстве<br />в сети.
            </motion.p>
            <motion.ul variants={staggerContainer} className="space-y-3">
              {points.map(pt => (
                <motion.li key={pt} variants={fadeUp} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
                    <Check size={11} className="text-white" />
                  </div>
                  <span className="text-sm text-white font-semibold">{pt}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Lead form */}
          <motion.div
            variants={scaleIn} initial="hidden" whileInView="visible" viewport={viewportOnce}
            id="lead-form"
            className="h-full"
          >
            <HoverBorderGradient block rounded="rounded-2xl" className="h-full ring-1 ring-white/20" contentClassName="p-8 flex flex-col h-full w-full">
              <p className="font-semibold text-white mb-0.5">Оставьте заявку</p>
              <p className="text-sm mb-5" style={{ color: 'rgba(255,255,255,0.35)' }}>
                Мастер приедет и настроит всё сам
              </p>
              <LeadForm ctaText="Вызвать мастера" />
              <div className="mt-auto pt-4 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
                    Сейчас онлайн — ответим за 5 минут
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-6 h-6 rounded-md flex items-center justify-center"
                    style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle"
                        fill="white" fontWeight="700" fontSize="7.5" fontFamily="system-ui,-apple-system,sans-serif">RC</text>
                    </svg>
                  </div>
                  <span className="text-xs font-semibold tracking-wide" style={{ color: 'rgba(255,255,255,0.3)' }}>RICH CONNECT</span>
                </div>
              </div>
            </HoverBorderGradient>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
