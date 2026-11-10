import LazySection from '@/components/ui/LazySection'
import React from 'react'
import RecommendedProducts from '../ui/RecommendedProducts'
import { useTranslations } from 'next-intl'
import { SORT_OPTIONS } from '../../data/productASorts'

function DiscountedProductsSection() {

    const t =
        useTranslations("shopDiscountProduct")

    return (
        <section
            id="discounted-products"
            className="min-h-[70vh] pt-15"
        >
            <LazySection
                rootMargin="350px 0px"
                minHeight={500}
                placeholderClassName="rounded-none"
            >
                <RecommendedProducts
                    endPointAPI='/products/discounted'
                    title={t("title")}
                    filter={`sort=${SORT_OPTIONS[5].value}`}
                />
            </LazySection>
        </section>
    )
}

export default DiscountedProductsSection
