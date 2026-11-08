"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils/cn"
import ArrowIcon from "@/components/shared/ArrowIcon"
import Loading from "@/components/ui/Loading"
import { useLocale, useTranslations } from "next-intl"

import {
    getDiscountedProducts,
    getNewestProducts,
    getProductsByMuseum,
    getRelatedProducts,
    type ProductResponseData,
    type ProductsResponse,
} from "@/lib/api/shop/products/products"

import ProductBox from "./ProductBox"
import { formatPrice } from "@/lib/utils/formatPrice"
import AppLink from "@/components/ui/AppLink"

interface IProductBoxexWrraper {
    endPointAPI: string
    museumId?: number
}

const GAP = 24

function getSlidesPerView(width: number) {
    if (width >= 1280) return 4
    if (width >= 768) return 3
    if (width >= 640) return 2
    return 1
}

function ProductBoxexWrraper({
    endPointAPI,
    museumId,
}: IProductBoxexWrraper) {
    const locale = useLocale()
    const t = useTranslations("shopHeader.search")
    const viewportRef = useRef<HTMLDivElement>(null)

    const [viewportWidth, setViewportWidth] = useState(0)
    const [slidesPerView, setSlidesPerView] = useState(1)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [products, setProducts] = useState<ProductResponseData[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)

    const maxIndex = Math.max(0, products.length - slidesPerView)
    const activeIndex = Math.min(currentIndex, maxIndex)

    const cardWidth = Math.max(
        0,
        (viewportWidth - GAP * (slidesPerView - 1)) / slidesPerView,
    )

    const maxTranslate = maxIndex * (cardWidth + GAP)

    // Update slider dimensions
    useEffect(() => {
        const element = viewportRef.current

        if (!element) return

        const updateDimensions = () => {
            setViewportWidth(element.clientWidth)
            setSlidesPerView(getSlidesPerView(window.innerWidth))
        }

        updateDimensions()

        const observer = new ResizeObserver(updateDimensions)
        observer.observe(element)

        window.addEventListener("resize", updateDimensions)

        return () => {
            observer.disconnect()
            window.removeEventListener("resize", updateDimensions)
        }
    }, [isLoading])

    // Fetch products
    useEffect(() => {
        let isCurrent = true

        async function loadProducts() {
            setIsLoading(true)
            setHasError(false)
            setCurrentIndex(0)

            try {
                let response: ProductsResponse

                // Related products endpoint: /products/{id}/related
                const relatedMatch = endPointAPI.match(
                    /^\/products\/([^/]+)\/related\/?$/
                )

                if (relatedMatch) {
                    response = await getRelatedProducts(
                        relatedMatch[1],
                        locale,
                    )
                } else {
                    switch (endPointAPI) {
                        case "/discount":
                        case "/products/discounted":
                            response = await getDiscountedProducts(locale)
                            break

                        case "/new":
                        case "/products/newest":
                            response = await getNewestProducts(locale)
                            break

                        case "/products/by-museum":
                            response = await getProductsByMuseum(
                                locale,
                                museumId,
                            )
                            break

                        default:
                            throw new Error("Unsupported products endpoint")
                    }
                }

                if (!response.success || !Array.isArray(response.data)) {
                    throw new Error(response.message)
                }

                if (isCurrent) {
                    setProducts(response.data)
                    setHasError(false)
                }
            } catch {
                if (isCurrent) {
                    setProducts([])
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
    }, [endPointAPI, locale, museumId])

    const goToPrevious = () => {
        setCurrentIndex((index) =>
            Math.max(0, Math.min(index, maxIndex) - 1)
        )
    }

    const goToNext = () => {
        setCurrentIndex((index) =>
            Math.min(maxIndex, Math.min(index, maxIndex) + 1)
        )
    }

    const handleDragEnd = (
        _: MouseEvent | TouchEvent | PointerEvent,
        info: { offset: { x: number }; velocity: { x: number } },
    ) => {
        const shouldMoveNext =
            info.offset.x < -50 || info.velocity.x < -500

        const shouldMovePrevious =
            info.offset.x > 50 || info.velocity.x > 500

        if (shouldMoveNext) {
            goToNext()
        } else if (shouldMovePrevious) {
            goToPrevious()
        }
    }

    if (isLoading) {
        return (
            <div className="fcc min-h-80 w-full py-10">
                <Loading color="var(--blue-color)" />
            </div>
        )
    }

    if (products.length === 0) {
        return (
            <div className="fcc min-h-50 w-full py-10 text-sm text-black-light-utility">
                {t(hasError ? "load-error" : "not-found")}
            </div>
        )
    }

    return (
        <div className="w-full min-w-0 py-10">
            <div
                ref={viewportRef}
                className="w-full min-w-0 overflow-hidden"
                dir="ltr"
            >
                <motion.div
                    className="flex items-stretch py-5"
                    animate={{
                        x: -activeIndex * (cardWidth + GAP),
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 30,
                        mass: 0.8,
                    }}
                    drag={maxIndex > 0 ? "x" : false}
                    dragConstraints={{
                        left: -maxTranslate,
                        right: 0,
                    }}
                    dragElastic={0.06}
                    dragMomentum={false}
                    onDragEnd={handleDragEnd}
                    style={{
                        gap: GAP,
                        cursor: maxIndex > 0 ? "grab" : "default",
                        touchAction: "pan-y",
                    }}
                    whileTap={{
                        cursor: maxIndex > 0 ? "grabbing" : "default",
                    }}
                >
                    {products.map((product) => {
                        const price = Number(product.price)

                        const originalPrice = Number.isFinite(price)
                            ? price
                            : 0

                        const rawDiscount = Number(
                            product.discountPercent ?? 0
                        )

                        const discountPercent = Number.isFinite(rawDiscount)
                            ? Math.min(100, Math.max(0, rawDiscount))
                            : 0

                        const discountedPrice = Math.round(
                            originalPrice * (1 - discountPercent / 100),
                        )

                        return (
                            <AppLink
                                href={`/shop/products/${product.productId}`}
                                key={product.productId}
                                className="min-w-0 shrink-0"
                                style={{
                                    width: cardWidth || "100%",
                                }}
                            >
                                <ProductBox
                                    imageSrc={product.imageUrl || undefined}
                                    imageAlt={
                                        product.name || product.museumName
                                    }
                                    title={
                                        product.name ||
                                        `Product #${product.productId}`
                                    }
                                    museum={product.museumName}
                                    originalPrice={
                                        discountPercent > 0
                                            ? formatPrice(originalPrice)
                                            : undefined
                                    }
                                    discountedPrice={formatPrice(
                                        discountedPrice
                                    )}
                                    discountPercent={
                                        discountPercent > 0
                                            ? String(discountPercent)
                                            : undefined
                                    }
                                />
                            </AppLink>
                        )
                    })}
                </motion.div>
            </div>

            {/* Slider controls */}
            <div className="flex items-center justify-between gap-4 border-t border-(--blue-border-color) pt-5">
                <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-(--blue-color)">
                        {String(
                            Math.min(
                                activeIndex + slidesPerView,
                                products.length,
                            ),
                        ).padStart(2, "0")}
                    </span>

                    <div className="h-1 w-16 overflow-hidden rounded-full bg-(--blue-opacity-color)">
                        <motion.div
                            className="h-full rounded-full bg-(--blue-color)"
                            animate={{
                                width:
                                    products.length > slidesPerView
                                        ? `${((activeIndex + slidesPerView) / products.length) * 100}%`
                                        : "100%",
                            }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>

                    <span className="text-sm text-black-light-utility">
                        {String(products.length).padStart(2, "0")}
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={goToPrevious}
                        disabled={activeIndex === 0}
                        aria-label="Previous products"
                        className={cn(
                            "fcc size-11 rounded-full border",
                            "border-(--blue-border-color)",
                            "text-(--blue-color)",
                            "transition-all duration-300",
                            "hover:border-(--blue-color)",
                            "hover:bg-(--blue-color) hover:text-white",
                            "disabled:cursor-not-allowed disabled:opacity-30",
                            "disabled:hover:bg-transparent disabled:hover:text-(--blue-color)",
                        )}
                    >
                        <ArrowIcon direction="left" />
                    </button>

                    <button
                        type="button"
                        onClick={goToNext}
                        disabled={activeIndex >= maxIndex}
                        aria-label="Next products"
                        className={cn(
                            "fcc size-11 rounded-full",
                            "bg-(--blue-color) text-white",
                            "transition-all duration-300",
                            "hover:bg-(--blue-hover-color)",
                            "hover:shadow-lg",
                            "disabled:cursor-not-allowed disabled:opacity-30",
                            "disabled:hover:shadow-none",
                        )}
                    >
                        <ArrowIcon />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductBoxexWrraper