"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { IoChevronDownOutline, IoArrowForwardOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

import AppLink from "@/components/ui/AppLink";
import Button from "@/components/ui/Button";
import Loading from "@/components/ui/Loading";
import AnimatePresenceWrapper from "@/components/animations/AnimatePresenceWrapper";
import ArrowIcon from "@/components/shared/ArrowIcon";

import { openSlideMenu, openSlideMenuFa } from "@/lib/animations/variants";
import { getLocalizedValue } from "@/lib/utils/getLocalizedValue";
import { cn } from "@/lib/utils/cn";
import { getNewestProducts, type ProductResponseData } from "@/lib/api/shop/products/products";

import type { TranslationFunction } from "@/types/translations";
import type { IMuseumPart } from "../../data/museumParts";
import type { IProductCategory } from "@/features/shop/data/productCategories";
import ShopHumburgerBox from "@/features/shop/componenets/ShopHeader/ShopHumburgerBox";

export interface INavMenuLink {
  id: number;
  name: {
    en: string;
    fa: string;
  };
  path: string;
  museumParts?: IMuseumPart[];
  productCategories?: IProductCategory[];
  category?: string;
}

interface ISubMenu {
  link: INavMenuLink;
  UnActiveHumberHandler: () => void;
  activeSubMenu: boolean;
  UnActiveSubMenuHandler: () => void;
  t: TranslationFunction;
  color?: string;
}

const subMenuLinkClass = cn(
  "block w-full",
  "px-4 py-5 md:px-7",
  "rounded-md border-b border-b-black/25",
  "font-wulkan text-lg font-bold italic md:text-xl",
  "transition-all hover:bg-[var(--white-light-color)]",
  "click-scale",
);

