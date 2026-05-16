import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { staggerContainer, fadeUp, viewportOnce } from '../../utils/animations'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    q: 'Это законно для бизнеса?',
    a: 'Да. Мы настраиваем ваш офисный роутер — это ваше оборудование. Никаких лицензий или специальных разрешений не требуется. Услуга полностью соответствует законодательству РФ.',
  },
  {
    q: 'Как быстро вы приедете?',
    a: 'Для бизнес-клиентов — приоритетный выезд. Как правило, в течение рабочего дня с момента заявки. Уточним точное время при звонке.',
  },
  {
    q: 'Что если перестанет работать?',
    a: 'Мы мониторим систему и устраняем большинство проблем удалённо ещё до того, как вы их заметите. При необходимости — мастер приедет. Время реакции зависит от тарифа (от 2 до 4 часов).',
  },
  {
    q: 'Можно ли подключить несколько офисов?',
    a: 'Да. Настраиваем несколько точек на единый тариф с общим управлением. Уточните детали — рассчитаем индивидуально.',
  },
  {
    q: 'Нужно ли менять оборудование?',
    a: 'Смотрим на месте. Если текущий роутер подходит — работаем с ним. Если нет — предложим замену без наценок. Вы можете купить роутер самостоятельно или заказать у нас под ключ.',
  },
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

export function BusinessFAQ() {
  return (
    <section className="section-padding bg-black">
      <div className="container-max max-w-3xl">
        <motion.div
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}
          className="text-center mb-12"
        >
          <motion.span variants={fadeUp} className="section-label mb-4 inline-block">Вопросы</motion.span>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-white">
            Часто спрашивают
          </motion.h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce}
          className="rounded-2xl px-8"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          {faqs.map(item => <FAQItem key={item.q} {...item} />)}
        </motion.div>
      </div>
    </section>
  )
}
