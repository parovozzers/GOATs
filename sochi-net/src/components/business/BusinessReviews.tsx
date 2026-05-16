import { motion } from 'framer-motion'
import { staggerContainer, fadeUp, viewportOnce } from '../../utils/animations'

const reviews = [
  {
    name: 'Алексей Громов',
    company: 'Кофейня «Берег», Сочи',
    text: 'Сотрудники перестали жаловаться на связь. Теперь Telegram работает нормально, касса не зависает. Подключили весь персонал за один день.',
    stars: 5,
  },
  {
    name: 'Марина Соколова',
    company: 'Салон красоты «Аура», Адлер',
    text: 'Instagram работает стабильно — клиенты пишут в Direct, мы отвечаем без задержек. Запись через Telegram-бота работает без сбоев. Рекомендую всем.',
    stars: 5,
  },
  {
    name: 'Игорь Петров',
    company: 'Агентство недвижимости, Сочи',
    text: 'Видеозвонки с клиентами больше не прерываются. Документы передаём через мессенджеры без проблем. Команда работает из разных районов города.',
    stars: 5,
  },
  {
    name: 'Светлана Куликова',
    company: 'Фитнес-клуб «Форма», Хоста',
    text: 'Гостевой WiFi для клиентов — отдельная история. Люди оценили. Камеры смотрю с телефона из дома. За полгода ни одной проблемы.',
    stars: 5,
  },
]

export function BusinessReviews() {
  return (
    <section className="section-padding" style={{ background: '#080808' }}>
      <div className="container-max">
        <motion.div
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}
          className="text-center mb-14"
        >
          <motion.span variants={fadeUp} className="section-label mb-4 inline-block">Отзывы</motion.span>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-white mb-4">
            Бизнесы, которые уже работают с нами
          </motion.h2>
        </motion.div>

        <motion.div
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {reviews.map(({ name, company, text, stars }) => (
            <motion.div
              key={name}
              variants={fadeUp}
              whileHover={{ y: -4, borderColor: 'rgba(255,255,255,0.12)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="rounded-xl p-7 flex flex-col gap-4"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="flex gap-1">
                {[...Array(stars)].map((_, i) => (
                  <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 1L7.5 4.5H11L8.2 6.8L9.2 10.5L6 8.2L2.8 10.5L3.8 6.8L1 4.5H4.5L6 1Z"
                      fill="rgba(255,255,255,0.5)" />
                  </svg>
                ))}
              </div>
              <p className="text-sm leading-relaxed flex-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
                «{text}»
              </p>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 12 }}>
                <p className="font-semibold text-white text-sm">{name}</p>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.25)' }}>{company}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
