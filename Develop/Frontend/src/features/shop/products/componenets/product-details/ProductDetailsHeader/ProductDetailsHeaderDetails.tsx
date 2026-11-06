"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";
import { useLocale, useTranslations } from "next-intl";
import { FaMinus, FaPlus, FaBoxOpen } from "react-icons/fa6";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import type { ProductDetailData } from "@/lib/api/shop/products/products";
import { useShopCart } from "@/features/shop/context/ShopCartProvider";

interface ProductDetailsHeaderDetailsProps {
  product: ProductDetailData;
}

function ProductDetailsHeaderDetails({ product }: ProductDetailsHeaderDetailsProps) {
  const commonT = useTranslations("common");
  const t = useTranslations("shopProductDetails.header");
  const locale = useLocale();
  const { addToCart } = useShopCart();
  const variants = product.variants ?? [];
  const initialVariant = variants.find((variant) => variant.isActive && variant.stockQuantity > 0)
    ?? variants.find((variant) => variant.isActive);
  const [selectedVariantId, setSelectedVariantId] = useState<number | undefined>(initialVariant?.productVariantId);
  const [quantity, setQuantity] = useState(1);
  const selectedVariant = variants.find((variant) => variant.productVariantId === selectedVariantId) ?? initialVariant;
  const stockQuantity = selectedVariant?.stockQuantity ?? (product.availability ? 1 : 0);
  const isOutOfStock = !product.availability || stockQuantity <= 0;
  const rawPrice = Number(selectedVariant?.price ?? product.price);
  const price = Number.isFinite(rawPrice) ? rawPrice : 0;
  const rawDiscount = Number(product.discountPercent ?? 0);
  const discountPercent = Number.isFinite(rawDiscount) ? Math.min(100, Math.max(0, rawDiscount)) : 0;
  const finalPrice = Math.round(price * (1 - discountPercent / 100));
  const format = new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US");

  return (
    <div className="fcol col-span-12 gap-y-8 xl:col-span-7 xl:px-25 lg:px-5">
      <div className="flex gap-4 text-sm text-black-light-utility">
        <span>{product.museumName}</span>
      </div>

      <h1 className="line-clamp-2 font-wulkan text-3xl font-bold" title={product.name}>
        {product.name || t("product-fallback", { id: product.productId })}
      </h1>

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

      {product.description && (
        <p className="leading-7 text-black-light-utility">{product.description}</p>
      )}

      {variants.length > 0 && (
        <div className="fcol gap-y-5">
          <span className="font-medium text-black-utility">{t("color")}</span>
          <div className="flex flex-wrap gap-3">
            {variants.filter((variant) => variant.isActive).map((variant) => (
              <button
                key={variant.productVariantId}
                type="button"
                title={variant.color}
                aria-label={variant.color || t("variant")}
                aria-pressed={selectedVariant?.productVariantId === variant.productVariantId}
                onClick={() => {
                  setSelectedVariantId(variant.productVariantId);
                  setQuantity(1);
                }}
                className={cn(
                  "size-8 cursor-pointer rounded-full border border-black/15",
                  selectedVariant?.productVariantId === variant.productVariantId && "ring-2 ring-blue-utility ring-offset-2",
                )}
                style={{ backgroundColor: variant.color || "var(--blue-color)" }}
              />
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 text-sm text-black-light-utility">
        <FaBoxOpen size={16} />
        <span>
          {isOutOfStock ? t("out-of-stock") : `${stockQuantity} ${t("available")}`}
        </span>
      </div>

      <div className="flex w-full items-end gap-4">
        <div className="fcol min-w-0 flex-1 gap-2">
          <span className="text-sm font-medium text-black-utility">{t("quantity")}</span>
          <div className={cn("fbc md:w-1/2 w-3/4 gap-2 rounded-full bg-white p-1", "shadow-sm ring-1 ring-black/10")}>
            <Button
              type="button"
              onClick={() => setQuantity((current) => Math.max(1, current - 1))}
              disabled={quantity <= 1 || isOutOfStock}
              aria-label={t("decrease-quantity")}
              className={cn("fcc size-9 shrink-0 rounded-full border sm:size-10", "border-[var(--blue-border-color)] text-black-utility", "transition-colors duration-150 hover:bg-crimson/10 hover:text-crimson active:scale-90", "disabled:cursor-not-allowed disabled:opacity-30", "bg-crimson text-white-utility hover:bg-[var(--crimson-hover-color)]")}
            >
              <FaMinus size={10} />
            </Button>
            <span aria-live="polite" aria-atomic="true" className="fcc min-w-5 flex-1 text-base font-bold text-black-utility">
              {quantity}
            </span>
            <Button
              type="button"
              onClick={() => setQuantity((current) => Math.min(stockQuantity, current + 1))}
              disabled={quantity >= stockQuantity || isOutOfStock}
              aria-label={t("increase-quantity")}
              className={cn("fcc size-9 shrink-0 rounded-full sm:size-10", "bg-blue-utility text-white transition-colors duration-150 hover:bg-[var(--blue-hover-color)] active:scale-90", "disabled:cursor-not-allowed disabled:opacity-30")}
            >
              <FaPlus size={10} />
            </Button>
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <Button
            type="button"
            disabled={isOutOfStock}
            onClick={() => {
              addToCart({
                productId: product.productId,
                productVariantId: selectedVariant?.productVariantId,
                name: product.name,
                museumName: product.museumName,
                imageUrl: product.imageUrl,
                price,
                finalPrice,
                discountPercent,
                quantity,
                stockQuantity,
                color: selectedVariant?.color,
                sku: selectedVariant?.sku,
              });
            }}
            className={cn(
              "fcc w-full gap-2 py-3",
              "bg-blue-utility hover:bg-[var(--blue-hover-color)]",
              "disabled:cursor-not-allowed disabled:opacity-50",
            )}
          >
            <MdOutlineAddShoppingCart size={22} />
            <span className="truncate">{t("add-button")}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsHeaderDetails;
