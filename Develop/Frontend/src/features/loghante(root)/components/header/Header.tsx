import LanguageSwitcher from "@/components/shared/LanguageSwitcher";
import AppImage from "@/components/ui/AppImage";
import AppLink from "@/components/ui/AppLink";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";
import { IoIosMenu } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import TicketDropDown from "./TicketDropDown";
import Container from "@/components/shared/Container";

function Header() {
  return (
    <header className={cn(
      "bg-blue-300",
      "h-[80px]",
      "py-3",
      "text-white-utility text-sm",
      "border-2",
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
                Login
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
                alt="loghante"
                className="brightness-0 invert"
              />
            </AppLink>
          </div>

          <div className="col-span-4 fec gap-2">
            <TicketDropDown />
            <LanguageSwitcher />
          </div>

        </div>
      </Container>
    </header >
  )
}

export default Header