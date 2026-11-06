"use client";

import { FaMinus, FaPlus, FaTrash } from "react-icons/fa6";

import Button from "@/components/ui/Button";
import AppImage from "@/components/ui/AppImage";
import { cn } from "@/lib/utils/cn";
import { formatPrice } from "@/lib/utils/formatPrice";
import { useTranslations } from "next-intl";
import { CartItem, useShopCart } from "../../context/ShopCartProvider";

interface CartBoxProps {
    item: CartItem;
}

function CartBox({ item }: CartBoxProps) {
    const commonT = useTranslations("common");
    const { removeFromCart, updateQuantity } = useShopCart();

    const isMinQuantity = item.quantity <= 1;
    const isMaxQuantity = item.quantity >= item.stockQuantity;

    const decreaseQuantity = () => {
        if (isMinQuantity) return;

        updateQuantity(
            item.productId,
            item.productVariantId,
            item.quantity - 1,
        );
    };

    const increaseQuantity = () => {
        if (isMaxQuantity) return;

        updateQuantity(
            item.productId,
            item.productVariantId,
            item.quantity + 1,
        );
    };

    const handleRemove = () => {
        removeFromCart(item.productId, item.productVariantId);
    };

    return (
        <article className="group relative grid grid-cols-[160px_minmax(0,1fr)] items-stretch gap-2.5 rounded-xl bg-white p-2.5 shadow-sm transition-shadow duration-300 hover:shadow-md sm:grid-cols-[200px_minmax(0,1fr)] sm:gap-5 sm:p-3">

            {/* Product image */}
            <div className="relative aspect-[10/11] w-full self-start overflow-hidden rounded-lg bg-[#f5f2ed] sm:aspect-auto sm:h-full sm:min-h-[200px]">
                <AppImage
                    src={item.imageUrl || "/images/loghanteh-cafe.jpg"}
                    alt={item.name}
                    fill
                    // sizes="(max-width: 640px) 160px, 200px"
                    className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                />
            </div>

            {/* Product information */}
            <div className="flex min-w-0 flex-col justify-between gap-2.5">

                {/* Header */}
                <div className="flex min-w-0 flex-col gap-1 pr-8">
                    <h3 className="line-clamp-2 break-words text-xs font-semibold leading-4 text-black-utility sm:text-lg sm:leading-5">
                        {item.name}
                    </h3>

                    <p className="line-clamp-2 break-words text-[10px] leading-4 text-black-light-utility sm:text-sm">
                        {item.museumName}
                    </p>

                    {item.color && (
                        <div className="mt-0.5 flex min-w-0 items-center gap-1.5 text-[10px] text-black-light-utility sm:text-xs">
                            <span
                                className="size-2.5 shrink-0 rounded-full border border-black/15 sm:size-3"
                                style={{ backgroundColor: item.color }}
                            />
                            <span className="truncate">{item.color}</span>
                        </div>
                    )}

                    {/* Stock status */}
                    <div className="mt-1">
                        <span
                            className={cn(
                                "inline-flex max-w-full items-center gap-1 rounded-full px-1.5 py-0.5 text-[9px] leading-3 font-medium sm:px-2 sm:text-[10px] sm:leading-4",
                                item.stockQuantity <= 0
                                    ? "bg-black/5 text-black-light-utility"
                                    : "bg-[var(--blue-opacity-color)] text-blue-utility",
                            )}
                        >
                            <span
                                className={cn(
                                    "size-1 shrink-0 rounded-full",
                                    item.stockQuantity <= 0
                                        ? "bg-black/30"
                                        : "bg-blue-utility",
                                )}
                            />

                            <span className="truncate">
                                {item.stockQuantity > 0
                                    ? `${item.stockQuantity} items in stock`
                                    : "Out of stock"}
                            </span>
                        </span>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex min-w-0 flex-row items-end justify-between gap-2 border-t border-black/5 pt-2 sm:gap-3">

                    {/* Quantity */}
                    <div className="flex min-w-0 flex-col gap-1">
                        <span className="text-[9px] font-medium text-black-light-utility sm:text-xs">
                            Quantity
                        </span>

                        <div
                            className={cn(
                                "flex w-fit items-center gap-0.5 rounded-full border border-black/10 bg-[#faf9f7] p-0.5 sm:gap-1.5 sm:p-1",
                                item.stockQuantity <= 0 && "opacity-50",
                            )}
                        >
                            <Button
                                type="button"
                                onClick={decreaseQuantity}
                                disabled={isMinQuantity}
                                aria-label="Decrease quantity"
                                className="fcc size-6 rounded-full text-black-utility transition-colors hover:bg-black/5 active:scale-95 disabled:cursor-not-allowed disabled:opacity-30 sm:size-9"
                            >
                                <FaMinus size={9} />
                            </Button>

                            <span
                                aria-live="polite"
                                aria-atomic="true"
                                className="fcc min-w-5 text-[11px] font-semibold tabular-nums text-black-utility sm:min-w-6 sm:text-sm"
                            >
                                {item.quantity}
                            </span>

                            <Button
                                type="button"
                                onClick={increaseQuantity}
                                disabled={isMaxQuantity}
                                aria-label="Increase quantity"
                                className="fcc size-6 rounded-full bg-blue-utility text-white-utility transition-colors hover:bg-[var(--blue-hover-color)] active:scale-95 disabled:cursor-not-allowed disabled:opacity-30 sm:size-9"
                            >
                                <FaPlus size={9} />
                            </Button>
                        </div>

                        <span className="text-[8px] leading-3 text-black-light-utility sm:text-[10px]">
                            Max. {item.stockQuantity} per order
                        </span>
                    </div>

                    {/* Price */}
                    <div className="flex min-w-0 flex-col gap-0.5 sm:items-end">
                        <span className="text-[9px] text-black-light-utility sm:text-[10px]">
                            Price per item
                        </span>

                        {item.discountPercent > 0 && (
                            <span className="text-[10px] text-black-light-utility line-through sm:text-xs">
                                {formatPrice(item.price)} {commonT("price-type")}
                            </span>
                        )}

                        <span className="break-words text-xs font-bold text-blue-utility sm:text-lg">
                            {formatPrice(item.finalPrice)} {commonT("price-type")}
                        </span>

                        {item.quantity > 1 && (
                            <span className="text-[9px] text-black-light-utility sm:text-xs">
                                Total:{" "}
                                <span className="font-semibold text-blue-utility">
                                    {formatPrice(item.finalPrice * item.quantity)}{" "}
                                    {commonT("price-type")}
                                </span>
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Remove button */}
            <Button
                type="button"
                onClick={handleRemove}
                aria-label="Remove product from cart"
                className={cn(
                    "fcc absolute right-2 top-2 z-10 rounded-full",
                    "border border-red-200 bg-red-50 text-red-600",
                    "transition-all duration-200",
                    "hover:border-red-300 hover:bg-red-100 hover:text-red-700",
                    "active:scale-90 sm:right-3 sm:top-3",
                )}
            >
                <FaTrash size={11} />
            </Button>
        </article>
    );
}

export default CartBox;
