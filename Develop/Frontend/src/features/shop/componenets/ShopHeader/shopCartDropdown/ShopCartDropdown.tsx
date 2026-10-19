
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

function ShopCartDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const dropDownRef = useRef<HTMLDivElement | null>(null);
    const [direction, setDirection] = useState<"ltr" | "rtl">("ltr");

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
                        "fcc gap-2 p-1 py-2.5 md:py-3",
                        "text-gold-utility",
                        "transition-colors hover:opacity-50",
                        "cursor-pointer"
                    )}
                    aria-label="Shopping cart"
                >
                    <IoCartOutline 
                        className="md:size-7 size-8"
                    />
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
                            "absolute top-0 z-50 py-15",
                            "md:w-[min(27rem,calc(100vw-2rem))] w-[min(23rem,calc(100vw-2rem))]",
                            "max-w-[calc(100vw-2rem)]",
                            direction === "rtl" ? "left-0" : "right-0",
                        )}
                    >
                        <div
                            className={cn(
                                "w-full min-w-0 rounded-xl",
                                "border border-black/10",
                                "bg-white-utility text-black-utility",
                                "p-8 shadow-xl shadow-black/15",
                                "fcol gap-y-7",
                            )}
                        >
                            <div>
                                <h2 className="text-sm font-semibold">
                                    {T("title")}
                                </h2>
                            </div>
                            <div className="fcol gap-y-3">
                                <ShopCartDropdownBox/>
                                 <ShopCartDropdownBox/>
                            </div>
                            <div>
                                <Button
                                    className={cn(
                                        "w-full",
                                        "py-3",
                                        "bg-blue-utility",
                                        "transition-color",
                                        "hover:opacity-70",
                                    )}
                                >
                                    {T("order-button")}
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresenceWrapper>
        </div>
    );
}

export default ShopCartDropdown;
