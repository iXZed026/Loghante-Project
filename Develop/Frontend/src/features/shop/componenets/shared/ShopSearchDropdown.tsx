"use client"

import { useState } from "react"
import AnimatePresenceWrapper from "@/components/animations/AnimatePresenceWrapper"
import AppLink from "@/components/ui/AppLink"
import Button from "@/components/ui/Button"
import { cn } from "@/lib/utils/cn"
import { IoSearchSharp } from "react-icons/io5"

const SUGGESTIONS = [
    {
        title: "Naser al-Din Shah's Ring",
        href: "/",
    },
    {
        title: "Loghanteh Museum Collection",
        href: "/",
    },
]

function ShopSearchDropdown() {
    const [isOpen, setIsOpen] = useState(false)
    const [query, setQuery] = useState("")

    const filteredSuggestions = SUGGESTIONS.filter((item) =>
        item.title.toLowerCase().includes(query.trim().toLowerCase()),
    )

    return (
        <div className="relative hidden w-10 shrink-0 md:block">
            {/* Search Button */}
            <Button
                type="button"
                aria-label="Open search"
                aria-expanded={isOpen}
                aria-haspopup="true"
                onClick={() => setIsOpen((prev) => !prev)}
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

            {/* Search Dropdown */}
            <AnimatePresenceWrapper isActive={isOpen}>
                {isOpen && (
                    <div
                        className={cn(
                            "absolute top-full z-50 pt-3",
                            "left-0 right-0",
                            "w-[min(22rem,calc(100vw-2rem))]",
                            "max-w-[calc(100vw-2rem)]",
                            "md:left-auto md:right-0",
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
                            {/* Search Input */}
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
                                        type="search"
                                        value={query}
                                        onChange={(event) =>
                                            setQuery(event.target.value)
                                        }
                                        placeholder="Search products..."
                                        aria-label="Search products"
                                        className={cn(
                                            "h-full min-w-0 flex-1",
                                            "bg-transparent text-sm",
                                            "text-black-utility outline-none",
                                            "placeholder:text-black-light-utility",
                                        )}
                                    />

                                    {query && (
                                        <button
                                            type="button"
                                            onClick={() => setQuery("")}
                                            aria-label="Clear search"
                                            className="shrink-0 text-black-light-utility transition-colors hover:text-crimson"
                                        >
                                            ×
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Suggestions */}
                            <div className="min-w-0 px-3 pb-3">
                                <p className="px-2 pb-2 text-xs font-semibold text-black-light-utility">
                                    {query ? "Search results" : "Suggestions"}
                                </p>

                                {filteredSuggestions.length > 0 ? (
                                    <ul className="flex w-full min-w-0 flex-col gap-1">
                                        {filteredSuggestions.map((item) => (
                                            <li
                                                key={item.title}
                                                className="w-full min-w-0"
                                            >
                                                <AppLink
                                                    href={item.href}
                                                    onClick={() =>
                                                        setIsOpen(false)
                                                    }
                                                    className={cn(
                                                        "block w-full min-w-0 rounded-lg",
                                                        "break-words px-3 py-3",
                                                        "text-sm font-medium",
                                                        "transition-colors duration-200",
                                                        "hover:bg-white-light-utility",
                                                        "hover:text-crimson",
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
                    </div>
                )}
            </AnimatePresenceWrapper>
        </div>
    )
}

export default ShopSearchDropdown
