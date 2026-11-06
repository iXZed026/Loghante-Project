
"use client";

import { cn } from "@/lib/utils/cn";
import CartBox from "./CartBox";
import { useShopCart } from "../../context/ShopCartProvider";

function CartItemWrraper() {
    const { items, isHydrated } = useShopCart();

    if (!isHydrated) {
        return (
            <div className="lg:col-span-7 col-span-12 fcol gap-y-5">
                <h3 className="text-lg font-semibold">
                    Your shopping cart:
                </h3>
                <div className="h-40 animate-pulse rounded-xl bg-black/5" />
            </div>
        );
    }

    return (
        <div
            className={cn(
                "lg:col-span-7 col-span-12",
                "fcol gap-y-5",
            )}
        >
            <h3 className="text-lg font-semibold">
                Your shopping cart:
            </h3>

            {items.length > 0 ? (
                <div className="fcol gap-y-3">
                    {items.map((item) => (
                        <CartBox
                            key={`${item.productId}-${item.productVariantId ?? "default"}`}
                            item={item}
                        />
                    ))}
                </div>
            ) : (
                <div className="fcc min-h-48 rounded-xl bg-black/5 p-6 text-center text-black-light-utility">
                    Your shopping cart is empty.
                </div>
            )}
        </div>
    );
}

export default CartItemWrraper;
