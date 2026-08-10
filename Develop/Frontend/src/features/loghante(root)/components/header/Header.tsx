"use client"
import LanguageSwitcher from "@/components/shared/LanguageSwitcher";
import AppImage from "@/components/ui/AppImage";
import AppLink from "@/components/ui/AppLink";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";
import { IoIosMenu } from "react-icons/io";
import TicketDropDown from "./TicketDropDown";
import Container from "@/components/shared/Container";
import HamburgerMenu from "./HamburgerMenu";
import useActive from "@/hooks/useActive";
import { useTranslations } from 'next-intl';


function Header() {

  const t = useTranslations("header");


  const [
    activeHumber,
    activeHumberHandler,
    UnActiveHumberHandler,
    toggleHumberHandler,
  ] = useActive(false)

  return (
    <header className={cn(
      "h-[80px]",
      "py-3 mb-[80px]",
      "z-30",
      "text-white-utility md:text-md sm:text-sm text-xs",
      "fixed w-full top-0 ",
    )}>
      <Container>
        <div className="grid grid-cols-12">

          <div className="flex items-center col-span-4 gap-2">
            <IoIosMenu
              className={cn(
                "size-11",
                "cursor-pointer",
                "click-scale",
                "transition-all",
                "hover:opacity-50"
              )}
              onClick={activeHumberHandler}
            />
            <AppLink
              href="/login"
            >
              <Button
                className={cn(
                  "px-4 py-2",
                  "font-semibold",
                  "border-[1px]",
                  "hover:bg-white/35",
                )}
              >
                {
                  t("login-button")
                }
              </Button>
            </AppLink>
          </div>

          <div className="col-span-4 fcc">
            <AppLink
              href="/"
            >
              <AppImage
                width={70}
                height={50}
                priority={true}
                src="/images/Loghanteh-logo.svg"
                alt="loghanteh icon"
                className="brightness-0 invert"
              />
            </AppLink>
          </div>

          <div className="col-span-4 fec gap-2">
            <TicketDropDown t={t} />
            <LanguageSwitcher />
          </div>

        </div>
      </Container>

      {/* HUMBURGER MENU */}
      <HamburgerMenu
        activeHumber={activeHumber}
        UnActiveHumberHandler={UnActiveHumberHandler}
        t={t}
      />
    </header >
  )
}

export default Header