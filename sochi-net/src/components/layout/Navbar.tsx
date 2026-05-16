import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const isAccount = location.pathname.startsWith('/account')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMobileOpen(false), [location])

  const isActive = (path: string) => location.pathname === path

  if (isAccount) return null

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b'
          : 'bg-transparent'
      }`}
      style={scrolled ? {
        borderColor: 'rgba(255,255,255,0.1)',
        background: 'linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 100%)',
        backdropFilter: 'blur(52px) saturate(180%) brightness(1.1)',
        WebkitBackdropFilter: 'blur(52px) saturate(180%) brightness(1.1)',
        boxShadow: 'inset 0 -1px 0 rgba(0,0,0,0.12), 0 8px 32px rgba(0,0,0,0.3)',
      } : { borderColor: 'transparent' }}
    >
      <div className="container-max flex items-center justify-between h-16 px-4 md:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle"
                fill="white" fontWeight="700" fontSize="7.5" fontFamily="system-ui,-apple-system,sans-serif">RC</text>
            </svg>
          </div>
          <span className="font-bold text-white tracking-tight">RICH CONNECT</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/" active={isActive('/')}>Частным лицам</NavLink>
          <NavLink to="/business" active={isActive('/business')}>Бизнесу</NavLink>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/account" className="btn-outline text-sm py-2 px-4">
            Кабинет
          </Link>
          <a href="#lead-form" className="btn-primary text-sm py-2 px-5">
            Оставить заявку
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 transition-colors"
          style={{ color: 'rgba(255,255,255,0.5)' }}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
            style={{ background: '#000', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="flex flex-col p-4 gap-1">
              <MobileNavLink to="/" active={isActive('/')}>Частным лицам</MobileNavLink>
              <MobileNavLink to="/business" active={isActive('/business')}>Бизнесу</MobileNavLink>
              <div className="my-2" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }} />
              <MobileNavLink to="/account" active={false}>Личный кабинет</MobileNavLink>
              <a href="#lead-form" className="btn-primary justify-center mt-2 text-sm">
                Оставить заявку
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

function NavLink({ to, active, children }: { to: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
      style={{
        color: active ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)',
        background: active ? 'rgba(255,255,255,0.06)' : 'transparent',
      }}
    >
      {children}
    </Link>
  )
}

function MobileNavLink({ to, active, children }: { to: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="px-4 py-3 rounded-xl text-sm font-medium transition-colors"
      style={{
        color: active ? '#fff' : 'rgba(255,255,255,0.5)',
        background: active ? 'rgba(255,255,255,0.06)' : 'transparent',
      }}
    >
      {children}
    </Link>
  )
}
