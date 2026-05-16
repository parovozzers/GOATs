import { BusinessHero } from '../components/business/BusinessHero'
import { Opportunities } from '../components/business/Opportunities'
import { BusinessComparison } from '../components/business/BusinessComparison'
import { BusinessPricing } from '../components/business/BusinessPricing'
import { AddonServices } from '../components/business/AddonServices'
import { HowItWorks } from '../components/landing/HowItWorks'
import { BusinessReviews } from '../components/business/BusinessReviews'
import { BusinessFAQ } from '../components/business/BusinessFAQ'
import { BusinessFinalCTA } from '../components/business/BusinessFinalCTA'

export function BusinessPage() {
  return (
    <>
      <BusinessHero />
      <Opportunities />
      <BusinessComparison />
      <BusinessPricing />
      <AddonServices />
      <HowItWorks />
      <BusinessReviews />
      <BusinessFAQ />
      <BusinessFinalCTA />
    </>
  )
}
