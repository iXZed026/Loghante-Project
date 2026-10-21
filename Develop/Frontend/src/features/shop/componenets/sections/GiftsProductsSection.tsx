import LazySection from '@/components/ui/LazySection'
import React from 'react'
import RecommendedProducts from '../ui/RecommendedProducts'

function GiftsProductsSection() {
    return (
        <section
            id="new-products"
            className="min-h-[70vh] py-22.5"
        >
            <LazySection
                rootMargin="350px 0px"
                minHeight={500}
                placeholderClassName="rounded-none"
            >
                <RecommendedProducts
                    endPointAPI='/gifts'
                    title='Gifts from Loghanteh'
                    description='Discover meaningful gifts inspired by history and culture.'
                />
            </LazySection>
        </section>
    )
}

export default GiftsProductsSection
