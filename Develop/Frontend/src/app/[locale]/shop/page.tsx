import Container from '@/components/shared/Container'
import LazySection from '@/components/ui/LazySection'
import DiscountedProductsSection from '@/features/shop/componenets/sections/DiscountedProductsSection'
import ShopHero from '@/features/shop/componenets/sections/ShopHeroSection'
import React from 'react'

function ShopPage() {
  return (
    <div>
      <ShopHero />
      <Container>
        <DiscountedProductsSection />
      </Container>
    </div>
  )
}

export default ShopPage
