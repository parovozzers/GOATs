import { motion } from 'framer-motion'
import { staggerContainer, fadeUp } from '../../utils/animations'
import { Bell, Wrench, CreditCard, Megaphone } from 'lucide-react'

const notifications = [
  {
    icon: Wrench,
    type: 'maintenance',
    title: 'Плановое обслуживание',
    body: '18 мая с 03:00 до 05:00 проводим плановое обслуживание сети. Возможны кратковременные прерывания.',
    date: '15 мая 2024',
    read: false,
  },
  {
    icon: CreditCard,
    type: 'payment',
    title: 'Напоминание об оплате',
    body: 'До списания абонентской платы осталось 3 дня. Убедитесь, что карта привязана или оплатите вручную.',
    date: '12 мая 2024',
    read: false,
  },
  {
    icon: Megaphone,
    type: 'news',
    title: 'Новая услуга: Резервный канал',
    body: 'Теперь вы можете подключить резервный интернет-канал через SIM-карту. При обрыве основного — сеть не пропадёт.',
    date: '5 мая 2024',
    read: true,
  },
  {
    icon: Bell,
    type: 'system',
    title: 'Система работает стабильно',
    body: 'Плановая проверка завершена. Все показатели в норме.',
    date: '1 мая 2024',
    read: true,
  },
]

export function NotificationsPage() {
  const unread = notifications.filter(n => !n.read).length

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={fadeUp} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Уведомления</h1>
          <p className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>
            {unread > 0 ? `${unread} непрочитанных` : 'Все прочитаны'}
          </p>
        </div>
        {unread > 0 && (
          <button className="text-sm transition-colors" style={{ color: 'rgba(255,255,255,0.35)' }}>
            Отметить все прочитанными
          </button>
        )}
      </motion.div>

      <motion.div variants={staggerContainer} className="space-y-3">
        {notifications.map((n, i) => {
          const Icon = n.icon
          return (
            <motion.div
              key={i}
              variants={fadeUp}
              className="rounded-xl p-5 flex gap-4 transition-all"
              style={{
                background: n.read ? 'rgba(255,255,255,0.015)' : 'rgba(255,255,255,0.03)',
                border: n.read ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <Icon size={17} style={{ color: n.read ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.75)' }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <p className="font-semibold text-sm" style={{ color: n.read ? 'rgba(255,255,255,0.55)' : '#fff' }}>
                    {n.title}
                    {!n.read && (
                      <span className="ml-2 inline-block w-1.5 h-1.5 rounded-full bg-white align-middle opacity-70" />
                    )}
                  </p>
                  <span className="text-xs shrink-0" style={{ color: 'rgba(255,255,255,0.2)' }}>{n.date}</span>
                </div>
                <p className="text-sm mt-1 leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>{n.body}</p>
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </motion.div>
  )
}
