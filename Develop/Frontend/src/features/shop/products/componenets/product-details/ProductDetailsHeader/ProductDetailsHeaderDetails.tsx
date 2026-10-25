"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";
import { useTranslations } from "next-intl";
import { FaMinus, FaPlus, FaBoxOpen } from "react-icons/fa6";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { formatPrice } from "@/lib/utils/formatPrice";

function ProductDetailsHeaderDetails() {

  const commonT = useTranslations("common");
  const T =
    useTranslations("shopProductDetails.header")

  const stockQuantity = 12;
  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };

  const increaseQuantity = () => {
    setQuantity((current) => Math.min(stockQuantity, current + 1));
  };

  const isOutOfStock = stockQuantity <= 0;

  return (
    <div className="fcol col-span-12 gap-y-8 xl:col-span-7 xl:px-25 lg:px-5">
      <div className="flex gap-4 text-sm text-black-light-utility">
        <span>Loghanteh palace museum</span>
        <span>Fashion & Clothing</span>
      </div>

      <div>
        <h6
          className={cn(
            "line-clamp-1 text-3xl",
            "font-wulkan font-bold",
          )}
          title="Naser al-Din Shah Perfume – Crimson"
        >
          Naser al-Din Shah Perfume – Crimson
        </h6>
      </div>

      <div>
        <span className="text-2xl font-semibold text-blue-utility">
          {formatPrice(40000)}
          {commonT("price-type")}
        </span>
      </div>

      <div>
        <p className="leading-7 text-black-light-utility">
          Discover a world where history, culture, and heritage come
          together. Loghanteh Historical and Cultural Complex is home
          to a collection of unique museums, each offering a distinct
          experience.
        </p>
      </div>

      {/* Color */}
      <div className="fcol gap-y-5">
        <span className="font-medium text-black-utility">{T("color")}</span>

        <div className="flex gap-3">
          <button
            type="button"
            aria-label="Blue"
            className="size-8 cursor-pointer rounded-full bg-blue-utility ring-2 ring-offset-2 ring-blue-utility"
          />
          <button
            type="button"
            aria-label="Crimson"
            className="size-8 cursor-pointer rounded-full bg-crimson"
          />
          <button
            type="button"
            aria-label="Black"
            className="size-8 cursor-pointer rounded-full bg-black"
          />
        </div>
      </div>

      {/* Stock quantity */}
      <div className="flex items-center gap-2 text-sm text-black-light-utility">
        <FaBoxOpen size={16} />
        <span>
          {isOutOfStock
            ? T("out-of-stock")
            : `${stockQuantity} ${T("available")}`}
        </span>
      </div>

      {/* Quantity and Add to Cart */}
      <div className="flex w-full items-end gap-4">
        <div className="fcol min-w-0 flex-1 gap-2">
          <span className="text-sm font-medium text-black-utility">
            {T("quantity")}
          </span>

          <div
            className={cn(
              "fbc  md:w-1/2 w-3/4 gap-2 rounded-full bg-white p-1",
              "shadow-sm ring-1 ring-black/10",
            )}
          >
            <Button
              type="button"
              onClick={decreaseQuantity}
              disabled={quantity <= 1 || isOutOfStock}
              aria-label="Decrease quantity"
              className={cn(
                "fcc size-9 shrink-0 rounded-full border sm:size-10",
                "border-[var(--blue-border-color)] text-black-utility",
                "transition-colors duration-150",
                "hover:bg-crimson/10 hover:text-crimson",
                "active:scale-90",
                "disabled:cursor-not-allowed disabled:opacity-30",
                "bg-crimson text-white-utility",
                "hover:bg-[var(--crimson-hover-color)]"
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
              onClick={increaseQuantity}
              disabled={quantity >= stockQuantity || isOutOfStock}
              aria-label="Increase quantity"
              className={cn(
                "fcc size-9 shrink-0 rounded-full sm:size-10",
                "bg-blue-utility text-white",
                "transition-colors duration-150",
                "hover:bg-[var(--blue-hover-color)]",
                "active:scale-90",
                "disabled:cursor-not-allowed disabled:opacity-30",
              )}
            >
              <FaPlus size={10} />
            </Button>
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <Button
            disabled={isOutOfStock}
            className={cn(
              "fcc w-full gap-2 py-3",
              "bg-blue-utility hover:bg-[var(--blue-hover-color)]",
              "disabled:cursor-not-allowed disabled:opacity-50",
            )}
          >
            <MdOutlineAddShoppingCart size={22} />
            <span className="truncate">
              {T("add-button")}
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsHeaderDetails;
