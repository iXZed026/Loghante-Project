
"use client";

import { ReactNode, useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { useLocale } from "next-intl";

import AnimatePresenceWrapper from "@/components/animations/AnimatePresenceWrapper";
import Button from "@/components/ui/Button";
import NavLinks from "./NavLinks";

import useClickOutside from "@/hooks/useClickOutside";
import {
  openSlideMenu,
  openSlideMenuFa,
} from "@/lib/animations/variants";
import { cn } from "@/lib/utils/cn";

import type { TranslationFunction } from "@/types/translations";
import type { INavLink } from "../../data/navLinks";
import type { IShopNavLink } from "@/features/shop/data/shoNavLinks";

interface IHamburgerMenuProps {
  activeHumber: boolean;
  UnActiveHumberHandler: () => void;
  t: TranslationFunction;
  isAuthenticated: boolean;
  isLoading: boolean;
  navLinks: (INavLink | IShopNavLink)[];
  color?: string;
  children?: ReactNode;
}

function HamburgerMenu({
  activeHumber,
  UnActiveHumberHandler,
  t,
  isAuthenticated,
  isLoading,
  navLinks,
  color = "var(--crimson-color)",
  children,
}: IHamburgerMenuProps) {
  const divElem = useRef<HTMLDivElement | null>(null);
  const locale = useLocale();

  const [isSubMenuActive, setIsSubMenuActive] = useState(false);

  const handleSubMenuActivation = useCallback((active: boolean) => {
    setIsSubMenuActive(active);
  }, []);

  useClickOutside(divElem, UnActiveHumberHandler);

  return (
    <AnimatePresenceWrapper isActive={activeHumber}>
      <div
        className={cn(
          "fixed inset-0 z-40",
          "h-screen w-full",
          "bg-black/70",
          "text-black-utility",
          "md:text-md text-lg",
        )}
      >
        <motion.div
          variants={locale !== "fa" ? openSlideMenu : openSlideMenuFa}
          initial="hidden"
          animate="visible"
          exit="exit"
          ref={divElem}
          className={cn(
            "fixed top-0 z-50 isolate",
            "flex h-screen flex-col",
            "sm:w-120 w-full",
            "bg-white-utility",
            "shadow-lg",
            locale === "fa" ? "right-0" : "left-0",
          )}
        >
          <div
            className={cn(
              "mb-2 shrink-0",
              "border-b-3",
              "py-4 md:px-7 px-4",
            )}
            style={{ borderColor: color }}
          >
            <Button
              type="button"
              className={cn(
                "flex items-center gap-2",
                "p-0",
                "text-black-utility",
                "hover:opacity-50",
              )}
              onClick={UnActiveHumberHandler}
            >
              {t("close-button")}
              <IoMdClose className="size-6" style={{ color }} />
            </Button>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto">
            <NavLinks
              UnActiveHumberHandler={UnActiveHumberHandler}
              t={t}
              navLinks={navLinks}
              color={color}
              onActiveSub={handleSubMenuActivation}
            />
          </div>

          {children && !isSubMenuActive && (
            <div
              className={cn(
                "shrink-0",
                "md:hidden flex flex-col gap-3",
                "md:px-7 px-4",
                "py-4",
                "border-t-2",
                "bg-white-utility",
                "not-italic md:text-lg text-base z-100",
              )}
              style={{ borderColor: color }}
            >
              {children}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresenceWrapper>
  );
}

export default HamburgerMenu;
