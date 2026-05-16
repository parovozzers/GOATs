import { motion } from 'framer-motion'
import { staggerContainer, fadeUp } from '../../utils/animations'
import { Wifi, Camera, Shield, Plus, RefreshCw } from 'lucide-react'

const services = [
  {
    icon: Wifi,
    name: 'Домашний интернет',
    desc: 'Основная услуга — YouTube, Telegram, Discord',
    status: 'active',
    renewal: '15 июня 2024',
    price: '600 ₽/мес',
  },
  {
    icon: Camera,
    name: 'Удалённый доступ к камерам',
    desc: 'Просмотр с телефона и ПК',
    status: 'active',
    renewal: '15 июня 2024',
    price: '200 ₽/мес',
  },
  {
    icon: Shield,
    name: 'Расширенный мониторинг',
    desc: 'Проактивное слежение и уведомления',
    status: 'inactive',
    renewal: null,
    price: '150 ₽/мес',
  },
]

const statusMap: Record<string, { label: string; color: string; bg: string; border: string }> = {
  active: { label: 'Активна', color: '#22c55e', bg: 'rgba(34,197,94,0.08)', border: 'rgba(34,197,94,0.2)' },
  inactive: { label: 'Отключена', color: 'rgba(255,255,255,0.3)', bg: 'rgba(255,255,255,0.04)', border: 'rgba(255,255,255,0.08)' },
}

export function ServicesPage() {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={fadeUp} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Мои услуги</h1>
          <p className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>Управление подключёнными сервисами</p>
        </div>
        <button className="btn-primary text-sm py-2 px-4 flex items-center gap-2">
          <Plus size={15} /> Добавить услугу
        </button>
      </motion.div>

      <motion.div variants={staggerContainer} className="space-y-4">
        {services.map(({ icon: Icon, name, desc, status, renewal, price }) => {
          const s = statusMap[status]
          return (
            <motion.div
              key={name}
              variants={fadeUp}
              className="rounded-2xl p-6 flex flex-col md:flex-row md:items-center gap-5"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <Icon size={20} style={{ color: 'rgba(255,255,255,0.7)' }} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-3 flex-wrap">
                  <p className="font-semibold text-white">{name}</p>
                  <span className="text-xs px-2 py-0.5 rounded-full border"
                    style={{ color: s.color, background: s.bg, borderColor: s.border }}>
                    {s.label}
                  </span>
                </div>
                <p className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>{desc}</p>
                {renewal && (
                  <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.25)' }}>Продление: {renewal}</p>
                )}
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-white font-semibold">{price}</span>
                <button
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                  style={status === 'active'
                    ? { border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.45)' }
                    : { background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1px solid rgba(255,255,255,0.15)' }
                  }
                >
                  <RefreshCw size={14} />
                  {status === 'active' ? 'Продлить' : 'Подключить'}
                </button>
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </motion.div>
  )
}
