import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { WireframeDottedGlobe } from './components/ui/WireframeDottedGlobe'
import { StarField } from './components/ui/StarField'
import { HomePage } from './pages/HomePage'
import { BusinessPage } from './pages/BusinessPage'
import { AccountLayout } from './pages/account/AccountLayout'
import { DashboardPage } from './pages/account/DashboardPage'
import { ServicesPage } from './pages/account/ServicesPage'
import { TicketsPage } from './pages/account/TicketsPage'
import { PaymentsPage } from './pages/account/PaymentsPage'
import { ReferralsPage } from './pages/account/ReferralsPage'
import { NotificationsPage } from './pages/account/NotificationsPage'

const GLOBE_SECTIONS = [
  { id: 'section-problem',    xFactor: 0,     yFactor: 0 },
  { id: 'section-technology', xFactor: -0.22, yFactor: -0.10 },
  { id: 'section-comparison', xFactor: 0.22,  yFactor: 0 },
  { id: 'section-howitworks', xFactor: 0,     yFactor: 0 },
  { id: 'section-pricing',    xFactor: -0.22, yFactor: 0 },
  { id: 'section-reviews',    xFactor: 0,     yFactor: 0 },
  { id: 'section-faq',        xFactor: 0.22,  yFactor: 0 },
  { id: 'section-finalcta',   xFactor: -0.22, yFactor: 0 },
]

function GlobeBackground() {
  const xMotion = useMotionValue(0)
  const yMotion = useMotionValue(0)
  const springX = useSpring(xMotion, { stiffness: 38, damping: 22, mass: 1.8 })
  const springY = useSpring(yMotion, { stiffness: 38, damping: 22, mass: 1.8 })

  const { scrollY } = useScroll()
  const heroH = window.innerHeight
  const rawOpacity = useTransform(scrollY, [heroH * 0.2, heroH * 0.75], [0, 0.22])
  const rawScale = useTransform(scrollY, [heroH * 0.2, heroH * 0.75], [0.75, 1])
  const opacity = useSpring(rawOpacity, { stiffness: 50, damping: 25 })
  const bgScale = useSpring(rawScale, { stiffness: 50, damping: 25 })

  useEffect(() => {
    const getTarget = () => {
      const mid = window.scrollY + window.innerHeight * 0.5
      let best = GLOBE_SECTIONS[0]
      let bestDist = Infinity
      for (const s of GLOBE_SECTIONS) {
        const el = document.getElementById(s.id)
        if (!el) continue
        const elMid = el.offsetTop + el.offsetHeight * 0.5
        const dist = Math.abs(elMid - mid)
        if (dist < bestDist) {
          bestDist = dist
          best = s
        }
      }
      return best
    }

    const onScroll = () => {
      const best = getTarget()
      xMotion.set(best.xFactor * window.innerWidth)
      yMotion.set(best.yFactor * window.innerHeight)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [xMotion, yMotion])

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1, opacity, mixBlendMode: 'screen' as const }}
    >
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ x: springX, scale: bgScale, y: springY }}
      >
        <WireframeDottedGlobe size={560} transparent />
      </motion.div>
    </motion.div>
  )
}

function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {children}
    </motion.div>
  )
}

function AppRoutes() {
  const location = useLocation()
  const isAccount = location.pathname.startsWith('/account')

  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageTransition>
                <HomePage />
              </PageTransition>
            }
          />
          <Route
            path="/business"
            element={
              <PageTransition>
                <BusinessPage />
              </PageTransition>
            }
          />
          <Route path="/account" element={<AccountLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="tickets" element={<TicketsPage />} />
            <Route path="payments" element={<PaymentsPage />} />
            <Route path="referrals" element={<ReferralsPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
          </Route>
        </Routes>
      </AnimatePresence>
      {!isAccount && <Footer />}
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <StarField />
      <GlobeBackground />
      <AppRoutes />
    </BrowserRouter>
  )
}
