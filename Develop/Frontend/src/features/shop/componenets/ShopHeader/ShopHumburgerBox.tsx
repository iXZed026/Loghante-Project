
"use client";

import { IoArrowForwardOutline } from "react-icons/io5";

import AppLink from "@/components/ui/AppLink";
import AppImage from "@/components/ui/AppImage";
import { cn } from "@/lib/utils/cn";
import { useTranslations } from "next-intl";

interface IShopHumburgerBoxProps {
  product: {
    id: number;
    name: string;
    href: string;
    image: string;
  };
  UnActiveHumberHandler: () => void;
}

function ShopHumburgerBox({
  product,
  UnActiveHumberHandler,
}: IShopHumburgerBoxProps) {
  const t = useTranslations("shopHeader.new-products");
  return (
    <article
      className={cn(
        "group min-w-0 overflow-hidden rounded-lg",
        "border border-black/10 bg-white",
        "transition-all duration-300",
        "hover:-translate-y-0.5 hover:shadow-md",
      )}
    >
      <AppLink
        href={product.href}
        onClick={UnActiveHumberHandler}
        className="block"
      >
        <div className="relative aspect-4/3 overflow-hidden bg-black/5">
          <AppImage
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, 220px"
            unoptimized={product.image.startsWith("http")}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="p-2.5">
          <h4 className="line-clamp-2 min-h-10 text-xs font-semibold leading-5 text-black-utility md:text-sm">
            {product.name || t("product-fallback", { id: product.id })}
          </h4>

          <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-black-light-utility transition-colors group-hover:text-(--crimson-color)">
            {t("view-product")}
            <IoArrowForwardOutline size={13} />
          </span>
        </div>
      </AppLink>
    </article>
  );
}

export default ShopHumburgerBox;
