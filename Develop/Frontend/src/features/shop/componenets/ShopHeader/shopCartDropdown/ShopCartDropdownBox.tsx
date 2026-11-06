
"use client";

import Image from "next/image";
import { IoClose } from "react-icons/io5";

import Button from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils/formatPrice";
import { useTranslations } from "next-intl";
import { CartItem, useShopCart } from "@/features/shop/context/ShopCartProvider";
import AppImage from "@/components/ui/AppImage";


interface ShopCartDropdownBoxProps {
    item: CartItem;
}

function ShopCartDropdownBox({ item }: ShopCartDropdownBoxProps) {
    const commonT = useTranslations("common");
    const { removeFromCart } = useShopCart();

    return (
        <div className="flex min-w-0 items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
                <div className="relative size-23 shrink-0 overflow-hidden rounded-md bg-black/5">
                    <AppImage
                        src={item.imageUrl || "/images/loghanteh-cafe.jpg"}
                        alt={item.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                    />
                </div>

                <div className="fcol min-w-0 gap-1">
                    <span className="truncate text-sm font-semibold">
                        {item.name}
                    </span>

                    <span className="truncate text-xs text-black-light-utility">
                        {item.museumName}
                    </span>

                    <span className="text-xs font-medium text-blue-utility">
                        {item.quantity} × {formatPrice(item.finalPrice)}{" "}
                        {commonT("price-type")}
                    </span>
                </div>
            </div>

            <Button
                type="button"
                onClick={() =>
                    removeFromCart(item.productId, item.productVariantId)
                }
                aria-label={`Remove ${item.name} from cart`}
                className="fcc shrink-0 rounded-full p-1 text-black-light-utility transition-colors hover:bg-black/5 hover:text-crimson"
            >
                <IoClose size={17} />
            </Button>
        </div>
    );
}

export default ShopCartDropdownBox;
