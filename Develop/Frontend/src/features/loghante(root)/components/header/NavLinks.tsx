
"use client";

import { useEffect, useState } from "react";
import AppLink from "@/components/ui/AppLink";
import Button from "@/components/ui/Button";
import ArrowIcon from "@/components/shared/ArrowIcon";
import SubMenu, { type INavMenuLink } from "./SubMenu";

import { cn } from "@/lib/utils/cn";
import { getLocalizedValue } from "@/lib/utils/getLocalizedValue";
import { useLocale } from "next-intl";

import type { TranslationFunction } from "@/types/translations";
import type { INavLink } from "../../data/navLinks";
import type { IShopNavLink } from "@/features/shop/data/shoNavLinks";

interface INavLinksProps {
  UnActiveHumberHandler: () => void;
  t: TranslationFunction;
  navLinks: (INavLink | IShopNavLink)[];
  color?: string;
  hasChildren?: boolean;
  onActiveSub: (active: boolean) => void;
}

const navItemClass = cn(
  "w-full",
  "font-wulkan font-bold",
  "px-4 md:px-7",
  "py-5",
  "border-b border-b-black/25",
  "hover:bg-[var(--white-light-color)]",
  "transition-all",
  "rounded-md",
  "text-black-utility md:text-xl text-lg italic",
);

function NavLinks({
  UnActiveHumberHandler,
  t,
  navLinks,
  color = "var(--crimson-color)",
  onActiveSub,
}: INavLinksProps) {
  const locale = useLocale();

  const [activeSubMenuId, setActiveSubMenuId] = useState<number | null>(null);

  const closeSubMenu = () => setActiveSubMenuId(null);

  useEffect(() => {
    onActiveSub(activeSubMenuId !== null);
  }, [activeSubMenuId, onActiveSub]);

  return (
    <nav>
      <ul>
        {navLinks.map((link) => {
          const menuLink = link as INavMenuLink;

          const hasSubMenu = Boolean(
            menuLink.museumParts?.length ||
              menuLink.productCategories?.length,
          );

          const isSubMenuActive = activeSubMenuId === link.id;

          return (
            <li key={link.id}>
              {hasSubMenu ? (
                <>
                  <Button
                    type="button"
                    aria-expanded={isSubMenuActive}
                    className={cn(
                      navItemClass,
                      "flex items-center justify-between",
                    )}
                    onClick={() =>
                      setActiveSubMenuId((current) =>
                        current === link.id ? null : link.id,
                      )
                    }
                  >
                    {getLocalizedValue(link.name, locale)}
                    <ArrowIcon />
                  </Button>

                  <SubMenu
                    link={menuLink}
                    UnActiveHumberHandler={UnActiveHumberHandler}
                    activeSubMenu={isSubMenuActive}
                    UnActiveSubMenuHandler={closeSubMenu}
                    t={t}
                    color={color}
                  />
                </>
              ) : (
                <AppLink
                  href={link.path}
                  scroll
                  className={cn(navItemClass, "block", "click-scale")}
                  onClick={UnActiveHumberHandler}
                >
                  {getLocalizedValue(link.name, locale)}
                </AppLink>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default NavLinks;
