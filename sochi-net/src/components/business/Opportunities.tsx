import { motion } from 'framer-motion'
import { staggerContainer, fadeUp, viewportOnce } from '../../utils/animations'
import { ShoppingBag, Bot, Building2 } from 'lucide-react'

const cards = [
  {
    icon: ShoppingBag,
    title: 'Привлечение клиентов',
    points: [
      'Instagram Stories и Reels без задержек',
      'Telegram-канал работает как часы',
      'Переписки с клиентами без потерь',
      'Таргет и аналитика в реальном времени',
    ],
  },
  {
    icon: Bot,
    title: 'Автоматизация и команда',
    points: [
      'CRM и боты работают без сбоев',
      'Сотрудники работают в Telegram без ограничений',
      'Видеосозвоны и планёрки без обрывов',
      'Онлайн-касса и эквайринг стабильно',
    ],
  },
  {
    icon: Building2,
    title: 'Управление бизнесом',
    points: [
      'Видеонаблюдение доступно удалённо',
      'Контроль персонала через привычные сервисы',
      'Резервный канал — бизнес не останавливается',
      'Один счёт на весь офис, без возни с сотрудниками',
    ],
  },
]

export function Opportunities() {
  return (
    <section className="section-padding" style={{ background: '#080808' }}>
      <div className="container-max">
        <motion.div
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}
          className="text-center mb-14"
        >
          <motion.span variants={fadeUp} className="section-label mb-4 inline-block">Возможности</motion.span>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-white mb-4">
            Стабильный интернет — это конкурентное преимущество
          </motion.h2>
          <motion.p variants={fadeUp} className="max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Пока конкуренты теряют клиентов из-за нестабильной связи, ваш бизнес работает и привлекает
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {cards.map(({ icon: Icon, title, points }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              whileHover={{ y: -6, borderColor: 'rgba(255,255,255,0.12)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="rounded-2xl p-7 flex flex-col gap-5"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
                <Icon size={22} style={{ color: 'rgba(255,255,255,0.8)' }} />
              </div>
              <h3 className="text-lg font-bold text-white">{title}</h3>
              <ul className="space-y-2.5">
                {points.map(pt => (
                  <li key={pt} className="flex items-start gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    <span className="mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>✓</span>
                    {pt}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
