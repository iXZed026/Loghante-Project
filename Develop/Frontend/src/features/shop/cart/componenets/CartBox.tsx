"use client"

import Button from "@/components/ui/Button"
import { cn } from "@/lib/utils/cn"
import { formatPrice } from "@/lib/utils/formatPrice"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { useState } from "react"
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa6"

function CartBox() {
    const commonT = useTranslations("common")

    const stockQuantity = 12
    const price = 400000

    const [quantity, setQuantity] = useState(1)

    const isOutOfStock = stockQuantity <= 0
    const isMinQuantity = quantity <= 1
    const isMaxQuantity = quantity >= stockQuantity

    const decreaseQuantity = () => {
        setQuantity((current) => Math.max(1, current - 1))
    }

    const increaseQuantity = () => {
        setQuantity((current) => Math.min(stockQuantity, current + 1))
    }

    const handleRemove = () => {
        // Connect this handler to your cart removal logic.
    }

    return (
        <article className="group relative grid grid-cols-1 items-stretch gap-5 rounded-xl bg-white p-3 shadow-sm transition-shadow duration-300 hover:shadow-md sm:grid-cols-[200px_minmax(0,1fr)] sm:gap-5">
            {/* Remove button */}
            <Button
                type="button"
                onClick={handleRemove}
                aria-label="Remove product from cart"
                className="fcc absolute right-3 top-3 z-10 rounded-full border border-black/10 bg-white text-black-light-utility transition-colors duration-200 hover:border-[var(--blue-border-color)] hover:bg-[var(--blue-opacity-color)] hover:text-blue-utility"
            >
                <FaTrash size={13} />
            </Button>

            {/* Product image */}
            <div className="relative aspect-[4/3] w-full self-start overflow-hidden rounded-lg bg-[#f5f2ed] sm:aspect-auto sm:h-full sm:min-h-[200px]">
                <Image
                    src="/images/loghanteh-cafe.jpg"
                    alt="Merchant's ledger"
                    fill
                    sizes="(max-width: 640px) 100vw, 200px"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            </div>

            {/* Product information */}
            <div className="flex min-w-0 flex-col justify-between gap-3">
                {/* Product details */}
                <div className="flex flex-col gap-1 pr-9">
                    <h3 className="text-base font-semibold leading-5 text-black-utility sm:text-lg">
                        Merchant&apos;s ledger
                    </h3>

                    <p className="text-xs text-black-light-utility sm:text-sm">
                        Loghanteh Palace Museum
                    </p>

                    {/* Stock status */}
                    <div className="mt-0.5">
                        <span
                            className={cn(
                                "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] leading-4 font-medium",
                                isOutOfStock
                                    ? "bg-black/5 text-black-light-utility"
                                    : "bg-[var(--blue-opacity-color)] text-blue-utility",
                            )}
                        >
                            <span
                                className={cn(
                                    "size-1 shrink-0 rounded-full",
                                    isOutOfStock ? "bg-black/30" : "bg-blue-utility",
                                )}
                            />

                            {isOutOfStock
                                ? "Out of stock"
                                : `${stockQuantity} items in stock`}
                        </span>
                    </div>
                </div>

                {/* Quantity and price */}
                <div className="flex flex-col gap-3 border-t border-black/5 pt-2.5 sm:flex-row sm:items-end sm:justify-between">
                    {/* Quantity selector */}
                    <div className="flex flex-col gap-1">
                        <span className="text-xs font-medium text-black-light-utility">
                            Quantity
                        </span>

                        <div
                            className={cn(
                                "flex w-fit items-center gap-1.5 rounded-full border border-black/10 bg-[#faf9f7] p-1",
                                isOutOfStock && "opacity-50",
                            )}
                        >
                            <Button
                                type="button"
                                onClick={decreaseQuantity}
                                disabled={isMinQuantity || isOutOfStock}
                                aria-label="Decrease quantity"
                                className={cn(
                                    "fcc rounded-full text-black-utility transition-colors duration-200",
                                    "hover:bg-black/5 active:scale-95",
                                    "disabled:cursor-not-allowed disabled:opacity-30 p-2.5",
                                )}
                            >
                                <FaMinus size={10} />
                            </Button>

                            <span
                                aria-live="polite"
                                aria-atomic="true"
                                className="fcc min-w-6 text-sm font-semibold tabular-nums text-black-utility"
                            >
                                {quantity}
                            </span>

                            <Button
                                type="button"
                                onClick={increaseQuantity}
                                disabled={isMaxQuantity || isOutOfStock}
                                aria-label="Increase quantity"
                                className={cn(
                                    "fcc rounded-full bg-blue-utility text-white-utility transition-colors duration-200",
                                    "hover:bg-[var(--blue-hover-color)] active:scale-95",
                                    "disabled:cursor-not-allowed disabled:opacity-30 p-2.5",
                                )}
                            >
                                <FaPlus size={10} />
                            </Button>
                        </div>

                        {!isOutOfStock && (
                            <span className="text-[10px] leading-3 text-black-light-utility">
                                Max. {stockQuantity} per order
                            </span>
                        )}
                    </div>

                    {/* Price */}
                    <div className="flex flex-col gap-0.5 sm:items-end">
                        <span className="text-[10px] text-black-light-utility">
                            Price per item
                        </span>

                        <span className="text-base font-bold text-blue-utility sm:text-lg">
                            {formatPrice(price)} {commonT("price-type")}
                        </span>

                        {quantity > 1 && (
                            <span className="text-xs text-black-light-utility">
                                Total:{" "}
                                <span className="font-semibold text-blue-utility">
                                    {formatPrice(price * quantity)}{" "}
                                    {commonT("price-type")}
                                </span>
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </article>
    )
}

export default CartBox
