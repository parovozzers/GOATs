import { motion } from 'framer-motion'
import { fadeUp, viewportOnce } from '../../utils/animations'
import { LeadForm } from '../ui/LeadForm'

export function LeadFormSection() {
  return (
    <section id="lead-form" className="py-12 bg-black">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-lg mx-auto"
        >
          <div className="rounded-2xl p-8 glass-card-bright">
            <p className="font-semibold text-white mb-0.5">Оставьте заявку</p>
            <p className="text-sm mb-5" style={{ color: 'rgba(255,255,255,0.35)' }}>
              Мастер приедет и настроит всё сам
            </p>
            <LeadForm ctaText="Вызвать мастера" />
            <div className="mt-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
                Сейчас онлайн — ответим за 5 минут
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
