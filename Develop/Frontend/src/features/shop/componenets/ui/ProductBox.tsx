import React from "react"
import AppImage from "@/components/ui/AppImage"

interface IProductBoxProps {
    imageSrc?: string
    imageAlt?: string
    title?: string
    museum?: string
    originalPrice?: string
    discountedPrice?: string
    discountPercent?: string
    col?: string
}

function ProductBox({
    imageSrc = "/images/loghanteh-cafe.jpg",
    imageAlt = "Merchant's ledger",
    title = "Merchant's ledger",
    museum = "Tehran Alef Museum",
    originalPrice = "58,000",
    discountedPrice = "40,000",
    discountPercent,
    col = "4",
}: IProductBoxProps) {
    return (
        <article className={`col-span-${col} group relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-(--blue-border-color) bg-white p-3 transition-shadow duration-500 hover:border-(--blue-color)/30 hover:shadow-xl sm:p-4`}>
            <div className="relative  w-full overflow-hidden rounded-xl bg-(--blue-product-price-color)">
                <AppImage
                    src={imageSrc || "/images/loghanteh-cafe.jpg"}
                    alt={imageAlt}
                    width={300}
                    height={300}
                    unoptimized={imageSrc.startsWith("http")}
                    draggable={false}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-(--blue-color)/20 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-100" />

                {discountPercent && Number(discountPercent) > 0 && (
                    <span className="absolute left-3 top-3 z-10 rounded-full bg-(--blue-color) px-3 py-1.5 text-[10px] font-semibold text-white sm:text-xs">
                        {discountPercent}% OFF
                    </span>
                )}
            </div>

            <div className="flex flex-1 flex-col px-1 pt-4">
                <h3
                    title={title}
                    className="mt-3 line-clamp-1 min-h-12 font-wulkan text-2xl leading-6 text-(--blue-color) transition-colors duration-300 group-hover:text-(--blue-hover-color) sm:text-xl"
                >
                    {title}
                </h3>

                <span
                    title={museum}
                    className="mb-1 line-clamp-1 text-base font-semibold uppercase text-(--blue-color)/55 sm:text-xs"
                >
                    {museum}
                </span>

                <div className="mb-4 mt-4 h-px w-full bg-(--blue-border-color)" />

                <div className="mt-auto flex items-end justify-between gap-2">
                    <div className="flex min-w-0 flex-col gap-1">
                        {originalPrice && (
                            <span className="text-xs text-black-light-utility/60 line-through">
                                {originalPrice}
                            </span>
                        )}

                        <span className="text-xl font-semibold text-(--blue-color) sm:text-2xl">
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