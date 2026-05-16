import { useState } from 'react'
import { motion } from 'framer-motion'
import { staggerContainer, fadeUp } from '../../utils/animations'
import { Copy, Check, Gift, Users, Calendar } from 'lucide-react'

const referrals = [
  { name: 'Дмитрий К.', date: '10 апреля 2024', bonus: '+1 мес', status: 'active' },
  { name: 'Мария В.', date: '2 марта 2024', bonus: '+1 мес', status: 'active' },
  { name: 'Алексей Н.', date: '14 февраля 2024', bonus: '+1 мес', status: 'pending' },
]

export function ReferralsPage() {
  const [copied, setCopied] = useState(false)
  const link = 'https://sochinet.ru/ref/ivan2024'

  const copy = () => {
    navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={fadeUp}>
        <h1 className="text-2xl font-bold text-white">Рефералы</h1>
        <p className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>Приглашайте друзей — получайте бонусные месяцы</p>
      </motion.div>

      <motion.div variants={fadeUp} className="rounded-2xl p-7 relative overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-[80px] pointer-events-none"
          style={{ background: 'rgba(255,255,255,0.04)' }} />
        <div className="flex items-start gap-4 mb-6 relative z-10">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}>
            <Gift size={22} style={{ color: 'rgba(255,255,255,0.8)' }} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Приведи друга — получи месяц бесплатно</h2>
            <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
              За каждого подключённого по вашей ссылке — +1 бесплатный месяц для вас. Без ограничений.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <div className="flex-1 rounded-xl px-4 py-3 text-sm font-mono truncate"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)' }}>
            {link}
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={copy}
            className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all"
            style={copied
              ? { background: 'rgba(34,197,94,0.12)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.25)' }
              : { background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1px solid rgba(255,255,255,0.15)' }
            }
          >
            {copied ? <Check size={15} /> : <Copy size={15} />}
            {copied ? 'Скопировано' : 'Скопировать'}
          </motion.button>
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard icon={Users} label="Приглашено" value="3" />
        <StatCard icon={Gift} label="Бонусных месяцев" value="2" />
        <StatCard icon={Calendar} label="Следующий бонус" value="Авг 2024" />
      </motion.div>

      <motion.div variants={fadeUp}>
        <h2 className="text-lg font-bold text-white mb-4">Приглашённые</h2>
        <div className="space-y-3">
          {referrals.map(r => (
            <div key={r.name} className="rounded-xl p-5 flex items-center gap-4"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)' }}>
                {r.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-white text-sm">{r.name}</p>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.25)' }}>Подключён {r.date}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="font-semibold text-sm text-success">{r.bonus}</span>
                <span className="text-xs px-2 py-0.5 rounded-full border"
                  style={r.status === 'active'
                    ? { color: '#22c55e', background: 'rgba(34,197,94,0.08)', borderColor: 'rgba(34,197,94,0.2)' }
                    : { color: '#eab308', background: 'rgba(234,179,8,0.08)', borderColor: 'rgba(234,179,8,0.2)' }
                  }>
                  {r.status === 'active' ? 'Активен' : 'Ожидает'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

function StatCard({ icon: Icon, label, value }: {
  icon: React.ElementType; label: string; value: string
}) {
  return (
    <div className="rounded-xl p-5" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
        <Icon size={16} style={{ color: 'rgba(255,255,255,0.6)' }} />
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>{label}</p>
    </div>
  )
}
