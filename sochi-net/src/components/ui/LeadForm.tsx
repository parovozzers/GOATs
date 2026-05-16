import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle } from 'lucide-react'

interface Props {
  ctaText?: string
  size?: 'sm' | 'lg'
}

export function LeadForm({ ctaText = 'Оставить заявку', size = 'lg' }: Props) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !phone.trim()) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 900))
    setLoading(false)
    setSent(true)
  }

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-3 py-6"
      >
        <div className="w-12 h-12 rounded-full border flex items-center justify-center"
          style={{ borderColor: 'rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.04)' }}>
          <CheckCircle size={22} className="text-white" />
        </div>
        <p className="text-lg font-semibold text-white">Заявка принята!</p>
        <p className="text-sm text-center" style={{ color: 'rgba(255,255,255,0.4)' }}>
          Мы свяжемся с вами в течение 15 минут
        </p>
      </motion.div>
    )
  }

  const inputStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: size === 'lg' ? '12px' : '10px',
    padding: size === 'lg' ? '14px 16px' : '10px 14px',
    color: '#fff',
    width: '100%',
    fontSize: size === 'lg' ? '15px' : '14px',
    outline: 'none',
    transition: 'border-color 0.2s',
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
      <input
        type="text"
        placeholder="Ваше имя"
        value={name}
        onChange={e => setName(e.target.value)}
        required
        style={inputStyle}
        onFocus={e => (e.target.style.borderColor = 'rgba(255,255,255,0.3)')}
        onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
      />
      <input
        type="tel"
        placeholder="+7 (___) ___-__-__"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        required
        style={inputStyle}
        onFocus={e => (e.target.style.borderColor = 'rgba(255,255,255,0.3)')}
        onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
      />
      <motion.button
        type="submit"
        disabled={loading}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className="btn-primary justify-center"
      >
        {loading
          ? <span className="w-4 h-4 border-2 rounded-full animate-spin" style={{ borderColor: 'rgba(0,0,0,0.2)', borderTopColor: '#000' }} />
          : <Send size={15} />
        }
        {loading ? 'Отправляем...' : ctaText}
      </motion.button>
      <p className="text-xs text-center" style={{ color: 'rgba(255,255,255,0.2)' }}>
        Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
      </p>
    </form>
  )
}
