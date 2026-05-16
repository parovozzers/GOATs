import { motion } from 'framer-motion'
import { staggerContainer, fadeUp, viewportOnce } from '../../utils/animations'
import { Check } from 'lucide-react'

const plans = [
  {
    name: 'Малый',
    seats: 'до 5 человек',
    setup: '5 000 ₽',
    monthly: '900 ₽/мес',
    features: ['До 5 устройств', 'Настройка за 1 визит', 'Поддержка онлайн'],
    highlight: false,
  },
  {
    name: 'Команда',
    seats: 'до 15 человек',
    setup: '7 000 ₽',
    monthly: '1 900 ₽/мес',
    features: ['До 15 устройств', 'Приоритетная поддержка', 'Мониторинг 24/7', 'Удалённый доступ'],
    highlight: true,
  },
  {
    name: 'Офис',
    seats: 'до 30 человек',
    setup: '10 000 ₽',
    monthly: '3 500 ₽/мес',
    features: ['До 30 устройств', 'Выделенный менеджер', 'SLA 4 часа', 'Firewall включён'],
    highlight: false,
  },
  {
    name: 'Корпоратив',
    seats: 'до 60 человек',
    setup: 'По запросу',
    monthly: 'По запросу',
    features: ['Неограниченно устройств', 'SLA 2 часа', 'Несколько офисов', 'Персональный менеджер'],
    highlight: false,
  },
]

export function BusinessPricing() {
  return (
    <section className="section-padding" style={{ background: '#080808' }}>
      <div className="container-max">
        <motion.div
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}
          className="text-center mb-14"
        >
          <motion.span variants={fadeUp} className="section-label mb-4 inline-block">Тарифы</motion.span>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-white mb-4">
            Выберите свой формат
          </motion.h2>
          <motion.p variants={fadeUp} className="max-w-lg mx-auto" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Тарифы по размеру команды. Никаких скрытых платежей.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {plans.map(({ name, seats, setup, monthly, features, highlight }) => (
            <motion.div
              key={name}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="relative rounded-2xl p-6 flex flex-col"
              style={{
                background: highlight ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.02)',
                border: highlight ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(255,255,255,0.07)',
              }}
            >
              {highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white text-black whitespace-nowrap">
                    Популярный
                  </span>
                </div>
              )}

              <div className="mb-4">
                <p className="font-bold text-white text-lg">{name}</p>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>{seats}</p>
              </div>

              <div className="mb-6">
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>Установка</p>
                <p className="text-xl font-bold text-white">{setup}</p>
                <p className="text-xs mt-2" style={{ color: 'rgba(255,255,255,0.3)' }}>Ежемесячно</p>
                <p className="text-xl font-bold text-white">{monthly}</p>
              </div>

              <ul className="space-y-2 flex-1 mb-6">
                {features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: 'rgba(255,255,255,0.08)' }}>
                      <Check size={9} className="text-white" />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#lead-form"
                className="text-center py-2.5 rounded-xl text-sm font-semibold transition-all"
                style={highlight
                  ? { background: '#fff', color: '#000' }
                  : { border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)' }
                }
              >
                Выбрать
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
