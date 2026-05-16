import { motion } from 'framer-motion'
import { staggerContainer, fadeUp, viewportOnce } from '../../utils/animations'
import { Check, X } from 'lucide-react'

const rows = [
  {
    param: 'Стабильность',
    them: 'Обрывается в самый неподходящий момент',
    us: 'Работает без перебоев, мы следим',
  },
  {
    param: 'Скорость',
    them: 'Замедляет весь интернет в офисе',
    us: 'Полная скорость канала',
  },
  {
    param: 'Настройка сотрудников',
    them: 'Каждый настраивает сам — хаос',
    us: 'Все в сети получают доступ автоматически',
  },
  {
    param: 'Устройства в офисе',
    them: 'Только телефоны и ноутбуки с приложением',
    us: 'Всё: ТВ, терминал, IP-камеры, принтеры',
  },
  {
    param: 'Поддержка',
    them: 'Нет поддержки — сами разбирайтесь',
    us: 'Мастер приедет или решит удалённо',
  },
  {
    param: 'Масштабирование',
    them: 'С каждым новым сотрудником — снова настраивать',
    us: 'Новые сотрудники получают доступ сразу',
  },
]

export function BusinessComparison() {
  return (
    <section className="section-padding bg-black">
      <div className="container-max">
        <motion.div
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}
          className="text-center mb-14"
        >
          <motion.span variants={fadeUp} className="section-label mb-4 inline-block">Сравнение</motion.span>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-white mb-4">
            Почему бизнес выбирает нас
          </motion.h2>
          <motion.p variants={fadeUp} className="max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.4)' }}>
            По параметрам, которые важны для вашей команды каждый день
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce}
          transition={{ duration: 0.6 }}
          className="rounded-2xl overflow-hidden"
          style={{ border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <div className="grid grid-cols-3 px-6 py-4"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
            <p className="text-xs uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.2)' }}>Параметр</p>
            <p className="text-xs text-center" style={{ color: 'rgba(255,255,255,0.25)' }}>
              <X size={12} className="inline mr-1" />Приложения
            </p>
            <p className="text-xs text-center text-white font-semibold">
              <Check size={12} className="inline mr-1" />RICH CONNECT для бизнеса
            </p>
          </div>

          {rows.map(({ param, them, us }, i) => (
            <motion.div
              key={param}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportOnce}
              transition={{ delay: i * 0.07 }}
              className="grid grid-cols-3 px-6 py-5 items-start"
              style={{
                borderBottom: i < rows.length - 1 ? '1px solid rgba(255,255,255,0.04)' : undefined,
                background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)',
              }}
            >
              <p className="text-sm font-medium text-white">{param}</p>
              <div className="flex items-start gap-2 text-sm justify-center text-center px-3"
                style={{ color: 'rgba(255,255,255,0.25)' }}>
                <X size={13} className="shrink-0 mt-0.5" />
                <span>{them}</span>
              </div>
              <div className="flex items-start gap-2 text-sm justify-center text-center px-3"
                style={{ color: 'rgba(255,255,255,0.75)' }}>
                <Check size={13} className="shrink-0 mt-0.5 text-white" />
                <span>{us}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
