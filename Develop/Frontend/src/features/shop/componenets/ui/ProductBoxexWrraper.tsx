"use client"

import { Children, useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { IoChevronBack, IoChevronForward } from "react-icons/io5"
import { cn } from "@/lib/utils/cn"
import ArrowIcon from "@/components/shared/ArrowIcon"

interface IProductBoxexWrraper {
    endPointAPI: string
    children: React.ReactNode
}

const GAP = 24

function getSlidesPerView(width: number) {
    if (width >= 1280) return 4
    if (width >= 768) return 3
    if (width >= 640) return 2
    return 1
}

function ProductBoxexWrraper({
    children,
}: IProductBoxexWrraper) {
    const viewportRef = useRef<HTMLDivElement>(null)

    const [viewportWidth, setViewportWidth] = useState(0)
    const [slidesPerView, setSlidesPerView] = useState(1)
    const [currentIndex, setCurrentIndex] = useState(0)

    const products = Children.toArray(children)
    const maxIndex = Math.max(0, products.length - slidesPerView)

    const cardWidth = Math.max(
        0,
        (viewportWidth - GAP * (slidesPerView - 1)) / slidesPerView,
    )

    const maxTranslate = maxIndex * (cardWidth + GAP)

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
    }, [])

    useEffect(() => {
        setCurrentIndex((index) => Math.min(index, maxIndex))
    }, [maxIndex])

    const goToPrevious = () => {
        setCurrentIndex((index) => Math.max(0, index - 1))
    }

    const goToNext = () => {
        setCurrentIndex((index) => Math.min(maxIndex, index + 1))
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

    return (
        <div className="w-full min-w-0 py-10">
            {/* Carousel */}
            <div
                ref={viewportRef}
                className="w-full min-w-0 overflow-hidden"
                dir="ltr"
            >
                <motion.div
                    className="flex items-stretch py-5"
                    animate={{
                        x: -currentIndex * (cardWidth + GAP),
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
                    {products.map((product, index) => (
                        <div
                            key={index}
                            className="min-w-0 shrink-0"
                            style={{
                                width: cardWidth || "100%",
                            }}
                        >
                            {product}
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Slider Controls */}
            <div className="flex items-center justify-between gap-4 border-t border-[var(--blue-border-color)] pt-5">
                <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-[var(--blue-color)]">
                        {String(
                            Math.min(
                                currentIndex + slidesPerView,
                                products.length,
                            ),
                        ).padStart(2, "0")}
                    </span>

                    <div className="h-1 w-16 overflow-hidden rounded-full bg-[var(--blue-opacity-color)]">
                        <motion.div
                            className="h-full rounded-full bg-[var(--blue-color)]"
                            animate={{
                                width:
                                    products.length > slidesPerView
                                        ? `${((currentIndex + slidesPerView) / products.length) * 100}%`
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
                        disabled={currentIndex === 0}
                        aria-label="Previous products"
                        className={cn(
                            "fcc size-11 rounded-full border",
                            "border-[var(--blue-border-color)]",
                            "text-[var(--blue-color)]",
                            "transition-all duration-300",
                            "hover:border-[var(--blue-color)]",
                            "hover:bg-[var(--blue-color)] hover:text-white",
                            "disabled:cursor-not-allowed disabled:opacity-30",
                            "disabled:hover:bg-transparent disabled:hover:text-[var(--blue-color)]",
                        )}
                    >
                        <ArrowIcon direction="left"/>
                    </button>

                    <button
                        type="button"
                        onClick={goToNext}
                        disabled={currentIndex >= maxIndex}
                        aria-label="Next products"
                        className={cn(
                            "fcc size-11 rounded-full",
                            "bg-[var(--blue-color)] text-white",
                            "transition-all duration-300",
                            "hover:bg-[var(--blue-hover-color)]",
                            "hover:shadow-lg hover:shadow-[var(--blue-opacity-color)]",
                            "disabled:cursor-not-allowed disabled:opacity-30",
                            "disabled:hover:shadow-none",
                        )}
                    >
                        <ArrowIcon/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductBoxexWrraper
