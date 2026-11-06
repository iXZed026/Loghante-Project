
"use client";

import Image from "next/image";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa6";

import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";
import { formatPrice } from "@/lib/utils/formatPrice";
import { useTranslations } from "next-intl";
import { CartItem, useShopCart } from "../../context/ShopCartProvider";
import AppImage from "@/components/ui/AppImage";


interface CartBoxProps {
    item: CartItem;
}

function CartBox({ item }: CartBoxProps) {
    const commonT = useTranslations("common");
    const { removeFromCart, updateQuantity } = useShopCart();

    const isMinQuantity = item.quantity <= 1;
    const isMaxQuantity = item.quantity >= item.stockQuantity;

    const decreaseQuantity = () => {
        updateQuantity(
            item.productId,
            item.productVariantId,
            item.quantity - 1,
        );
    };

    const increaseQuantity = () => {
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
        <article className="group relative grid grid-cols-1 items-stretch gap-5 rounded-xl bg-white p-3 shadow-sm transition-shadow duration-300 hover:shadow-md sm:grid-cols-[200px_minmax(0,1fr)] sm:gap-5">
            <Button
                type="button"
                onClick={handleRemove}
                aria-label="Remove product from cart"
                className="fcc absolute right-3 top-3 z-10 rounded-full border border-black/10 bg-white text-black-light-utility transition-colors duration-200 hover:border-[var(--blue-border-color)] hover:bg-[var(--blue-opacity-color)] hover:text-blue-utility"
            >
                <FaTrash size={13} />
            </Button>

            <div className="relative aspect-[4/3] w-full self-start overflow-hidden rounded-lg bg-[#f5f2ed] sm:aspect-auto sm:h-full sm:min-h-[200px]">
                <AppImage
                    src={item.imageUrl || "/images/loghanteh-cafe.jpg"}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 200px"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
            </div>

            <div className="flex min-w-0 flex-col justify-between gap-3">
                <div className="flex flex-col gap-1 pr-9">
                    <h3 className="text-base font-semibold leading-5 text-black-utility sm:text-lg">
                        {item.name}
                    </h3>

                    <p className="text-xs text-black-light-utility sm:text-sm">
                        {item.museumName}
                    </p>

                    {item.color && (
                        <div className="mt-1 flex items-center gap-2 text-xs text-black-light-utility">
                            <span
                                className="size-3 rounded-full border border-black/15"
                                style={{ backgroundColor: item.color }}
                            />
                            <span>{item.color}</span>
                        </div>
                    )}

                    <div className="mt-1">
                        <span
                            className={cn(
                                "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] leading-4 font-medium",
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

                            {item.stockQuantity > 0
                                ? `${item.stockQuantity} items in stock`
                                : "Out of stock"}
                        </span>
                    </div>
                </div>

                <div className="flex flex-col gap-3 border-t border-black/5 pt-2.5 sm:flex-row sm:items-end sm:justify-between">
                    <div className="flex flex-col gap-1">
                        <span className="text-xs font-medium text-black-light-utility">
                            Quantity
                        </span>

                        <div
                            className={cn(
                                "flex w-fit items-center gap-1.5 rounded-full border border-black/10 bg-[#faf9f7] p-1",
                                item.stockQuantity <= 0 && "opacity-50",
                            )}
                        >
                            <Button
                                type="button"
                                onClick={decreaseQuantity}
                                disabled={isMinQuantity}
                                aria-label="Decrease quantity"
                                className="fcc rounded-full p-2.5 text-black-utility transition-colors duration-200 hover:bg-black/5 active:scale-95 disabled:cursor-not-allowed disabled:opacity-30"
                            >
                                <FaMinus size={10} />
                            </Button>

                            <span
                                aria-live="polite"
                                aria-atomic="true"
                                className="fcc min-w-6 text-sm font-semibold tabular-nums text-black-utility"
                            >
                                {item.quantity}
                            </span>

                            <Button
                                type="button"
                                onClick={increaseQuantity}
                                disabled={isMaxQuantity}
                                aria-label="Increase quantity"
                                className="fcc rounded-full bg-blue-utility p-2.5 text-white-utility transition-colors duration-200 hover:bg-[var(--blue-hover-color)] active:scale-95 disabled:cursor-not-allowed disabled:opacity-30"
                            >
                                <FaPlus size={10} />
                            </Button>
                        </div>

                        <span className="text-[10px] leading-3 text-black-light-utility">
                            Max. {item.stockQuantity} per order
                        </span>
                    </div>

                    <div className="flex flex-col gap-0.5 sm:items-end">
                        <span className="text-[10px] text-black-light-utility">
                            Price per item
                        </span>

                        {item.discountPercent > 0 && (
                            <span className="text-xs text-black-light-utility line-through">
                                {formatPrice(item.price)} {commonT("price-type")}
                            </span>
                        )}

                        <span className="text-base font-bold text-blue-utility sm:text-lg">
                            {formatPrice(item.finalPrice)} {commonT("price-type")}
                        </span>

                        {item.quantity > 1 && (
                            <span className="text-xs text-black-light-utility">
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
        </article>
    );
}

export default CartBox;
