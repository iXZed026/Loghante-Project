
import { cn } from "@/lib/utils/cn"
import { useLocale } from "next-intl"
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri"

function ArrowIcon() {


    function checkLanguage() {
        const locale = useLocale()
        if (locale === "fa") {
            return <RiArrowLeftSLine className={cn(
                "size-5",
                "text-crimson"
            )} />
        }

        return <RiArrowRightSLine className={cn(
            "size-5",
            "text-crimson"
        )} />
    }

    return checkLanguage()
}

export default ArrowIcon