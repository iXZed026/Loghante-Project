import { useTranslations } from 'next-intl'
import React from 'react'
import type { ProductDetailData } from '@/lib/api/shop/products/products'

interface ProductMoreDetailsProps {
    product: ProductDetailData
}

function ProductMoreDetails({ product }: ProductMoreDetailsProps) {
    const t = useTranslations("shopProductDetails.more-details")
    const headerT = useTranslations("shopProductDetails.header")
    const valueOrFallback = (value?: string | null) => value?.trim() || t("not-provided")
    const dimensions = [product.length, product.width, product.height]
        .filter((value): value is string => Boolean(value?.trim()))
        .join(" × ")
    const sku = product.variants?.find((variant) => variant.isActive)?.sku

    const rows = [
        [t("material"), valueOrFallback(product.material)],
        [t("dimensions"), dimensions || t("not-provided")],
        [t("height"), valueOrFallback(product.weight)],
        [t("year"), valueOrFallback(product.era)],
        [t("origin"), valueOrFallback(product.origin)],
        [t("skU"), valueOrFallback(sku)],
        [t("availability"), product.availability ? t("in-stock") : headerT("out-of-stock")],
    ]

    return (
        <div className='fcol gap-y-15 md:px-10'>
            <h2 className='text-2xl font-bold'>{t("title")}</h2>
            <dl className='fcol gap-y-5 text-sm text-black-light-utility md:text-base'>
                {rows.map(([label, value]) => (
                    <div className='fbc gap-4' key={label}>
                        <dt>{label}</dt>
                        <dd className='text-right'>{value}</dd>
                    </div>
                ))}
            </dl>
        </div>
    )
}

export default ProductMoreDetails
