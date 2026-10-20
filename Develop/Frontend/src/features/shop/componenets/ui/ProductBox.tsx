
import React from "react"
import { IoArrowUpOutline, IoImageOutline } from "react-icons/io5"

function ProductBox() {
    return (
        <article
            className="
                group relative flex h-full min-w-0 flex-col
                overflow-hidden rounded-2xl
                border border-[var(--blue-border-color)]
                bg-white
                p-3 sm:p-4
                transition-all duration-500
                hover:-translate-y-1
                hover:border-[var(--blue-color)]/30
                hover:shadow-xl hover:shadow-[var(--blue-opacity-color)]
            "
        >
            {/* Product Image */}
            <div
                className="
                    relative aspect-[4/4.5] w-full overflow-hidden
                    rounded-xl
                    bg-[var(--blue-product-price-color)]
                "
            >
                <div
                    className="
                        absolute inset-0
                        bg-gradient-to-br
                        from-[#03003D]/[0.03]
                        via-transparent
                        to-[#03003D]/[0.12]
                    "
                />

                <div
                    className="
                        absolute inset-0 flex items-center justify-center
                        text-[var(--blue-color)]/25
                    "
                >
                    <IoImageOutline
                        size={54}
                        strokeWidth={1}
                        className="transition-transform duration-700 group-hover:scale-110"
                    />
                </div>

                {/* Discount Badge */}
                <span
                    className="
                        absolute left-3 top-3 z-10
                        rounded-full
                        bg-[var(--blue-color)] px-3 py-1.5
                        text-[10px] font-semibold tracking-wide text-white
                        sm:text-xs
                    "
                >
                    SPECIAL PRICE
                </span>

                {/* Product Action */}
                <button
                    type="button"
                    aria-label="View product"
                    className="
                        absolute bottom-3 right-3 z-10
                        fcc size-10 rounded-full
                        bg-white text-[var(--blue-color)]
                        shadow-md
                        transition-all duration-300
                        hover:bg-[var(--blue-color)] hover:text-white
                        sm:size-11
                    "
                >
                    <IoArrowUpOutline
                        size={20}
                        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                </button>
            </div>

            {/* Product Details */}
            <div className="flex flex-1 flex-col px-1 pt-4">
                <span
                    className="
                        mb-1 text-[10px] font-semibold uppercase
                        tracking-[0.15em]
                        text-[var(--blue-color)]/55
                        sm:text-xs
                    "
                >
                    Tehran Alef Museum
                </span>

                <h3
                    title="Merchant's ledger"
                    className="
                        line-clamp-2 min-h-12
                        font-wulkan text-base leading-6
                        text-[var(--blue-color)]
                        transition-colors duration-300
                        group-hover:text-[var(--blue-hover-color)]
                        sm:text-lg
                    "
                >
                    Merchant&apos;s ledger
                </h3>

                <div className="mb-4 mt-4 h-px w-full bg-[var(--blue-border-color)]" />

                {/* Price */}
                <div className="mt-auto flex items-end justify-between gap-2">
                    <div className="flex min-w-0 flex-col gap-1">
                        <span className="text-xs text-black-light-utility/60 line-through">
                            58,000
                        </span>

                        <span className="text-xl font-semibold tracking-tight text-[var(--blue-color)] sm:text-2xl">
                            40,000
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
