import LazySection from '@/components/ui/LazySection'
import React from 'react'
import RecommendedProducts from '../ui/RecommendedProducts'

function NewProductsSection() {
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
                    endPointAPI='/new'
                    title='New Products'
                    description='A selection of unique objects from our from museums and cultural collections.                         '
                />
            </LazySection>
        </section>
    )
}

export default NewProductsSection
