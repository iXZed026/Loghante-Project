import Container from '@/components/shared/Container'
import LazySection from '@/components/ui/LazySection'
import DiscountedProductsSection from '@/features/shop/componenets/sections/DiscountedProductsSection'
import MoreThanShoapSection from '@/features/shop/componenets/sections/MoreThanShoapSection'
import NewProductsSection from '@/features/shop/componenets/sections/NewProductsSection'
import ShopHero from '@/features/shop/componenets/sections/ShopHeroSection'
import React from 'react'

function ShopPage() {
  return (
    <div>
      <ShopHero />
      <Container>
        <DiscountedProductsSection />
        <NewProductsSection />
      </Container>
      <LazySection
        rootMargin="350px 0px"
        placeholderClassName="rounded-none"
      >
        <MoreThanShoapSection />
      </LazySection>

    </div>
  )
}

export default ShopPage
