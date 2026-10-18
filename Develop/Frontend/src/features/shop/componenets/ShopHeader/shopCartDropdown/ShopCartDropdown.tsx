
"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { IoCartOutline } from "react-icons/io5";

import AnimatePresenceWrapper from "@/components/animations/AnimatePresenceWrapper";
import AppLink from "@/components/ui/AppLink";
import Button from "@/components/ui/Button";

import { dropdownVariants } from "@/lib/animations/variants";
import { cn } from "@/lib/utils/cn";
import { useLocale } from "next-intl";

function ShopCartDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const dropDownRef = useRef<HTMLDivElement | null>(null);
    const [direction, setDirection] = useState<"ltr" | "rtl">("ltr");

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
            className="relative hidden w-10 shrink-0 md:block"
        >
            <AppLink href="/shop/cart">
                <Button
                    type="button"
                    className={cn(
                        "fcc gap-2 p-1 py-2.5 md:py-3",
                        "text-gold-utility",
                        "transition-colors hover:opacity-50",
                    )}
                    aria-label="Shopping cart"
                >
                    <IoCartOutline size={22} />
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
                            "w-[min(26rem,calc(100vw-2rem))]",
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
                            )}
                        >
                            <div>
                                <h2 className="text-sm font-semibold">
                                    Your shopping cart summary
                                </h2>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresenceWrapper>
        </div>
    );
}

export default ShopCartDropdown;
