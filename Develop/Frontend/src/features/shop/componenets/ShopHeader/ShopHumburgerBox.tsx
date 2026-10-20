
"use client";

import { IoArrowForwardOutline } from "react-icons/io5";

import AppLink from "@/components/ui/AppLink";
import { cn } from "@/lib/utils/cn";

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
        <div className="aspect-[4/3] overflow-hidden bg-black/5">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="p-2.5">
          <h4 className="line-clamp-2 min-h-10 text-xs font-semibold leading-5 text-black-utility md:text-sm">
            {product.name}
          </h4>

          <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-black-light-utility transition-colors group-hover:text-[var(--crimson-color)]">
            View Product
            <IoArrowForwardOutline size={13} />
          </span>
        </div>
      </AppLink>
    </article>
  );
}

export default ShopHumburgerBox;
