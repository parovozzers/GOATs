import { motion } from 'framer-motion'
import { staggerContainer, fadeUp, viewportOnce } from '../../utils/animations'
import { HoverBorderGradient } from '../ui/HoverBorderGradient'

const reviews = [
  { name: 'Анастасия К.', city: 'Сочи, Центральный район', text: 'Наконец-то телевизор показывает YouTube нормально! Мастер приехал, всё настроил за час. Теперь работает даже приставка — никогда не думала, что это возможно без приложений.' },
  { name: 'Михаил Р.', city: 'Сочи, Адлер', text: 'Telegram работает как надо, видеозвонки не обрываются. Раньше приходилось каждый раз включать и молиться. Сейчас всё само.' },
  { name: 'Елена В.', city: 'Сочи, Хоста', text: 'Подключила всю семью — телефоны, ноутбуки, умная колонка. Всё работает одновременно, скорость не упала. Очень довольна.' },
  { name: 'Дмитрий Т.', city: 'Сочи, Лазаревское', text: 'Работаю удалённо, важна стабильность. Discord больше не отваливается во время созвонов. Платежи небольшие, а результат реальный.' },
  { name: 'Ольга М.', city: 'Сочи, Красная Поляна', text: 'Мастер объяснил что сделал. Теперь всё работает, даже у мамы на старом телефоне. Рекомендую всем соседям.' },
  { name: 'Сергей Б.', city: 'Сочи, Центральный район', text: 'Пробовал разные приложения — всегда что-то не так. Здесь иначе: один раз настроили и забыл. Уже 8 месяцев без единой проблемы.' },
]

export function Reviews() {
  return (
    <section id="section-reviews" className="section-padding bg-black">
      <div className="container-max">
        <motion.div
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}
          className="text-center mb-14"
        >
          <motion.div variants={fadeUp} className="mb-5 inline-block">
            <HoverBorderGradient duration={5} contentClassName="px-3 py-1 text-xs font-semibold uppercase tracking-widest">
              Отзывы
            </HoverBorderGradient>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-white">
            Что говорят клиенты
          </motion.h2>
        </motion.div>

        <motion.div
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
        >
          {reviews.map(({ name, city, text }) => (
            <motion.div
              key={name}
              variants={fadeUp}
              whileHover={{ y: -4, borderColor: 'rgba(255,255,255,0.18)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="liquid-card rounded-2xl p-6 flex flex-col gap-4"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
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
                <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.25)' }}>{city}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
