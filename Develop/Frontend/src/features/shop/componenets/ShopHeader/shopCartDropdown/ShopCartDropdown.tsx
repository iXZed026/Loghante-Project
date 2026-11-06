
"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { IoCartOutline } from "react-icons/io5";

import AnimatePresenceWrapper from "@/components/animations/AnimatePresenceWrapper";
import AppLink from "@/components/ui/AppLink";
import Button from "@/components/ui/Button";

import { dropdownVariants } from "@/lib/animations/variants";
import { cn } from "@/lib/utils/cn";
import { useLocale, useTranslations } from "next-intl";
import ShopCartDropdownBox from "./ShopCartDropdownBox";
import { useShopCart } from "@/features/shop/context/ShopCartProvider";
import { formatPrice } from "@/lib/utils/formatPrice";

function ShopCartDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const dropDownRef = useRef<HTMLDivElement | null>(null);
    const [direction, setDirection] = useState<"ltr" | "rtl">("ltr");

    const { items, totalItems, totalPrice, isHydrated } = useShopCart();

    const T = useTranslations("shopHeader.cart")

    const locale = useLocale()

    useEffect(() => {
        const pageDirection =
            document.documentElement.getAttribute("dir");

        setDirection(
            pageDirection === "rtl" ||
                (pageDirection !== "ltr" && locale === "fa")
                ? "rtl"
                : "ltr",
        );
    }, [locale]);


    return (
        <div
            ref={dropDownRef}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            className="relative w-10 shrink-0 "
        >
            <AppLink href="/shop/cart">
                <Button
                    type="button"
                    className={cn(
                        "fcc relative gap-2 p-1 py-2.5 md:py-3",
                        "text-gold-utility",
                        "transition-colors hover:opacity-50",
                        "cursor-pointer",
                    )}
                    aria-label="Shopping cart"
                >
                    <IoCartOutline className="size-8 md:size-7" />

                    {isHydrated && totalItems > 0 && (
                        <span className="fcc absolute -right-1 -top-1 size-5 rounded-full bg-crimson text-[10px] font-bold text-white">
                            {totalItems > 99 ? "99+" : totalItems}
                        </span>
                    )}
                </Button>
            </AppLink>

            <AnimatePresenceWrapper isActive={isOpen}>
                {isOpen && (
                    <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className={cn(
                            "absolute top-FULL z-50 ",
                            "md:w-[min(27rem,calc(100vw-2rem))] w-[min(23rem,calc(100vw-2rem))]",
                            "max-w-[calc(100vw-2rem)]",
                            direction === "rtl" ? "left-0" : "right-0",
                        )}
                    ><div
                        className={cn(
                            "w-full min-w-0 rounded-xl",
                            "border border-black/10",
                            "bg-white-utility text-black-utility",
                            "p-5 md:p-8 shadow-xl shadow-black/15",
                            "fcol gap-y-5",
                        )}
                    >
                            <div>
                                <h2 className="text-sm font-semibold">
                                    {T("title")}
                                </h2>
                            </div>

                            {!isHydrated ? (
                                <div className="h-24 animate-pulse rounded-lg bg-black/5" />
                            ) : items.length > 0 ? (
                                <>
                                    <div className="fcol max-h-72 gap-y-4 overflow-y-auto">
                                        {items.map((item) => (
                                            <ShopCartDropdownBox
                                                key={`${item.productId}-${item.productVariantId ?? "default"}`}
                                                item={item}
                                            />
                                        ))}
                                    </div>

                                    <div className="fbc gap-3 border-t border-black/10 pt-4">
                                        <span className="text-sm font-medium">
                                            Total
                                        </span>

                                        <span className="text-sm font-bold text-blue-utility">
                                            {formatPrice(totalPrice)}
                                        </span>
                                    </div>

                                    <AppLink href="/shop/cart" className="w-full">
                                        <Button
                                            type="button"
                                            className={cn(
                                                "w-full py-3",
                                                "bg-blue-utility",
                                                "transition-colors hover:opacity-70",
                                            )}
                                        >
                                            {T("order-button")}
                                        </Button>
                                    </AppLink>
                                </>
                            ) : (
                                <div className="py-8 text-center text-sm text-black-light-utility">
                                    Your shopping cart is empty.
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresenceWrapper>
        </div>
    );
}

export default ShopCartDropdown;
