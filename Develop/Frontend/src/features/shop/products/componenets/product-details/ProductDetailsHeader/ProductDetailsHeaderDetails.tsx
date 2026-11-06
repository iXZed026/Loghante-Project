"use client";

import { useState, useCallback } from "react";
import Button from "@/components/ui/Button";
import Modal from "@/components/shared/modal/Modal";
import { cn } from "@/lib/utils/cn";
import { useLocale, useTranslations } from "next-intl";
import {
    FaMinus,
    FaPlus,
    FaBoxOpen,
    FaCheck,
} from "react-icons/fa6";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import type { ProductDetailData } from "@/lib/api/shop/products/products";
import { useShopCart } from "@/features/shop/context/ShopCartProvider";

interface ProductDetailsHeaderDetailsProps {
    product: ProductDetailData;
}

function ProductDetailsHeaderDetails({
    product,
}: ProductDetailsHeaderDetailsProps) {
    const commonT = useTranslations("common");
    const t = useTranslations("shopProductDetails.header");
    const locale = useLocale();

    const { addToCart } = useShopCart();

    const [modalActive, setModalActive] = useState(false);

    const closeModal = useCallback(() => {
        setModalActive(false);
    }, []);

    const variants = product.variants ?? [];

    const initialVariant =
        variants.find(
            (variant) => variant.isActive && variant.stockQuantity > 0,
        ) ?? variants.find((variant) => variant.isActive);

    const [selectedVariantId, setSelectedVariantId] = useState<
        number | undefined
    >(initialVariant?.productVariantId);

    const [quantity, setQuantity] = useState(1);

    const selectedVariant =
        variants.find(
            (variant) => variant.productVariantId === selectedVariantId,
        ) ?? initialVariant;

    const stockQuantity =
        selectedVariant?.stockQuantity ?? (product.availability ? 1 : 0);

    const isOutOfStock = !product.availability || stockQuantity <= 0;

    const rawPrice = Number(selectedVariant?.price ?? product.price);
    const price = Number.isFinite(rawPrice) ? rawPrice : 0;

    const rawDiscount = Number(product.discountPercent ?? 0);

    const discountPercent = Number.isFinite(rawDiscount)
        ? Math.min(100, Math.max(0, rawDiscount))
        : 0;

    const finalPrice = Math.round(
        price * (1 - discountPercent / 100),
    );

    const format = new Intl.NumberFormat(
        locale === "fa" ? "fa-IR" : "en-US",
    );

    const handleAddToCart = () => {
        if (isOutOfStock) return;

        addToCart({
            productId: product.productId,
            productVariantId: selectedVariant?.productVariantId,
            name: product.name,
            museumName: product.museumName,
            imageUrl:
                product.imageUrl ||
                product.images?.find((image) => image.isPrimary)?.imageUrl ||
                product.images?.[0]?.imageUrl ||
                "/images/loghanteh-cafe.jpg",
            price,
            finalPrice,
            discountPercent,
            quantity,
            stockQuantity,
            color: selectedVariant?.color,
            sku: selectedVariant?.sku,
        });

        setModalActive(true);
    };

    return (
        <>
            {/* Add to cart success modal */}
            <Modal
                active={modalActive}
                message={t("added-to-cart")}
                success={true}
                onClose={closeModal}
            />

            <div className="fcol col-span-12 gap-y-8 xl:col-span-7 xl:px-25 lg:px-5">
                <div className="flex gap-4 text-sm text-black-light-utility">
                    <span>{product.museumName}</span>
                </div>

                <h1
                    className="line-clamp-2 font-wulkan text-3xl font-bold"
                    title={product.name}
                >
                    {product.name ||
                        t("product-fallback", {
                            id: product.productId,
                        })}
                </h1>

                {/* Price */}
                <div className="fcol gap-1">
                    {discountPercent > 0 && (
                        <span className="text-sm text-black-light-utility line-through">
                            {format.format(price)} {commonT("price-type")}
                        </span>
                    )}

                    <span className="text-2xl font-semibold text-blue-utility">
                        {format.format(finalPrice)} {commonT("price-type")}
                    </span>
                </div>

                {/* Description */}
                {product.description && (
                    <p className="leading-7 text-black-light-utility">
                        {product.description}
                    </p>
                )}

                {/* Color variants */}
                {variants.length > 0 && (
                    <div className="fcol gap-y-4">
                        <span className="font-medium text-black-utility">
                            {t("color")}
                        </span>

                        <div className="flex flex-wrap gap-3">
                            {variants
                                .filter((variant) => variant.isActive)
                                .map((variant) => {
                                    const isSelected =
                                        selectedVariant?.productVariantId ===
                                        variant.productVariantId;

                                    const isUnavailable =
                                        variant.stockQuantity <= 0;

                                    return (
                                        <button
                                            key={variant.productVariantId}
                                            type="button"
                                            disabled={isUnavailable}
                                            aria-pressed={isSelected}
                                            onClick={() => {
                                                setSelectedVariantId(
                                                    variant.productVariantId,
                                                );
                                                setQuantity(1);
                                            }}
                                            className={cn(
                                                "inline-flex items-center gap-2 rounded-lg border px-4 py-2.5",
                                                "text-sm font-medium transition-all duration-200",
                                                isSelected
                                                    ? "border-blue-utility bg-blue-utility/10 text-blue-utility ring-1 ring-blue-utility"
                                                    : "border-black/15 bg-white text-black-utility hover:border-blue-utility/50",
                                                isUnavailable &&
                                                    "cursor-not-allowed opacity-40 line-through",
                                            )}
                                        >
                                            {isSelected && (
                                                <FaCheck
                                                    size={12}
                                                    className="shrink-0"
                                                />
                                            )}

                                            <span>{variant.color}</span>
                                        </button>
                                    );
                                })}
                        </div>
                    </div>
                )}

                {/* Stock */}
                <div className="flex items-center gap-2 text-sm text-black-light-utility">
                    <FaBoxOpen size={16} />

                    <span>
                        {isOutOfStock
                            ? t("out-of-stock")
                            : `${stockQuantity} ${t("available")}`}
                    </span>
                </div>

                {/* Quantity and Add to cart */}
                <div className="flex w-full items-end gap-4">
                    <div className="fcol min-w-0 flex-1 gap-2">
                        <span className="text-sm font-medium text-black-utility">
                            {t("quantity")}
                        </span>

                        <div
                            className={cn(
                                "fbc md:w-1/2 w-3/4 gap-2 rounded-full bg-white p-1",
                                "shadow-sm ring-1 ring-black/10",
                            )}
                        >
                            <Button
                                type="button"
                                onClick={() =>
                                    setQuantity((current) =>
                                        Math.max(1, current - 1),
                                    )
                                }
                                disabled={quantity <= 1 || isOutOfStock}
                                aria-label={t("decrease-quantity")}
                                className={cn(
                                    "fcc size-9 shrink-0 rounded-full border sm:size-10",
                                    "border-[var(--blue-border-color)] text-black-utility",
                                    "transition-colors duration-150 hover:bg-crimson/10 hover:text-crimson active:scale-90",
                                    "disabled:cursor-not-allowed disabled:opacity-30",
                                    "bg-crimson text-white-utility hover:bg-[var(--crimson-hover-color)]",
                                )}
                            >
                                <FaMinus size={10} />
                            </Button>

                            <span
                                aria-live="polite"
                                aria-atomic="true"
                                className="fcc min-w-5 flex-1 text-base font-bold text-black-utility"
                            >
                                {quantity}
                            </span>

                            <Button
                                type="button"
                                onClick={() =>
                                    setQuantity((current) =>
                                        Math.min(stockQuantity, current + 1),
                                    )
                                }
                                disabled={
                                    quantity >= stockQuantity || isOutOfStock
                                }
                                aria-label={t("increase-quantity")}
                                className={cn(
                                    "fcc size-9 shrink-0 rounded-full sm:size-10",
                                    "bg-blue-utility text-white transition-colors duration-150 hover:bg-[var(--blue-hover-color)] active:scale-90",
                                    "disabled:cursor-not-allowed disabled:opacity-30",
                                )}
                            >
                                <FaPlus size={10} />
                            </Button>
                        </div>
                    </div>

                    <div className="min-w-0 flex-1">
                        <Button
                            type="button"
                            disabled={isOutOfStock}
                            onClick={handleAddToCart}
                            className={cn(
                                "fcc w-full gap-2 py-3",
                                "bg-blue-utility hover:bg-[var(--blue-hover-color)]",
                                "disabled:cursor-not-allowed disabled:opacity-50",
                            )}
                        >
                            <MdOutlineAddShoppingCart size={22} />
                            <span className="truncate">
                                {t("add-button")}
                            </span>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductDetailsHeaderDetails;
