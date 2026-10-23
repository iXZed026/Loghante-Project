
"use client";

import Container from "@/components/shared/Container";
import LanguageSwitcher from "@/components/shared/LanguageSwitcher";
import AppLink from "@/components/ui/AppLink";
import Button from "@/components/ui/Button";
import Skeleton from "@/components/ui/Skeleton";

import { cn } from "@/lib/utils/cn";
import { useProfile } from "@/contexts/ProfileProvider";
import useActive from "@/hooks/useActive";
import { useTranslations } from "next-intl";

import { FiUser } from "react-icons/fi";
import { IoIosMenu } from "react-icons/io";

import HamburgerMenu from "@/features/loghante(root)/components/header/HamburgerMenu";
import ShopSearchDropdown from "./ShopSearchDropdown";
import ShopCartDropdown from "./shopCartDropdown/ShopCartDropdown";

import { shopNavLinks } from "../../data/shoNavLinks";

function ShopHeader() {
  const t = useTranslations("LoghantehHeader");
  const { isAuthenticated, isLoading } = useProfile();

  const [
    activeHumber,
    activeHumberHandler,
    UnActiveHumberHandler,
  ] = useActive(false);

  return (
    <header
      className={cn(
        "fixed top-0 z-30",
        "h-[80px] w-full py-3",
        "select-none text-white-utility",
        "text-xs sm:text-sm md:text-md",
        "transition-all duration-300 ease-in-out",
        "bg-blue-utility",
      )}
    >
      <Container>
        <div className="grid grid-cols-12">
          {/* LEFT */}
          <div className="col-span-4 flex items-center gap-2">
            <IoIosMenu
              className={cn(
                "size-13 cursor-pointer sm:size-11",
                "click-scale transition-all hover:opacity-50",
                "text-gold-utility",
              )}
              onClick={activeHumberHandler}
            />

            {/* Desktop authentication */}
            {isLoading ? (
              <Skeleton
                className={cn(
                  "hidden h-10 w-16 rounded-md md:block",
                  "bg-gold-utility",
                )}
              />
            ) : isAuthenticated ? (
              <AppLink href="/profile">
                <Button
                  className={cn(
                    "hidden size-10 items-center justify-center p-0 md:flex",
                    "text-gold-utility hover:bg-white/35",
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
                    "hidden border px-4 py-2 font-semibold md:block",
                    "text-gold-utility hover:bg-white/35",
                  )}
                >
                  {t("login-button")}
                </Button>
              </AppLink>
            )}

            {/* Desktop language switcher */}
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
                aria-label="Loghanteh logo"
                className={cn(
                  "block h-[40px] w-[55px]",
                  "bg-[var(--gold-color)]",
                  "md:h-[50px] md:w-[70px]",
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
            {/* Visible only on desktop */}
            <ShopSearchDropdown variant="header" />

            <ShopCartDropdown />
          </div>
        </div>
      </Container>

      {/* Hamburger menu */}
      <HamburgerMenu
        activeHumber={activeHumber}
        UnActiveHumberHandler={UnActiveHumberHandler}
        t={t}
        isAuthenticated={isAuthenticated}
        isLoading={isLoading}
        navLinks={shopNavLinks}
        color="var(--blue-color)"
      >
        {/* Visible only on mobile/tablet */}
        <ShopSearchDropdown
          variant="menu"
          placement="top"
        />

        <LanguageSwitcher
          isScrolled={false}
          className="w-full"
          background="var(--blue-color)"
        />

        {!isLoading &&
          (isAuthenticated ? (
            <AppLink
              href="/profile"
              onClick={UnActiveHumberHandler}
              className="w-full"
            >
              <Button
                className={cn(
                  "flex w-full items-center justify-center gap-2",
                  "border px-4 py-3 font-semibold",
                  "text-black-utility hover:bg-black/5",
                )}
              >
                <FiUser className="size-5" />
                {t("profile")}
              </Button>
            </AppLink>
          ) : (
            <AppLink
              href="/login"
              onClick={UnActiveHumberHandler}
              className="w-full"
            >
              <Button
                className={cn(
                  "w-full border px-4 py-3 font-semibold",
                  "text-black-utility hover:bg-black/5",
                )}
              >
                {t("login-button")}
              </Button>
            </AppLink>
          ))}
      </HamburgerMenu>
    </header>
  );
}

export default ShopHeader;
