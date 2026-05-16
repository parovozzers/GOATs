import { motion } from 'framer-motion'
import { staggerContainer, fadeUp, viewportOnce } from '../../utils/animations'
import { Wrench, Shield } from 'lucide-react'
import { HoverBorderGradient } from '../ui/HoverBorderGradient'
import { LeadForm } from '../ui/LeadForm'


export function HowItWorks() {
  return (
    <section id="section-howitworks" className="section-padding bg-black">
      <div className="container-max w-full max-w-[1000px]">
        <motion.div
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}
          className="text-center mb-14"
        >
          <motion.div variants={fadeUp} className="mb-5 inline-block">
            <HoverBorderGradient duration={5} contentClassName="px-3 py-1 text-xs font-semibold uppercase tracking-widest">
              Как это происходит
            </HoverBorderGradient>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-white">
            Три шага до результата
          </motion.h2>
        </motion.div>

        <motion.div
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Step 01 — tall left card spanning 2 rows */}
          <motion.div variants={fadeUp} className="md:row-span-2">
            <div className="glass-card-bright p-7 flex flex-col relative h-full">
              <span className="absolute top-5 right-6 text-5xl font-black select-none"
                style={{ color: 'rgba(255,255,255,0.06)' }}>01</span>
              <p className="text-xs uppercase tracking-widest font-semibold mb-5"
                style={{ color: 'rgba(255,255,255,0.35)' }}>Начните прямо сейчас</p>
              <p className="leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.4)' }}>
                <span className="text-white font-semibold">Оставьте заявку.</span><br />
                Просто имя и телефон. Перезвоним в течение 15 минут и согласуем удобное время.
              </p>
              <div className="mt-auto">
                <LeadForm ctaText="Вызвать мастера" />
              </div>
            </div>
          </motion.div>

          {/* Step 02 — top right */}
          <motion.div variants={fadeUp}>
            <div className="glass-card-bright p-7 relative h-full">
              <span className="absolute top-5 right-6 text-5xl font-black select-none"
                style={{ color: 'rgba(255,255,255,0.04)' }}>02</span>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <Wrench size={20} style={{ color: 'rgba(255,255,255,0.7)' }} />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Мастер приедет и настроит</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.35)' }}>
                Настроит систему за 30–60 минут. Вам не нужно ничего делать — только открыть дверь.
              </p>
            </div>
          </motion.div>

          {/* Step 03 — bottom right */}
          <motion.div variants={fadeUp}>
            <div className="glass-card-bright p-7 relative h-full">
              <span className="absolute top-5 right-6 text-5xl font-black select-none"
                style={{ color: 'rgba(255,255,255,0.04)' }}>03</span>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <Shield size={20} style={{ color: 'rgba(255,255,255,0.7)' }} />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Всё работает, мы следим</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.35)' }}>
                YouTube, Telegram и Discord работают сами. Мы мониторим систему и решаем проблемы до того, как вы их заметите.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
