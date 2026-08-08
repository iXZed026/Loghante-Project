import LanguageSwitcher from "@/components/shared/LanguageSwitcher";
import AppImage from "@/components/ui/AppImage";
import AppLink from "@/components/ui/AppLink";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";
import { IoIosMenu } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import TicketDripDown from "./TicketDripDown";

function Header() {
  return (
    <header className="py-3 h-[80px] border-2 text-white-utility bg-blue-300">
      <div className="grid grid-cols-12">

        <div className="flex col-span-4 gap-2">
          <IoIosMenu className="size-13" />
          <AppLink
            href="/login"
          >
            <Button
              className={cn(
                "px-3 py-2.5",
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
            />
          </AppLink>
        </div>

        <div className="col-span-4 fec gap-2">
          <TicketDripDown />
          <LanguageSwitcher />
        </div>

      </div>
    </header >
  )
}

export default Header