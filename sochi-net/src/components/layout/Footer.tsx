import { Link, useLocation } from 'react-router-dom'
import { Phone, Send } from 'lucide-react'

export function Footer() {
  const location = useLocation()
  if (location.pathname.startsWith('/account')) return null

  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: '#000' }}>
      <div className="container-max px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 font-bold text-lg mb-3">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle"
                    fill="white" fontWeight="700" fontSize="7.5" fontFamily="system-ui,-apple-system,sans-serif">RC</text>
                </svg>
              </div>
              <span className="text-white">RICH CONNECT</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
              Настраиваем интернет так, чтобы YouTube, Telegram и Discord работали стабильно дома и в офисе.
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: 'rgba(255,255,255,0.2)' }}>
              Навигация
            </p>
            <ul className="space-y-2 text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>
              <li><Link to="/" className="hover:text-white transition-colors">Частным лицам</Link></li>
              <li><Link to="/business" className="hover:text-white transition-colors">Бизнесу</Link></li>
              <li><Link to="/account" className="hover:text-white transition-colors">Личный кабинет</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: 'rgba(255,255,255,0.2)' }}>
              Контакты
            </p>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="tel:+78002000000" className="flex items-center gap-2 hover:text-white transition-colors"
                  style={{ color: 'rgba(255,255,255,0.35)' }}>
                  <Phone size={13} style={{ color: 'rgba(255,255,255,0.4)' }} />
                  8 800 200-00-00
                </a>
              </li>
              <li>
                <a href="https://t.me/sochinet" className="flex items-center gap-2 hover:text-white transition-colors"
                  style={{ color: 'rgba(255,255,255,0.35)' }}>
                  <Send size={13} style={{ color: 'rgba(255,255,255,0.4)' }} />
                  Telegram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.18)' }}>
          <p>© 2024 RICH CONNECT. Все права защищены.</p>
          <p>Сочи, Краснодарский край</p>
        </div>
      </div>
    </footer>
  )
}
