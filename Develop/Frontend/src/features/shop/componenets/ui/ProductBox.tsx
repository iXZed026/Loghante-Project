
import React from "react"
import { IoArrowUpOutline } from "react-icons/io5"
import AppImage from "@/components/ui/AppImage"

interface IProductBoxProps {
    imageSrc?: string
    imageAlt?: string
    title?: string
    museum?: string
    originalPrice?: string
    discountedPrice?: string
}

function ProductBox({
    imageSrc = "/images/products/merchant-ledger.jpg",
    imageAlt = "Merchant's ledger",
    title = "Merchant's ledger",
    museum = "Tehran Alef Museum",
    originalPrice = "58,000",
    discountedPrice = "40,000",
}: IProductBoxProps) {
    return (
        <article
            className="
                group relative flex h-full min-w-0 flex-col
                overflow-hidden rounded-2xl
                border border-[var(--blue-border-color)]
                bg-white p-3 sm:p-4
                transition-shadow duration-500
                hover:border-[var(--blue-color)]/30
                hover:shadow-xl hover:shadow-[var(--blue-opacity-color)]
            "
        >
            {/* Product Image */}
            {/* relative aspect-[4/4.5] w-full overflow-hidden */}
            <div
                className="
                    relative w-full overflow-hidden
                    rounded-xl bg-[var(--blue-product-price-color)]
                "
            >
                <AppImage
                    src={"/images/loghanteh-cafe.jpg"}
                    alt={imageAlt}
                    width={300}
                    height={300}
                    draggable={false}
                    className="
                        h-full w-full object-cover
                        transition-transform duration-700 ease-out
                        group-hover:scale-110
                    "
                />

                {/* Image Overlay */}
                <div
                    className="
                        pointer-events-none absolute inset-0
                        bg-gradient-to-t
                        from-[var(--blue-color)]/20
                        via-transparent to-transparent
                        opacity-60 transition-opacity duration-500
                        group-hover:opacity-100
                    "
                />

                {/* Discount Badge */}
                <span
                    className="
                        absolute left-3 top-3 z-10
                        rounded-full bg-[var(--blue-color)]
                        px-3 py-1.5
                        text-[10px] font-semibold tracking-wide text-white
                        sm:text-xs
                    "
                >
                    SPECIAL PRICE
                </span>

            </div>

            {/* Product Details */}
            <div className="flex flex-1 flex-col px-1 pt-4">
                <h3
                    title={title}
                    className="
                        line-clamp-1 min-h-12
                        font-wulkan leading-6
                        text-[var(--blue-color)]
                        transition-colors duration-300
                        group-hover:text-[var(--blue-hover-color)]
                        sm:text-xl
                        mt-3
                        text-2xl

                    "
                >
                    {title}
                </h3>

                <span
                    title={museum}
                    className="
                        line-clamp-1
                        mb-1 text-[10px] font-semibold uppercase
                        tracking-[0.15em]
                        text-[var(--blue-color)]/55 sm:text-xs
                        text-base
                    "
                >
                    {museum}
                </span>

                <div className="mb-4 mt-4 h-px w-full bg-[var(--blue-border-color)]" />

                {/* Price */}
                <div className="mt-auto flex items-end justify-between gap-2">
                    <div className="flex min-w-0 flex-col gap-1">
                        <span className="text-xs text-black-light-utility/60 line-through">
                            {originalPrice}
                        </span>

                        <span className="text-xl font-semibold tracking-tight text-[var(--blue-color)] sm:text-2xl">
                            {discountedPrice}
                        </span>
                    </div>

                    <span className="pb-1 text-xs text-black-light-utility">
                        Toman
                    </span>
                </div>
            </div>
        </article>
    )
}

export default ProductBox
