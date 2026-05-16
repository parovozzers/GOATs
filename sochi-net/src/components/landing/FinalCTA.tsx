import { motion } from 'framer-motion'
import { staggerContainer, fadeUp, viewportOnce } from '../../utils/animations'
import { LeadForm } from '../ui/LeadForm'
import { Phone, Send } from 'lucide-react'


export function FinalCTA() {
  return (
    <section id="section-finalcta" className="section-padding bg-black relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-[140px]"
          style={{ background: 'rgba(255,255,255,0.035)' }} />
      </div>

      <div className="container-max relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-white mb-4">
              Готовы сделать интернет<br />
              <span className="gradient-text">таким, каким он должен быть?</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Оставьте заявку — мастер приедет в удобное время и настроит всё с нуля.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col gap-3">
              <a href="tel:+78002000000"
                className="flex items-center gap-3 group transition-colors"
                style={{ color: 'rgba(255,255,255,0.45)' }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <Phone size={15} style={{ color: 'rgba(255,255,255,0.5)' }} />
                </div>
                <div>
                  <p className="text-xs mb-0.5" style={{ color: 'rgba(255,255,255,0.2)' }}>Телефон</p>
                  <p className="font-semibold text-white group-hover:text-white/80 transition-colors">8 800 200-00-00</p>
                </div>
              </a>

              <a href="https://t.me/sochinet" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 group transition-colors"
                style={{ color: 'rgba(255,255,255,0.45)' }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <Send size={15} style={{ color: 'rgba(255,255,255,0.5)' }} />
                </div>
                <div>
                  <p className="text-xs mb-0.5" style={{ color: 'rgba(255,255,255,0.2)' }}>Telegram</p>
                  <p className="font-semibold text-white group-hover:text-white/80 transition-colors">@sochinet</p>
                </div>
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce}
            transition={{ duration: 0.6 }}
          >
            <div className="glass-card-bright p-8">
              <p className="font-semibold text-white mb-0.5">Оставить заявку</p>
              <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.35)' }}>Перезвоним за 15 минут</p>
              <LeadForm ctaText="Вызвать мастера" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
