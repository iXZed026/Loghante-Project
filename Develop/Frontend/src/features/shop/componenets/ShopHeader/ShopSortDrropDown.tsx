"use client";

import { useCallback, useRef, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { FaAngleDown, FaCheck, FaArrowDownWideShort } from "react-icons/fa6";
import { motion } from "framer-motion";

import AnimatePresenceWrapper from "@/components/animations/AnimatePresenceWrapper";
import useClickOutside from "@/hooks/useClickOutside";
import { dropdownVariants } from "@/lib/animations/variants";
import { cn } from "@/lib/utils/cn";
import { getLocalizedValue } from "@/lib/utils/getLocalizedValue";
import { useLocale } from "next-intl";

const SORT_OPTIONS = [
    {
        value: "newest",
        label: {
            en: "Newest",
            fa: "جدیدترین",
        },
    },
    {
        value: "oldest",
        label: {
            en: "Oldest",
            fa: "قدیمی‌ترین",
        },
    },
    {
        value: "price_asc",
        label: {
            en: "Price: Low to High",
            fa: "قیمت: از کم به زیاد",
        },
    },
    {
        value: "price_desc",
        label: {
            en: "Price: High to Low",
            fa: "قیمت: از زیاد به کم",
        },
    },
    {
        value: "popular",
        label: {
            en: "Most Popular",
            fa: "محبوب‌ترین",
        },
    },
    {
        value: "discount_desc",
        label: {
            en: "Biggest Discount",
            fa: "بیشترین تخفیف",
        },
    },
] as const;

type SortValue = (typeof SORT_OPTIONS)[number]["value"];

const DEFAULT_SORT: SortValue = "newest";

function isSortValue(value: string | null): value is SortValue {
    return SORT_OPTIONS.some((option) => option.value === value);
}

function ShopSortDrropDown() {
    const [isOpen, setIsOpen] = useState(false);

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const dropdownRef = useState<HTMLDivElement | null>(null);
    const selectedValue = searchParams.get("sort");
    const currentSort: SortValue = isSortValue(selectedValue)
        ? selectedValue
        : DEFAULT_SORT;

    const selectedOption =
        SORT_OPTIONS.find((option) => option.value === currentSort) ??
        SORT_OPTIONS[0];

    const closeDropdown = useCallback(() => {
        setIsOpen(false);
    }, []);

    // useClickOutside expects a ref, so the actual ref is created below.
    const containerRef = useRef<HTMLDivElement | null>(null);

    useClickOutside(containerRef, closeDropdown);

    const handleSortChange = (value: SortValue) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value === DEFAULT_SORT) {
            params.delete("sort");
        } else {
            params.set("sort", value);
        }

        const query = params.toString();

        router.replace(query ? `${pathname}?${query}` : pathname, {
            scroll: false,
        });

        setIsOpen(false);
    };

    return (
        <div ref={containerRef} className="relative w-full max-w-64">
            <button
                type="button"
                onClick={() => setIsOpen((previous) => !previous)}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                className={cn(
                    "flex w-full items-center justify-between gap-3",
                    "rounded-lg border border-[var(--blue-border-color)]",
                    "bg-white px-4 py-3 text-sm text-blue-utility",
                    "transition-colors duration-200",
                    "hover:border-[var(--blue-color)]",
                    "focus-visible:outline-none focus-visible:ring-2",
                    "focus-visible:ring-[var(--blue-color)]",
                )}
            >
                <span className="flex min-w-0 items-center gap-2">
                    <FaArrowDownWideShort
                        size={15}
                        className="shrink-0"
                        aria-hidden="true"
                    />

                    <span className="truncate">
                        {getLocalizedValue(selectedOption.label, useLocale())}
                    </span>
                </span>

                <FaAngleDown
                    size={16}
                    aria-hidden="true"
                    className={cn(
                        "shrink-0 transition-transform duration-200",
                        isOpen && "rotate-180",
                    )}
                />
            </button>

            <AnimatePresenceWrapper isActive={isOpen}>
                {isOpen && (
                    <motion.ul
                        role="listbox"
                        aria-label="Sort products"
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className={cn(
                            "absolute left-0 right-0 top-full z-50 mt-2",
                            "overflow-hidden rounded-xl",
                            "border border-[var(--blue-border-color)]",
                            "bg-white shadow-lg shadow-black/10",
                            "py-1",
                        )}
                    >
                        {SORT_OPTIONS.map((option) => {
                            const isSelected = option.value === currentSort;

                            return (
                                <li key={option.value} role="option" aria-selected={isSelected}>
                                    <button
                                        type="button"
                                        onClick={() => handleSortChange(option.value)}
                                        className={cn(
                                            "flex w-full items-center justify-between gap-3",
                                            "px-4 py-3 text-left text-sm",
                                            "transition-colors duration-150",
                                            isSelected
                                                ? "bg-[var(--blue-opacity-color)] font-semibold text-blue-utility"
                                                : "text-black-utility hover:bg-black/5",
                                        )}
                                    >
                                        <span>
                                            {getLocalizedValue(option.label, useLocale())}
                                        </span>

                                        {isSelected && (
                                            <FaCheck
                                                size={13}
                                                className="shrink-0 text-blue-utility"
                                                aria-hidden="true"
                                            />
                                        )}
                                    </button>
                                </li>
                            );
                        })}
                    </motion.ul>
                )}
            </AnimatePresenceWrapper>
        </div>
    );
}

export default ShopSortDrropDown;
