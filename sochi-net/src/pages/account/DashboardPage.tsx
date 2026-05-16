import { motion } from 'framer-motion'
import { staggerContainer, fadeUp } from '../../utils/animations'
import { Wifi, CreditCard, Star, Gift, Bell, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const loyaltyLevels = ['Стандарт', 'Партнёр', 'VIP']

export function DashboardPage() {
  const currentLevel = 1
  const points = 340
  const nextLevelPoints = 500
  const progress = (points / nextLevelPoints) * 100

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={fadeUp}>
        <h1 className="text-2xl font-bold text-white mb-0.5">Добрый день, Иван!</h1>
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>Все системы работают нормально</p>
      </motion.div>

      <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatusCard />
        <PaymentCard />
        <PointsCard points={points} />
      </motion.div>

      <motion.div variants={fadeUp}>
        <LoyaltyCard currentLevel={currentLevel} points={points} nextLevelPoints={nextLevelPoints} progress={progress} />
      </motion.div>

      <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <QuickLink to="/account/tickets" icon={Bell} label="Заявки" desc="1 заявка в работе" />
        <QuickLink to="/account/referrals" icon={Gift} label="Рефералы" desc="Пригласите друга — получите месяц бесплатно" />
      </motion.div>
    </motion.div>
  )
}

function StatusCard() {
  return (
    <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.2)' }}>
          <Wifi size={18} className="text-success" />
        </div>
        <span className="flex items-center gap-1.5 text-xs text-success px-2 py-1 rounded-full"
          style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse-slow" />
          Активно
        </span>
      </div>
      <p className="text-sm mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Статус соединения</p>
      <p className="text-xl font-bold text-white">Работает</p>
      <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.25)' }}>Тариф: Домашний</p>
    </div>
  )
}

function PaymentCard() {
  return (
    <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
        <CreditCard size={18} style={{ color: 'rgba(255,255,255,0.6)' }} />
      </div>
      <p className="text-sm mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Следующий платёж</p>
      <p className="text-xl font-bold text-white">600 ₽</p>
      <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.25)' }}>15 июня 2024</p>
      <Link to="/account/payments" className="mt-3 text-xs flex items-center gap-1 transition-colors text-white/40 hover:text-white/70">
        Оплатить <ChevronRight size={12} />
      </Link>
    </div>
  )
}

function PointsCard({ points }: { points: number }) {
  return (
    <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
        <Star size={18} style={{ color: 'rgba(255,255,255,0.6)' }} />
      </div>
      <p className="text-sm mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Бонусных баллов</p>
      <p className="text-xl font-bold text-white">{points}</p>
      <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.25)' }}>1 балл = 1 ₽ скидки</p>
    </div>
  )
}

function LoyaltyCard({
  currentLevel, points, nextLevelPoints, progress
}: {
  currentLevel: number
  points: number
  nextLevelPoints: number
  progress: number
}) {
  return (
    <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.2)' }}>Статус лояльности</p>
          <p className="text-xl font-bold text-white flex items-center gap-2">
            <Star size={18} style={{ color: 'rgba(255,255,255,0.5)', fill: 'rgba(255,255,255,0.3)' }} />
            {['Стандарт', 'Партнёр', 'VIP'][currentLevel]}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>До уровня «{loyaltyLevels[currentLevel + 1]}»</p>
          <p className="text-sm font-semibold text-white">{nextLevelPoints - points} баллов</p>
        </div>
      </div>

      <div className="mb-4">
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="h-full bg-white rounded-full"
          />
        </div>
      </div>

      <div className="flex justify-between">
        {loyaltyLevels.map((level, i) => (
          <div key={level} className="flex flex-col items-center gap-1">
            <div className="w-3 h-3 rounded-full border-2 transition-colors"
              style={i <= currentLevel
                ? { background: '#fff', borderColor: '#fff' }
                : { background: 'transparent', borderColor: 'rgba(255,255,255,0.15)' }
              } />
            <span className="text-xs" style={{ color: i <= currentLevel ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.2)' }}>
              {level}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function QuickLink({ to, icon: Icon, label, desc }: {
  to: string; icon: React.ElementType; label: string; desc: string
}) {
  return (
    <Link to={to} className="rounded-xl p-5 flex items-center gap-4 transition-all group"
      style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: 'rgba(255,255,255,0.05)' }}>
        <Icon size={18} style={{ color: 'rgba(255,255,255,0.6)' }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-white text-sm">{label}</p>
        <p className="text-xs mt-0.5 truncate" style={{ color: 'rgba(255,255,255,0.35)' }}>{desc}</p>
      </div>
      <ChevronRight size={16} className="shrink-0 transition-colors" style={{ color: 'rgba(255,255,255,0.2)' }} />
    </Link>
  )
}
