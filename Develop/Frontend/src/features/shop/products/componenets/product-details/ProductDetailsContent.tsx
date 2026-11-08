"use client"

import { useEffect, useState } from "react"
import { useLocale, useTranslations } from "next-intl"
import Container from "@/components/shared/Container"
import LazySection from "@/components/ui/LazySection"
import Loading from "@/components/ui/Loading"
import { getProductDetail, type ProductDetailData } from "@/lib/api/shop/products/products"
import ProductDetailsHeader from "./ProductDetailsHeader/ProductDetailsHeader"
import ProductDetailsSuggestionLike from "./ProductDetailsSuggestionLike"
import ProductDetailsWorkshop from "./ProductDetailsWorkshop"
import ProductMoreDetails from "./ProductMoreDetails"

interface ProductDetailsContentProps {
    productId: string
}

function ProductDetailsContent({ productId }: ProductDetailsContentProps) {
    const locale = useLocale()
    const t = useTranslations("shopProductDetails.status")
    const [product, setProduct] = useState<ProductDetailData | null>(null)
    const [status, setStatus] = useState<"loading" | "load-error" | "not-found" | "ready">("loading")

    useEffect(() => {
        let isCurrent = true

        async function loadProduct() {
            setStatus("loading")

            if (!/^\d+$/.test(productId)) {
                setProduct(null)
                setStatus("not-found")
                return
            }

            try {
                const response = await getProductDetail(productId, locale)

                if (!response.success || !response.data?.productId) {
                    throw new Error(response.message)
                }

                if (isCurrent) {
                    setProduct(response.data)
                    console.log(response.data)
                    setStatus("ready")
                }
            } catch {
                if (isCurrent) {
                    setProduct(null)
                    setStatus("load-error")
                }
            }
        }

        void loadProduct()

        return () => {
            isCurrent = false
        }
    }, [locale, productId])

    if (status === "loading") {
        return (
            <div className="fcc min-h-screen">
                <Loading size={60} color="var(--blue-color)" aria-label={t("loading")} />
            </div>
        )
    }

    if (status !== "ready" || !product) {
        return (
            <Container>
                <div className="fcc min-h-[40vh] text-center text-black-light-utility" role="status">
                    {t(status)}
                </div>
            </Container>
        )
    }

    return (
        <div className="py-32">
            <div className="fcol gap-y-15">
                <Container>
                    <div className="fcol gap-y-15">
                        <ProductDetailsHeader key={product.productId} product={product} />
                        <ProductMoreDetails product={product} />
                    </div>
                </Container>

                <ProductDetailsWorkshop />

                <Container>
                        <ProductDetailsSuggestionLike productId={product.productId} />
                </Container>
            </div>
        </div>
    )
}

export default ProductDetailsContent