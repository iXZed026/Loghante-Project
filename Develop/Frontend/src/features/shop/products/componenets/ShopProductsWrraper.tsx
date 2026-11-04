"use client"

import React, { useEffect, useState } from "react"
import { useLocale, useTranslations } from "next-intl"
import { useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils/cn"
import AppLink from "@/components/ui/AppLink"
import Loading from "@/components/ui/Loading"
import ProductBox from "../../componenets/ui/ProductBox"
import ShopSearchDropdown from "../../componenets/ShopHeader/ShopSearchDropdown"
import ShopSortDrropDown from "../../componenets/ShopHeader/ShopSortDrropDown"
import ShopPagination from "./ShopPagination"
import {
    getProducts,
    type ProductListData,
} from "@/lib/api/shop/products/products"
import FadeIn from "@/components/animations/FadeIn"
import { delay } from "framer-motion/dom"
import FadeUp from "@/components/animations/FadeUp"

const PAGE_SIZE = 9

function parseIds(value: string | null): string[] {
    return (value ?? "").split(",").filter(Boolean)
}

function ShopProductsWrraper() {
    const locale = useLocale()
    const searchParams = useSearchParams()
    const queryString = searchParams.toString()
    const statusT = useTranslations("shopProducts.status")
    const [productList, setProductList] = useState<ProductListData | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)

    useEffect(() => {
        let isCurrent = true

        async function loadProducts() {
            setIsLoading(true)
            setHasError(false)

            const params = new URLSearchParams(queryString)
            const requestedPage = Number(params.get("page") ?? 1)

            try {
                const response = await getProducts(
                    {
                        museumIds: parseIds(params.get("museum")),
                        categoryIds: parseIds(params.get("category")),
                        minPrice: params.get("minPrice") ?? undefined,
                        maxPrice: params.get("maxPrice") ?? undefined,
                        sortBy: params.get("sort") ?? "newest",
                        page: Number.isInteger(requestedPage) && requestedPage > 0
                            ? requestedPage
                            : 1,
                        pageSize: PAGE_SIZE,
                    },
                    locale,
                )

                if (!response.success || !Array.isArray(response.data?.items)) {
                    throw new Error(response.message)
                }

                if (isCurrent) {
                    setProductList(response.data)
                }
            } catch {
                if (isCurrent) {
                    setProductList(null)
                    setHasError(true)
                }
            } finally {
                if (isCurrent) {
                    setIsLoading(false)
                }
            }
        }

        void loadProducts()

        return () => {
            isCurrent = false
        }
    }, [locale, queryString])

    const format = new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US")

    return (
        <div className="lg:col-span-8 col-span-12 fcol gap-y-10">
            <div className="fbc">
                <div className="md:w-full w-4/6">
                    <ShopSearchDropdown variant="menu" />
                </div>
                <div>
                    <ShopSortDrropDown />
                </div>
            </div>

            {isLoading ? (
                <div className="fcc min-h-[80vh] w-full">
                    <Loading size={60} color="var(--blue-color)" aria-label={statusT("loading")} />
                </div>
            ) : hasError ? (
                <div className="fcc min-h-[80vh] text-sm text-black-light-utility">
                    {statusT("load-error")}
                </div>
            ) : !productList?.items.length ? (
                <div className="fcc min-h-[80vh] text-sm text-black-light-utility">
                    {statusT("not-found")}
                </div>
            ) : (
                <>
                    <div className={cn("grid md:grid-cols-12 grid-cols-8 gap-4")}>
                        {productList.items.map((product) => {
                            const price = Number(product.price)
                            const originalPrice = Number.isFinite(price) ? price : 0
                            const rawDiscount = Number(product.discountPercent ?? 0)
                            const discountPercent = Number.isFinite(rawDiscount)
                                ? Math.min(100, Math.max(0, rawDiscount))
                                : 0
                            const discountedPrice = Math.round(
                                originalPrice * (1 - discountPercent / 100),
                            )

                            return (
                                <AppLink
                                    key={product.productId}
                                    href={`shop/products/${product.productId}`}
                                    className="col-span-4 block h-full min-w-0"
                                >
                                    <FadeUp 
                                        y={20}
                                        once
                                    >
                                        <ProductBox
                                            imageSrc={product.imageUrl || undefined}
                                            imageAlt={product.name || product.museumName}
                                            title={product.name || statusT("product-fallback", { id: product.productId })}
                                            museum={product.museumName}
                                            originalPrice={discountPercent > 0
                                                ? format.format(originalPrice)
                                                : undefined}
                                            discountedPrice={format.format(discountedPrice)}
                                            discountPercent={discountPercent > 0
                                                ? String(discountPercent)
                                                : undefined}
                                            col="12"
                                        />
                                    </FadeUp>
                                </AppLink>
                            )
                        })}
                    </div>

                    <ShopPagination
                        totalItems={productList.total}
                        itemsPerPage={productList.pageSize}
                        totalPages={productList.totalPages}
                    />
                </>
            )}
        </div>
    )
}

export default ShopProductsWrraper
