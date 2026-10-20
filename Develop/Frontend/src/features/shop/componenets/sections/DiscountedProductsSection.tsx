import LazySection from '@/components/ui/LazySection'
import React from 'react'
import RecommendedProducts from '../ui/RecommendedProducts'

function DiscountedProductsSection() {



    return (
        <section
            id="discounted-products"
            className="min-h-[70vh] py-22.5"
        >
            <LazySection
                rootMargin="350px 0px"
                minHeight={500}
                placeholderClassName="rounded-none"
            >
                <RecommendedProducts
                    endPointAPI='/discount'
                    title='Discounted Products'
                />
            </LazySection>
        </section>
    )
}

export default DiscountedProductsSection
