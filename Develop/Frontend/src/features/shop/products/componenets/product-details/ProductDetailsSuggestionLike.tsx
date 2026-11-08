"use client"

import RecommendedProducts from "@/features/shop/componenets/ui/RecommendedProducts"
import LazySection from "@/components/ui/LazySection"
import { useTranslations } from "next-intl"

interface IProductDetailsSuggestionLike {
    productId: number | string
}

function ProductDetailsSuggestionLike({
    productId,
}: IProductDetailsSuggestionLike) {
    const t = useTranslations("shopProductDetails.like-product")

    return (
        <LazySection
            rootMargin="100px 0px"
            minHeight={700}
            placeholderClassName="rounded-none"
        >
            <RecommendedProducts
                title={t("title")}
                endPointAPI={`/products/${productId}/related`}
            />
        </LazySection>
    )
}

export default ProductDetailsSuggestionLike