function SubMenu({
  link,
  UnActiveHumberHandler,
  activeSubMenu,
  UnActiveSubMenuHandler,
  t,
  color = "var(--crimson-color)",
}: ISubMenu) {
  const locale = useLocale();
  const newestProductsT = useTranslations("shopHeader.new-products");
  const isFa = locale === "fa";
  const submenuItems = link.museumParts ?? link.productCategories ?? [];
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [shouldScroll, setShouldScroll] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const [newProducts, setNewProducts] = useState<ProductResponseData[]>([]);
  const [newProductsStatus, setNewProductsStatus] = useState<"loading" | "ready" | "error">("loading");

  const updateScrollIndicator = useCallback(() => {
    const element = scrollRef.current;

    if (!element) {
      setShouldScroll(false);
      setShowScrollIndicator(false);
      return;
    }

    const hasOverflow = element.scrollHeight > element.clientHeight + 2;

    setShouldScroll(hasOverflow);
    setShowScrollIndicator(
      hasOverflow &&
      element.scrollTop + element.clientHeight < element.scrollHeight - 2,
    );
  }, []);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    const contentElement = contentRef.current;

    if (!scrollElement) return;

    updateScrollIndicator();

    const observer = new ResizeObserver(updateScrollIndicator);
    observer.observe(scrollElement);

    if (contentElement) {
      observer.observe(contentElement);
    }

    return () => observer.disconnect();
  }, [updateScrollIndicator, link.museumParts, link.productCategories, activeSubMenu]);

  useEffect(() => {
    if (!link.category || !activeSubMenu) return;

    let isCurrent = true;

    async function loadNewestProducts() {
      setNewProductsStatus("loading");

      try {
        const response = await getNewestProducts(locale);

        if (!response.success || !Array.isArray(response.data)) {
          throw new Error(response.message);
        }

        if (isCurrent) {
          setNewProducts(response.data.slice(0, 4));
          setNewProductsStatus("ready");
        }
      } catch {
        if (isCurrent) {
          setNewProducts([]);
          setNewProductsStatus("error");
        }
      }
    }

    void loadNewestProducts();

    return () => {
      isCurrent = false;
    };
  }, [activeSubMenu, link.category, locale]);

  return (
    <AnimatePresenceWrapper isActive={activeSubMenu}>
      <div
        className={cn(
          "absolute inset-y-0 z-10",
          "h-screen w-full overflow-hidden",
          isFa ? "lg:right-full" : "lg:left-full",
        )}
      >
        <motion.div
          variants={isFa ? openSlideMenuFa : openSlideMenu}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="h-full w-full"
        >
          <div
            className={cn(
              "flex h-full min-h-0 flex-col",
              "w-full lg:w-110 xl:w-auto",
              "border-l-2 border-black/20",
              "bg-white-utility",
            )}
          >
            <div
              className="mb-3 shrink-0 border-b-2 px-4 py-4 md:px-7"
              style={{ borderColor: color }}
            >
              <Button
                type="button"
                className="flex items-center gap-2 p-0 text-black-utility hover:opacity-50"
                onClick={UnActiveSubMenuHandler}
              >
                <ArrowIcon direction="left" />
                {t("back-button")}
              </Button>
            </div>

            <div className="relative min-h-0 flex-1">
              <div
                ref={scrollRef}
                onScroll={updateScrollIndicator}
                className={cn(
                  "h-full overflow-x-hidden overscroll-contain",
                  shouldScroll ? "overflow-y-auto" : "overflow-y-hidden",
                )}
                style={
                  shouldScroll
                    ? {
                        scrollbarColor: `${color} transparent`,
                        scrollbarWidth: "thin",
                      }
                    : undefined
                }
              >
                <div ref={contentRef}>
                  {submenuItems.map((item) => (
                    <AppLink
                      key={item.id}
                      href={item.href}
                      className={subMenuLinkClass}
                      onClick={UnActiveHumberHandler}
                    >
                      {getLocalizedValue(item.name, locale)}
                    </AppLink>
                  ))}
                </div>
              </div>

              {showScrollIndicator && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, y: [0, 6, 0] }}
                  transition={{
                    opacity: { duration: 0.2 },
                    y: { duration: 1, repeat: Infinity, ease: "easeInOut" },
                  }}
                  className="pointer-events-none absolute bottom-4 left-1/2 z-10 -translate-x-1/2"
                  style={{ color }}
                >
                  <IoChevronDownOutline size={30} />
                </motion.div>
              )}
            </div>

            {link.category && (
              <section className="flex h-[44%] min-h-0 shrink-0 flex-col border-t border-black/10">
                <div className="flex shrink-0 items-center justify-between px-4 py-3 md:px-5">
                  <h3 className="text-sm font-semibold text-black-utility md:text-base">
                    {newestProductsT("title")}
                  </h3>

                  <AppLink
                    href="/shop"
                    onClick={UnActiveHumberHandler}
                    className="flex items-center gap-1 text-xs font-medium text-black-light-utility transition-colors hover:text-(--crimson-color)"
                  >
                    {newestProductsT("view-all")}
                    <IoArrowForwardOutline size={14} />
                  </AppLink>
                </div>

                <div
                  className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 pb-4"
                  style={{
                    scrollbarColor: `${color} transparent`,
                    scrollbarWidth: "thin",
                  }}
                >
                  {newProductsStatus === "loading" ? (
                    <div className="fcc min-h-32">
                      <Loading
                        size={28}
                        color={color}
                        aria-label={newestProductsT("loading")}
                      />
                    </div>
                  ) : newProductsStatus === "error" ? (
                    <p className="px-2 py-6 text-center text-xs text-black-light-utility">
                      {newestProductsT("load-error")}
                    </p>
                  ) : newProducts.length === 0 ? (
                    <p className="px-2 py-6 text-center text-xs text-black-light-utility">
                      {newestProductsT("not-found")}
                    </p>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      {newProducts.map((product) => (
                        <ShopHumburgerBox
                          key={product.productId}
                          product={{
                            id: product.productId,
                            name:
                              product.name ||
                              newestProductsT("product-fallback", {
                                id: product.productId,
                              }),
                            href: `/shop/products/${product.productId}`,
                            image:
                              product.imageUrl || "/images/loghanteh-cafe.jpg",
                          }}
                          UnActiveHumberHandler={UnActiveHumberHandler}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </section>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresenceWrapper>
  );
}

export default SubMenu;
