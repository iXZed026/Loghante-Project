import LazySection from '@/components/ui/LazySection'
import React from 'react'
import RecommendedProducts from '../ui/RecommendedProducts'
import { useTranslations } from 'next-intl'

function GiftsProductsSection() {

    const t =
        useTranslations("shopGiftProduct")

    return (
        <section
            id="gifts-products"
            className="min-h-[70vh] py-22.5"
        >
            <LazySection
                rootMargin="350px 0px"
                minHeight={500}
                placeholderClassName="rounded-none"
            >
                <RecommendedProducts
                    endPointAPI='/products/by-museum'
                    title={t("title")}
                    description={t("description")}
                    filter=''
                />
            </LazySection>
        </section>
    )
}

export default GiftsProductsSection
