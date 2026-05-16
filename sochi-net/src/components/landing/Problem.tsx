import { motion } from 'framer-motion'
import { staggerContainer, fadeUp, viewportOnce } from '../../utils/animations'
import { WifiOff, ToggleLeft, Tv, Smartphone } from 'lucide-react'
import { HoverBorderGradient } from '../ui/HoverBorderGradient'


const problems = [
  {
    icon: ToggleLeft,
    title: 'Нужно каждый раз включать VPN вручную',
    desc: 'Вы открываете приложение, нажимаете «Подключить», ждёте... и не всегда получается с первого раза.',
  },
  {
    icon: WifiOff,
    title: 'Тормозит и обрывается',
    desc: 'Видео грузится по три секунды, звонок прерывается на полуслове. Уже не уверены, включили ли вообще.',
  },
  {
    icon: Tv,
    title: 'Телевизор и приставка не работают',
    desc: 'На телефоне как-то работает, а на Smart TV или PlayStation — нет. Приложение не установить.',
  },
  {
    icon: Smartphone,
    title: 'На каждый гаджет отдельно',
    desc: 'У вас 5 устройств, и на каждом нужно что-то настраивать. Гости вообще остаются без доступа.',
  },
]

export function Problem() {
  return (
    <section id="section-problem" className="section-padding" style={{ background: '#080808' }}>
      <div className="container-max w-full max-w-[1100px]">
        <motion.div
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}
          className="text-center mb-14"
        >
          <motion.div variants={fadeUp} className="mb-5 inline-block">
            <HoverBorderGradient duration={5} contentClassName="px-3 py-1 text-xs font-semibold uppercase tracking-widest">
              Узнаёте себя?
            </HoverBorderGradient>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-white mb-4">
            Как выглядит жизнь с <span className="gradient-text">обычными приложениями</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="max-w-xl mx-auto text-lg" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Миллионы людей каждый день проходят один и тот же ритуал.{' '}
            <span style={{ color: '#fff' }} className="font-semibold">Мы его отменили.</span>
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}
          className="grid grid-cols-1 md:grid-cols-2 gap-3"
        >
          {problems.map(({ icon: Icon, title, desc }) => (
            <motion.div key={title} variants={fadeUp} className="h-full"
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 350, damping: 22 }}
              style={{ filter: 'drop-shadow(0 4px 24px rgba(0,0,0,0.6)) drop-shadow(0 0 1px rgba(255,255,255,0.08))' }}
            >
              <HoverBorderGradient
                block
                liquidGlass
                rounded="rounded-2xl"
                duration={5}
                className="h-full w-full"
                contentClassName="p-7 flex gap-5 w-full h-full"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
                  <Icon size={18} style={{ color: '#fff' }} />
                </div>
                <div>
                  <p className="font-semibold mb-1.5 text-base" style={{ color: '#fff' }}>{title}</p>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{desc}</p>
                </div>
              </HoverBorderGradient>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <p className="text-lg" style={{ color: 'rgba(255,255,255,0.35)' }}>
            Если хотя бы один пункт про вас —{' '}
            <span className="text-white font-semibold">читайте дальше.</span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
