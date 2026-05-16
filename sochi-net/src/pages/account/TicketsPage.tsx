import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { staggerContainer, fadeUp } from '../../utils/animations'
import { Plus, ChevronDown, Send, Clock, CheckCircle, AlertCircle } from 'lucide-react'

const tickets = [
  {
    id: 'TK-041',
    subject: 'Медленная загрузка YouTube по вечерам',
    status: 'in_progress',
    date: '12 мая 2024',
    messages: [
      { from: 'user', text: 'Замечаю что по вечерам примерно с 21 до 23 YouTube тормозит.', time: '12 мая, 19:30' },
      { from: 'support', text: 'Приняли в работу. Проверяем нагрузку на вашем сегменте. Ответим до завтра.', time: '12 мая, 20:15' },
    ],
  },
  {
    id: 'TK-038',
    subject: 'Не работает Telegram на Smart TV',
    status: 'resolved',
    date: '3 мая 2024',
    messages: [
      { from: 'user', text: 'Телевизор перестал получать доступ к Telegram после обновления прошивки.', time: '3 мая, 11:00' },
      { from: 'support', text: 'Обновили конфигурацию удалённо. Проверьте — должно работать.', time: '3 мая, 11:45' },
      { from: 'user', text: 'Да, заработало! Спасибо!', time: '3 мая, 12:00' },
    ],
  },
]

const statusMap: Record<string, { icon: React.ElementType; label: string; color: string; bg: string; border: string }> = {
  new: { icon: AlertCircle, label: 'Новая', color: '#eab308', bg: 'rgba(234,179,8,0.08)', border: 'rgba(234,179,8,0.2)' },
  in_progress: { icon: Clock, label: 'В работе', color: 'rgba(255,255,255,0.75)', bg: 'rgba(255,255,255,0.06)', border: 'rgba(255,255,255,0.12)' },
  resolved: { icon: CheckCircle, label: 'Решена', color: '#22c55e', bg: 'rgba(34,197,94,0.08)', border: 'rgba(34,197,94,0.2)' },
}

function TicketItem({ ticket }: { ticket: typeof tickets[0] }) {
  const [open, setOpen] = useState(false)
  const [reply, setReply] = useState('')
  const s = statusMap[ticket.status]
  const SIcon = s.icon

  return (
    <div className="rounded-xl overflow-hidden"
      style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 p-5 text-left transition-colors hover:bg-white/[0.02]"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>{ticket.id}</span>
            <span className="text-xs px-2 py-0.5 rounded-full border flex items-center gap-1"
              style={{ color: s.color, background: s.bg, borderColor: s.border }}>
              <SIcon size={11} /> {s.label}
            </span>
          </div>
          <p className="font-semibold text-white text-sm truncate">{ticket.subject}</p>
          <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.25)' }}>{ticket.date}</p>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={16} className="shrink-0" style={{ color: 'rgba(255,255,255,0.3)' }} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
            style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
          >
            <div className="p-5 space-y-3">
              {ticket.messages.map((msg, i) => (
                <div key={i} className={`flex flex-col gap-1 max-w-md ${msg.from === 'user' ? 'ml-auto items-end' : ''}`}>
                  <div className="rounded-xl px-4 py-2.5 text-sm"
                    style={msg.from === 'user'
                      ? { background: 'rgba(255,255,255,0.1)', color: '#fff' }
                      : { background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.7)' }
                    }>
                    {msg.text}
                  </div>
                  <span className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>{msg.time}</span>
                </div>
              ))}

              {ticket.status !== 'resolved' && (
                <div className="flex gap-3 mt-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  <input
                    type="text"
                    placeholder="Написать ответ..."
                    value={reply}
                    onChange={e => setReply(e.target.value)}
                    className="flex-1 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none transition-colors"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                  />
                  <button className="btn-primary py-2 px-4 text-sm">
                    <Send size={15} />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function TicketsPage() {
  const [showForm, setShowForm] = useState(false)
  const [subject, setSubject] = useState('')
  const [msg, setMsg] = useState('')

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={fadeUp} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Заявки</h1>
          <p className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>История обращений и переписка</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary text-sm py-2 px-4 flex items-center gap-2">
          <Plus size={15} /> Новая заявка
        </button>
      </motion.div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="rounded-2xl p-6 space-y-4"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <h3 className="font-semibold text-white">Новая заявка</h3>
            <input
              type="text"
              placeholder="Тема обращения"
              value={subject}
              onChange={e => setSubject(e.target.value)}
              className="w-full rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
            />
            <textarea
              placeholder="Опишите проблему..."
              value={msg}
              onChange={e => setMsg(e.target.value)}
              rows={4}
              className="w-full rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors resize-none"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
            />
            <div className="flex gap-3">
              <button className="btn-primary text-sm">Отправить</button>
              <button onClick={() => setShowForm(false)} className="btn-outline text-sm">Отмена</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div variants={staggerContainer} className="space-y-3">
        {tickets.map(t => (
          <motion.div key={t.id} variants={fadeUp}>
            <TicketItem ticket={t} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
