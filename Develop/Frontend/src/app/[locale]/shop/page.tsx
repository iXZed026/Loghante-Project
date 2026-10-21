import Container from '@/components/shared/Container'
import LazySection from '@/components/ui/LazySection'
import DiscountedProductsSection from '@/features/shop/componenets/sections/DiscountedProductsSection'
import GiftsProductsSection from '@/features/shop/componenets/sections/GiftsProductsSection'
import MoreThanShoapSection from '@/features/shop/componenets/sections/MoreThanShoapSection'
import NewProductsSection from '@/features/shop/componenets/sections/NewProductsSection'
import ShopByMeuseumSection from '@/features/shop/componenets/sections/ShopByMeuseumSection'
import ShopCategorysSection from '@/features/shop/componenets/sections/ShopCategorysSection'
import ShopHero from '@/features/shop/componenets/sections/ShopHeroSection'

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
      <Container>
        <ShopCategorysSection />
        <LazySection
          rootMargin="350px 0px"
          placeholderClassName="rounded-none"
        >
          <ShopByMeuseumSection />
        </LazySection>
        <GiftsProductsSection />
      </Container>

    </div>
  )
}

export default ShopPage
