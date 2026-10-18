"use client";

import Container from "@/components/shared/Container";
import LanguageSwitcher from "@/components/shared/LanguageSwitcher";
import AppImage from "@/components/ui/AppImage";
import AppLink from "@/components/ui/AppLink";
import Button from "@/components/ui/Button";
import Skeleton from "@/components/ui/Skeleton";
import { cn } from "@/lib/utils/cn";
import { useProfile } from "@/contexts/ProfileProvider";
import {
  getHeaderBackground,
  getLayoutVisibility,
} from "@/features/loghante(root)/utils/layout";
import useActive from "@/hooks/useActive";
import useScroll from "@/hooks/useScroll";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { FiShoppingBag, FiUser } from "react-icons/fi";
import { IoIosMenu } from "react-icons/io";
import HamburgerMenu from "@/features/loghante(root)/components/header/HamburgerMenu";
import TicketDropDown from "@/features/loghante(root)/components/header/TicketDropDown";
import { IoCartOutline, IoSearchSharp } from "react-icons/io5";
import ShopSearchDropdown from "./ShopSearchDropdown";
import { shopNavLinks } from "../../data/shoNavLinks";
import ShopCartDropdown from "./shopCartDropdown/ShopCartDropdown";

function ShopHeader() {
  const t = useTranslations("LoghantehHeader");
  const locale = useLocale();
  const pathname = usePathname();

  const {
    isAuthenticated,
    isLoading,
  } = useProfile();




  const [
    activeHumber,
    activeHumberHandler,
    UnActiveHumberHandler,
  ] = useActive(false);

  return (
    <header
      className={cn(
        "fixed top-0 z-30",
        "w-full h-[80px]",
        "py-3",
        "select-none",
        "text-white-utility",
        "text-xs sm:text-sm md:text-md",
        "transition-all duration-300 ease-in-out",
        "bg-blue-utility"
      )}
    >
      <Container>
        <div className="grid grid-cols-12">
          {/* LEFT */}
          <div className="col-span-4 flex items-center gap-2">
            {/* Hamburger */}
            <IoIosMenu
              className={cn(
                "sm:size-11 size-13",
                "cursor-pointer",
                "click-scale",
                "transition-all",
                "hover:opacity-50",
                "text-gold-utility",
              )}
              onClick={activeHumberHandler}
            />

            {/* Desktop Auth */}
            {isLoading ? (
              <Skeleton
                className={cn(
                  "hidden md:block",
                  "h-10 w-16",
                  "rounded-md",
                  "bg-gold-utility"
                )}
              />
            ) : isAuthenticated ? (
              <AppLink href="/profile">
                <Button
                  className={cn(
                    "hidden md:flex",
                    "size-10 p-0",
                    "items-center justify-center",
                    "hover:bg-white/35",
                    "text-gold-utility",
                  )}
                  aria-label="Profile"
                >
                  <FiUser className="size-5" />
                </Button>
              </AppLink>
            ) : (
              <AppLink href="/login">
                <Button
                  className={cn(
                    "hidden md:block",
                    "px-4 py-2",
                    "font-semibold",
                    "border",
                    "hover:bg-white/35",
                    "text-gold-utility",
                  )}
                >
                  {t("login-button")}
                </Button>
              </AppLink>
            )}

            {/* Desktop Language */}
            <div className="hidden md:block">
              <LanguageSwitcher
                className="w-27"
                background="var(--blue-color)"
              />
            </div>
          </div>

          {/* LOGO */}
          <div className="col-span-4 fcc">
            <AppLink href="/">
              <span
                role="img"
                aria-label="loghante icon"
                className={cn(
                  "block w-[55px] h-[40px]",
                  "md:w-[70px] md:h-[50px]",
                  "bg-[var(--gold-color)]"
                )}
                style={{
                  maskImage: 'url("/images/Loghanteh-logo.svg")',
                  WebkitMaskImage: 'url("/images/Loghanteh-logo.svg")',
                  maskRepeat: "no-repeat",
                  WebkitMaskRepeat: "no-repeat",
                  maskPosition: "center",
                  WebkitMaskPosition: "center",
                  maskSize: "contain",
                  WebkitMaskSize: "contain",
                }}
              />
            </AppLink>
          </div>

          {/* RIGHT */}
          <div className="col-span-4 fec gap-5">
            {/* Search */}
            <ShopSearchDropdown />

            {/* Cart */}
            <ShopCartDropdown />
          </div>
        </div>
      </Container>

      {/* Hamburger */}
      <HamburgerMenu
        activeHumber={activeHumber}
        UnActiveHumberHandler={UnActiveHumberHandler}
        t={t}
        isAuthenticated={isAuthenticated}
        isLoading={isLoading}
        navLinks={shopNavLinks}
        color="var(--blue-color)"
      />
    </header>
  );
}

export default ShopHeader;
