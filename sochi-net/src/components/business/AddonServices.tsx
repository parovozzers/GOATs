import { motion } from 'framer-motion'
import { staggerContainer, fadeUp, viewportOnce } from '../../utils/animations'
import { Router, Wifi, Signal, Camera, Shield } from 'lucide-react'

const addons = [
  {
    icon: Router,
    title: 'Роутер под ключ',
    desc: 'Подберём и установим правильный роутер для вашего офиса. Никакой самостоятельной настройки.',
    price: 'от 3 500 ₽',
  },
  {
    icon: Wifi,
    title: 'Гостевой WiFi для клиентов',
    desc: 'Отдельная гостевая сеть для посетителей — без доступа к рабочим ресурсам, брендированная.',
    price: 'от 1 500 ₽',
  },
  {
    icon: Signal,
    title: 'Резервный интернет-канал',
    desc: 'Резервный канал через SIM-карту. Если основной интернет ляжет — бизнес продолжит работу.',
    price: 'от 900 ₽/мес',
  },
  {
    icon: Camera,
    title: 'Удалённое видеонаблюдение',
    desc: 'Настроим доступ к камерам из любой точки мира через Telegram или мобильное приложение.',
    price: 'от 2 000 ₽',
  },
  {
    icon: Shield,
    title: 'Firewall и контроль доступа',
    desc: 'Ограничим доступ сотрудников к нежелательным сайтам, настроим раздельные сети для отделов.',
    price: 'от 2 500 ₽',
  },
]

export function AddonServices() {
  return (
    <section className="section-padding bg-black">
      <div className="container-max">
        <motion.div
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}
          className="text-center mb-14"
        >
          <motion.span variants={fadeUp} className="section-label mb-4 inline-block">Дополнительно</motion.span>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-white mb-4">
            Дополнительные услуги
          </motion.h2>
          <motion.p variants={fadeUp} className="max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Всё для комплексной инфраструктуры офиса
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {addons.map(({ icon: Icon, title, desc, price }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              whileHover={{ y: -4, borderColor: 'rgba(255,255,255,0.12)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="rounded-xl p-6 flex flex-col gap-3"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <Icon size={18} style={{ color: 'rgba(255,255,255,0.7)' }} />
                </div>
                <span className="font-semibold text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>{price}</span>
              </div>
              <h3 className="font-bold text-white">{title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
