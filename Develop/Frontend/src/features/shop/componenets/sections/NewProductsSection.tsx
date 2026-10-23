import LazySection from '@/components/ui/LazySection'
import React from 'react'
import RecommendedProducts from '../ui/RecommendedProducts'
import { useTranslations } from 'next-intl'

function NewProductsSection() {

    const t =
        useTranslations("shopNewProduct")

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
                    title={t("title")}
                    description={t("description")}
                />
            </LazySection>
        </section>
    )
}

export default NewProductsSection
