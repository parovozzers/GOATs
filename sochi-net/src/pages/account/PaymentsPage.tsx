import { motion } from 'framer-motion'
import { staggerContainer, fadeUp } from '../../utils/animations'
import { CreditCard, Download, CheckCircle, Clock } from 'lucide-react'

const payments = [
  { id: 'PAY-118', date: '15 мая 2024', desc: 'Абонентская плата. Май 2024', amount: '600 ₽', status: 'paid' },
  { id: 'PAY-117', date: '15 апреля 2024', desc: 'Абонентская плата. Апрель 2024', amount: '600 ₽', status: 'paid' },
  { id: 'PAY-116', date: '15 марта 2024', desc: 'Абонентская плата. Март 2024', amount: '600 ₽', status: 'paid' },
  { id: 'PAY-110', date: '5 января 2024', desc: 'Установка и настройка', amount: '5 000 ₽', status: 'paid' },
]

const upcoming = {
  id: 'PAY-119',
  date: '15 июня 2024',
  desc: 'Абонентская плата. Июнь 2024',
  amount: '600 ₽',
}

export function PaymentsPage() {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={fadeUp}>
        <h1 className="text-2xl font-bold text-white">Платежи</h1>
        <p className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>История оплат и документы</p>
      </motion.div>

      <motion.div variants={fadeUp} className="rounded-2xl p-6"
        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest mb-1 flex items-center gap-2"
              style={{ color: 'rgba(255,255,255,0.25)' }}>
              <Clock size={12} /> Ближайший платёж
            </p>
            <p className="text-3xl font-black text-white">{upcoming.amount}</p>
            <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>{upcoming.desc}</p>
            <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.25)' }}>{upcoming.date}</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            className="btn-primary flex items-center gap-2"
          >
            <CreditCard size={16} />
            Оплатить онлайн
          </motion.button>
        </div>
      </motion.div>

      <motion.div variants={fadeUp}>
        <h2 className="text-lg font-bold text-white mb-4">История платежей</h2>
        <div className="space-y-3">
          {payments.map(p => (
            <div key={p.id} className="rounded-xl p-5 flex items-center gap-4"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}>
                <CheckCircle size={16} className="text-success" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-white text-sm">{p.desc}</p>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.25)' }}>{p.date} · {p.id}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="font-bold text-white">{p.amount}</span>
                <button className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg transition-colors"
                  style={{ color: 'rgba(255,255,255,0.35)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <Download size={12} />
                  Чек
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
