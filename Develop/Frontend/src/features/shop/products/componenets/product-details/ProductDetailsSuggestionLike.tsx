"use client"

import ProductBox from '@/features/shop/componenets/ui/ProductBox'
import AppLink from '@/components/ui/AppLink'
import { cn } from '@/lib/utils/cn'
import { useLocale, useTranslations } from 'next-intl'
import type { ProductResponseData } from '@/lib/api/shop/products/products'

interface ProductDetailsSuggestionLikeProps {
    products: ProductResponseData[]
}

function ProductDetailsSuggestionLike({ products }: ProductDetailsSuggestionLikeProps) {
    const t = useTranslations("shopProductDetails.like-product")
    const headerT = useTranslations("shopProductDetails.header")
    const locale = useLocale()
    const format = new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US")

    if (products.length === 0) return null

    return (
        <div className='fcol gap-y-10'>
            <div>
                <h6 className='font-wulkan font-bold md:text-3xl text-2xl'>
                    {t("title")}
                </h6>
            </div>
            <div
                className={cn(
                    "grid lg:grid-cols-12 grid-cols-6 lg:gap-3"
                )}
            >
                {products.map((product) => {
                    const price = Number(product.price)
                    const originalPrice = Number.isFinite(price) ? price : 0
                    const rawDiscount = Number(product.discountPercent ?? 0)
                    const discountPercent = Number.isFinite(rawDiscount)
                        ? Math.min(100, Math.max(0, rawDiscount))
                        : 0
                    const discountedPrice = Math.round(originalPrice * (1 - discountPercent / 100))

                    return (
                        <AppLink
                            key={product.productId}
                            href={`shop/products/${product.productId}`}
                            className="col-span-3 block min-w-0"
                        >
                            <ProductBox
                                imageSrc={product.imageUrl || undefined}
                                imageAlt={product.name || product.museumName}
                                title={product.name || headerT("product-fallback", { id: product.productId })}
                                museum={product.museumName}
                                originalPrice={discountPercent > 0 ? format.format(originalPrice) : undefined}
                                discountedPrice={format.format(discountedPrice)}
                                discountPercent={discountPercent > 0 ? String(discountPercent) : undefined}
                                col="12"
                            />
                        </AppLink>
                    )
                })}
            </div>
        </div>
    )
}

export default ProductDetailsSuggestionLike
