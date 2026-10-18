
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { IoSearchSharp } from "react-icons/io5";

import AnimatePresenceWrapper from "@/components/animations/AnimatePresenceWrapper";
import AppLink from "@/components/ui/AppLink";
import Button from "@/components/ui/Button";
import Loading from "@/components/ui/Loading";

import useDebouncedSearch from "@/hooks/useDebouncedSearch";
import useClickOutside from "@/hooks/useClickOutside";
import { dropdownVariants } from "@/lib/animations/variants";
import { cn } from "@/lib/utils/cn";

interface ISearchSuggestion {
    title: string;
    href: string;
}

const SUGGESTIONS: ISearchSuggestion[] = [
    { title: "Naser al-Din Shah's Ring", href: "/" },
    { title: "Loghanteh Museum Collection", href: "/" },
];

function ShopSearchDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [direction, setDirection] = useState<"ltr" | "rtl">("ltr");

    const dropDownRef = useRef<HTMLDivElement | null>(null);
    const searchInputRef = useRef<HTMLInputElement | null>(null);

    const locale = useLocale();

    useEffect(() => {
        if (isOpen) {
            searchInputRef.current?.focus();
        }
    }, [isOpen]);

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



    // Replace with the API request when the backend is ready.
    const searchProducts = useCallback(
        async (
            searchTerm: string,
            signal: AbortSignal,
        ): Promise<ISearchSuggestion[]> => {
            if (signal.aborted) return [];

            const normalizedQuery = searchTerm.toLowerCase();

            return SUGGESTIONS.filter((item) =>
                item.title.toLowerCase().includes(normalizedQuery),
            );
        },
        [],
    );

    const { results, isLoading, error } =
        useDebouncedSearch<ISearchSuggestion>({
            query,
            search: searchProducts,
            debounceMs: 400,
            minLength: 1,
        });

    const suggestions = query.trim() ? results : SUGGESTIONS;

    const closeDropdown = () => setIsOpen(false);

    useClickOutside(dropDownRef, closeDropdown);

    return (
        <div
            ref={dropDownRef}
            className="relative hidden w-10 shrink-0 md:block"
        >
            <Button
                type="button"
                aria-label="Open search"
                aria-expanded={isOpen}
                aria-haspopup="true"
                onClick={() => setIsOpen((previous) => !previous)}
                className={cn(
                    "fcc size-10 p-0",
                    "text-gold-utility",
                    "transition-colors duration-200",
                    "hover:bg-white/10 hover:text-white",
                    isOpen && "bg-white/10",
                )}
            >
                <IoSearchSharp size={22} />
            </Button>

            <AnimatePresenceWrapper isActive={isOpen}>
                {isOpen && (
                    <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className={cn(
                            "absolute top-full z-50 pt-3",
                            "w-[min(22rem,calc(100vw-2rem))]",
                            "max-w-[calc(100vw-2rem)]",
                            direction === "rtl" ? "left-full" : "right-full",
                        )}
                    >
                        <div
                            className={cn(
                                "w-full min-w-0 overflow-hidden rounded-xl",
                                "border border-black/10",
                                "bg-white-utility text-black-utility",
                                "shadow-xl shadow-black/15",
                            )}
                        >
                            <div className="p-3">
                                <div
                                    className={cn(
                                        "flex h-12 min-w-0 items-center gap-3",
                                        "rounded-lg border border-black/10",
                                        "bg-white-light-utility px-3",
                                        "transition-colors duration-200",
                                        "focus-within:border-gold-utility",
                                        "focus-within:ring-2 focus-within:ring-gold-opacity",
                                    )}
                                >
                                    <IoSearchSharp
                                        size={20}
                                        className="shrink-0 text-black-light-utility"
                                        aria-hidden="true"
                                    />

                                    <input
                                        ref={searchInputRef}
                                        value={query}
                                        onChange={(event) =>
                                            setQuery(event.target.value)
                                        }
                                        placeholder="Search products..."
                                        aria-label="Search products"
                                        aria-busy={isLoading}
                                        className={cn(
                                            "h-full min-w-0 flex-1",
                                            "bg-transparent text-sm",
                                            "text-black-utility outline-none",
                                            "placeholder:text-black-light-utility",
                                            "appearance-none",
                                        )}
                                    />

                                    {isLoading && (
                                        <Loading
                                            color="var(--blue-color)"
                                            size={26}
                                        />
                                    )}

                                    {query && (
                                        <button
                                            type="button"
                                            onClick={() => setQuery("")}
                                            aria-label="Clear search"
                                            className="
                                            cursor-pointer
                                            shrink-0 
                                            p-1
                                            text-3xl
                                            text-black-light-utility 
                                            transition-colors 
                                            hover:text-crimson"
                                        >
                                            ×
                                        </button>
                                    )}

                                </div>
                            </div>

                            <div
                                className="min-w-0 px-3 pb-3"
                                aria-live="polite"
                            >
                                {isLoading ? (
                                    <p className="px-3 py-4 text-sm text-black-light-utility">
                                        Searching...
                                    </p>
                                ) : error ? (
                                    <p className="px-3 py-4 text-sm text-crimson">
                                        Search failed. Please try again.
                                    </p>
                                ) : suggestions.length > 0 ? (
                                    <ul className="flex w-full min-w-0 flex-col gap-1">
                                        {suggestions.map((item) => (
                                            <li
                                                key={item.title}
                                                className="w-full min-w-0"
                                            >
                                                <AppLink
                                                    href={item.href}
                                                    onClick={closeDropdown}
                                                    className={cn(
                                                        "block w-full min-w-0 rounded-lg",
                                                        "break-words px-3 py-4",
                                                        "text-sm font-medium",
                                                        "transition-colors duration-200",
                                                        "hover:bg-[var(--white-light-color)]",
                                                        "hover:text-[var(--crimson-color)]",
                                                    )}
                                                >
                                                    {item.title}
                                                </AppLink>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="px-3 py-4 text-sm text-black-light-utility">
                                        No products found.
                                    </p>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresenceWrapper>
        </div>
    );
}

export default ShopSearchDropdown;
