import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { staggerContainer, fadeUp, viewportOnce } from '../../utils/animations'
import { Plus, Minus } from 'lucide-react'
import { HoverBorderGradient } from '../ui/HoverBorderGradient'


const faqs = [
  { q: 'Это законно?', a: 'Да. Мы настраиваем ваш домашний роутер — это ваше оборудование, и вы вправе его конфигурировать как угодно. Услуга полностью соответствует действующему законодательству.' },
  { q: 'Сколько времени займёт настройка?', a: 'Мастер приезжает и настраивает всё за 30–60 минут. После этого система работает самостоятельно — ничего поддерживать вручную не нужно.' },
  { q: 'Нужно ли менять роутер?', a: 'В большинстве случаев нет. Мастер осмотрит оборудование на месте. Если подходит — работаем с ним. Если нет — предложим замену без скрытых наценок.' },
  { q: 'Нужно ли мне что-то делать самому?', a: 'Нет. Единственное что нужно — открыть дверь мастеру. Всё остальное он сделает сам.' },
  { q: 'Что будет, если что-то перестанет работать?', a: 'Мы мониторим систему и устраняем большинство проблем удалённо ещё до того, как вы их заметите. Если нужно — пришлём мастера.' },
  { q: 'Работает ли на старых роутерах?', a: 'Да. Система работает на уровне роутера, поэтому любое устройство в сети получает доступ — независимо от возраста и модели.' },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }} className="last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4 group"
      >
        <span className="font-medium text-white/80 group-hover:text-white transition-colors text-sm">{q}</span>
        <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all"
          style={{ background: open ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
          {open ? <Minus size={12} className="text-white" /> : <Plus size={12} style={{ color: 'rgba(255,255,255,0.5)' }} />}
        </div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="text-sm leading-relaxed pb-5" style={{ color: 'rgba(255,255,255,0.4)' }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function FAQ() {
  return (
    <section id="section-faq" className="section-padding" style={{ background: '#080808' }}>
      <div className="container-max w-full max-w-[800px]">
        <motion.div
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}
          className="text-center mb-12"
        >
          <motion.div variants={fadeUp} className="mb-5 inline-block">
            <HoverBorderGradient duration={5} contentClassName="px-3 py-1 text-xs font-semibold uppercase tracking-widest">
              Вопросы и ответы
            </HoverBorderGradient>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-white">Часто спрашивают</motion.h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce}
        >
          <div className="liquid-card px-8">
            {faqs.map(item => <FAQItem key={item.q} {...item} />)}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
