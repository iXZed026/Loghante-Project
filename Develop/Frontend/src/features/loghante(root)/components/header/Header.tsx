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
import useScroll from "@/hooks/useScroll";
import { FiShoppingBag } from "react-icons/fi";


function Header() {

  const t = useTranslations("LoghantehHeader");
  const isScrolled = useScroll(150);


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
      "transition-all duration-300 ease-in-out",
      isScrolled && "bg-crimson "
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
                "hover:opacity-50",
                isScrolled && "text-gold-utility",
              )}
              onClick={activeHumberHandler}
            />
            {/* Login Button */}
            <AppLink
              href="/login"
            >
              <Button
                className={cn(
                  "md:block hidden",
                  "px-4 py-2",
                  "font-semibold",
                  "border-[1px]",
                  "hover:bg-white/35",
                  isScrolled && "text-gold-utility",
                )}
              >
                {
                  t("login-button")
                }
              </Button>
            </AppLink>
            {/* Select Language */}
            <LanguageSwitcher isScrolled={isScrolled} />
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
                className="brightness-0 invert text-gold-utility"
              />
            </AppLink>
          </div>
          <div className="col-span-4 fec gap-2">
            {/* Tickets DropDown */}
            <TicketDropDown t={t} isScrolled={isScrolled} />
            {/* Shop Button */}
            <AppLink
              href="/shop"
            >
              <Button
                className={cn(
                  "md:w-25 w-22",
                  "md:py-3 py-2 md:px-0  fcc gap-2",
                  "md:font-semibold",
                  "bg-crimson",
                  isScrolled ?
                    "hover:bg-[#936c23]" :
                    "hover:bg-[#42151A]",
                  isScrolled && "bg-gold-utility",
                )}
              >
                <FiShoppingBag className={cn(
                  "size-4",
                )} />
                Shop
              </Button>
            </AppLink>
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