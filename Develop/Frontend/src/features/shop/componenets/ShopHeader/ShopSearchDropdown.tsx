
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
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

interface IShopSearchDropdownProps {
  variant?: "header" | "menu";
}

const SUGGESTIONS: ISearchSuggestion[] = [
  { title: "Naser al-Din Shah's Ring", href: "/" },
  { title: "Loghanteh Museum Collection", href: "/" },
];

function ShopSearchDropdown({
  variant = "header",
}: IShopSearchDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [direction, setDirection] = useState<"ltr" | "rtl">("ltr");

  const dropDownRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const locale = useLocale();
  const t = useTranslations("shopHeader.search");

  const isMenuVariant = variant === "menu";
  const hasQuery = query.trim().length > 0;

  useEffect(() => {
    if (isOpen && !isMenuVariant) {
      searchInputRef.current?.focus();
    }
  }, [isOpen, isMenuVariant]);

  useEffect(() => {
    const pageDirection = document.documentElement.getAttribute("dir");

    setDirection(
      pageDirection === "rtl" ||
        (pageDirection !== "ltr" && locale === "fa")
        ? "rtl"
        : "ltr",
    );
  }, [locale]);

  const searchProducts = useCallback(
    async (
      searchTerm: string,
      signal: AbortSignal,
    ): Promise<ISearchSuggestion[]> => {
      if (signal.aborted) return [];

      const normalizedQuery = searchTerm.trim().toLowerCase();

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

  const suggestions = hasQuery ? results : [];

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
  }, []);

  useClickOutside(dropDownRef, closeDropdown);

  const clearSearch = useCallback(() => {
    setQuery("");
  }, []);

  const renderSearchInput = (mobile = false) => (
    <div
      className={cn(
        "flex h-12 min-w-0 items-center gap-3",
        "rounded-lg border border-black/10",
        "bg-white-light-utility px-3",
        "transition-colors duration-200",
        mobile && "w-full",
      )}
    >
      <IoSearchSharp
        size={20}
        className="shrink-0 text-black-light-utility"
        aria-hidden="true"
      />

      <input
        ref={mobile ? undefined : searchInputRef}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={t("place-holder")}
        aria-label="Search products"
        aria-busy={isLoading}
        className={cn(
          "h-full min-w-0 flex-1",
          "appearance-none bg-transparent text-sm",
          "text-black-utility outline-none",
          "placeholder:text-black-light-utility",
        )}
      />

      {isLoading && <Loading color="var(--blue-color)" size={22} />}

      {query && (
        <button
          type="button"
          onClick={clearSearch}
          aria-label="Clear search"
          className={cn(
            "shrink-0 cursor-pointer p-1 text-2xl",
            "text-black-light-utility transition-colors",
            "hover:text-crimson",
          )}
        >
          ×
        </button>
      )}
    </div>
  );

  const renderSearchContent = () => {
    if (!hasQuery) return null;

    return (
      <div
        className="min-w-0 p-3"
        aria-live="polite"
      >
        {isLoading ? (
          <p className="px-3 py-4 text-sm text-black-light-utility">
            {t("searching")}
          </p>
        ) : error ? (
          <p className="px-3 py-4 text-sm text-crimson">
            Search failed. Please try again.
          </p>
        ) : suggestions.length > 0 ? (
          <ul className="flex w-full min-w-0 flex-col gap-2">
            {suggestions.map((item) => (
              <li key={item.title} className="w-full min-w-0">
                <AppLink
                  href={item.href}
                  onClick={() => {
                    closeDropdown();
                    clearSearch();
                  }}
                  className={cn(
                    "block w-full min-w-0 rounded-lg",
                    "break-words px-4 py-4",
                    "text-sm font-medium leading-6",
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
            {t("not-found")}
          </p>
        )}
      </div>
    );
  };

  const menuResults = (
    <AnimatePresenceWrapper isActive={isMenuVariant && hasQuery}>
      {isMenuVariant && hasQuery && (
        <motion.div
          variants={dropdownVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={cn(
            "absolute bottom-full left-0 right-0 z-50 mb-2",
            "max-h-[min(60vh,24rem)] overflow-y-auto overscroll-contain",
            "rounded-xl border border-black/20",
            "bg-white-utility text-black-utility",
            "shadow-[0_0_18px_4px_rgba(0,0,0,0.2)]",
          )}
        >
          {renderSearchContent()}
        </motion.div>
      )}
    </AnimatePresenceWrapper>
  );

  const menuSearch = (
    <div
      ref={dropDownRef}
      className="relative z-20 w-full min-w-0 md:hidden"
    >
      {menuResults}
      {renderSearchInput(true)}
    </div>
  );

  const headerSearch = (
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
          "flex size-10 items-center justify-center p-0",
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
              direction === "rtl" ? "left-1/2" : "right-1/2",
            )}
          >
            <div
              className={cn(
                "w-full min-w-0 overflow-hidden rounded-xl",
                "border border-black/30",
                "bg-white-utility text-black-utility",
                "shadow-md shadow-black/15",
              )}
            >
              <div className="p-3">
                {renderSearchInput()}
              </div>

              {renderSearchContent()}
            </div>
          </motion.div>
        )}
      </AnimatePresenceWrapper>
    </div>
  );

  return isMenuVariant ? menuSearch : headerSearch;
}

export default ShopSearchDropdown;
