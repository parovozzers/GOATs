import { useState } from 'react'
import { Link, useLocation, Outlet } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Package, TicketCheck, CreditCard,
  Users, Bell, LogOut, Menu, X, ChevronRight
} from 'lucide-react'

const nav = [
  { to: '/account', icon: LayoutDashboard, label: 'Главная' },
  { to: '/account/services', icon: Package, label: 'Мои услуги' },
  { to: '/account/tickets', icon: TicketCheck, label: 'Заявки' },
  { to: '/account/payments', icon: CreditCard, label: 'Платежи' },
  { to: '/account/referrals', icon: Users, label: 'Рефералы' },
  { to: '/account/notifications', icon: Bell, label: 'Уведомления' },
]

export function AccountLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  const isActive = (to: string) =>
    to === '/account' ? location.pathname === '/account' : location.pathname.startsWith(to)

  return (
    <div className="min-h-screen bg-black flex">
      <aside className="hidden lg:flex w-64 flex-col fixed top-0 left-0 bottom-0"
        style={{ background: '#080808', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-2 px-6 h-16"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <Link to="/" className="flex items-center gap-2 font-bold text-lg">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <polygon points="12,2 22,7 22,17 12,22 2,17 2,7" stroke="white" strokeWidth="1.5" fill="none" />
                <polygon points="12,7 17,9.5 17,14.5 12,17 7,14.5 7,9.5" fill="white" fillOpacity="0.6" />
              </svg>
            </div>
            <span className="gradient-text">RICH CONNECT</span>
          </Link>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {nav.map(({ to, icon: Icon, label }) => (
            <Link
              key={to}
              to={to}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group"
              style={isActive(to)
                ? { background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff' }
                : { color: 'rgba(255,255,255,0.4)', border: '1px solid transparent' }
              }
            >
              <Icon size={17} />
              {label}
              {isActive(to) && <ChevronRight size={14} className="ml-auto" style={{ color: 'rgba(255,255,255,0.4)' }} />}
            </Link>
          ))}
        </nav>

        <div className="px-3 py-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="px-4 py-3 mb-2">
            <p className="text-sm font-semibold text-white">Иван Петров</p>
            <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>+7 988 123-45-67</p>
          </div>
          <button className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all w-full"
            style={{ color: 'rgba(255,255,255,0.3)' }}>
            <LogOut size={16} />
            Выйти
          </button>
        </div>
      </aside>

      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-4"
        style={{ background: '#080808', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <Link to="/" className="flex items-center gap-2 font-bold">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle"
                fill="white" fontWeight="700" fontSize="7.5" fontFamily="system-ui,-apple-system,sans-serif">RC</text>
            </svg>
          </div>
          <span className="gradient-text">RICH CONNECT</span>
        </Link>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2"
          style={{ color: 'rgba(255,255,255,0.5)' }}>
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden fixed inset-0 z-40 bg-black/70"
            />
            <motion.div
              initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="lg:hidden fixed top-0 left-0 bottom-0 w-64 z-50 flex flex-col"
              style={{ background: '#080808', borderRight: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="h-14 flex items-center px-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <span className="font-bold gradient-text">Меню</span>
              </div>
              <nav className="flex-1 px-3 py-4 space-y-1">
                {nav.map(({ to, icon: Icon, label }) => (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setSidebarOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all"
                    style={isActive(to)
                      ? { background: 'rgba(255,255,255,0.08)', color: '#fff' }
                      : { color: 'rgba(255,255,255,0.4)' }
                    }
                  >
                    <Icon size={17} />
                    {label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="flex-1 lg:ml-64 pt-14 lg:pt-0 min-h-screen">
        <div className="p-4 md:p-8 max-w-5xl">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
