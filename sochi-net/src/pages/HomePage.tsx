import { Hero } from '../components/landing/Hero'
import { Problem } from '../components/landing/Problem'
import { Technology } from '../components/landing/Technology'
import { Comparison } from '../components/landing/Comparison'
import { HowItWorks } from '../components/landing/HowItWorks'
import { Pricing } from '../components/landing/Pricing'
import { Reviews } from '../components/landing/Reviews'
import { FAQ } from '../components/landing/FAQ'
import { FinalCTA } from '../components/landing/FinalCTA'

export function HomePage() {
  return (
    <>
      <div data-scroll-section><Hero /></div>
      <div data-scroll-section><Problem /></div>
      <div data-scroll-section><Technology /></div>
      <div data-scroll-section><Comparison /></div>
      <div data-scroll-section><HowItWorks /></div>
      <div data-scroll-section><Pricing /></div>
      <div data-scroll-section><Reviews /></div>
      <div data-scroll-section><FAQ /></div>
      <div data-scroll-section><FinalCTA /></div>
    </>
  )
}
