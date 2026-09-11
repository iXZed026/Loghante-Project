import AppLink from "@/components/ui/AppLink";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { INavLink } from "../../data/navLinks";
import AnimatePresenceWrapper from "@/components/animations/AnimatePresenceWrapper";
import { openSlideMenu, openSlideMenuFa } from "@/lib/animations/variants";
import { RiArrowLeftSLine } from "react-icons/ri";
import { getLocalizedValue } from "@/lib/utils/getLocalizedValue";
import { useLocale } from "next-intl";
import { TranslationFunction } from "@/types/translations";
import ArrowIcon from "@/components/shared/ArrowIcon";

interface ISubMenu {
    link: INavLink;
    UnActiveHumberHandler: () => void;
    activeSubMenu: boolean;
    UnActiveSubMenuHandler: () => void
    t: TranslationFunction
}

function SubMenu({
    link,
    UnActiveHumberHandler,
    activeSubMenu,
    UnActiveSubMenuHandler,
    t,
}: ISubMenu
) {

    const locale = useLocale()
    const isFa = locale === "fa";

    return (
        <AnimatePresenceWrapper isActive={activeSubMenu}>
            <div
                className={cn(
                    "absolute top-0 overflow-hidden w-full",
                    isFa ? "md:right-full" : "md:left-full"
                )}
            >
                <motion.div
                    variants={
                        isFa ?
                            openSlideMenuFa :
                            openSlideMenu
                    }
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className={cn(
                        "h-[100vh] sm:w-140 border-2",
                        " bg-white-utility",
                        "border-l-2 border-black/20",
                    )}>
                    <div className={cn(
                        "gap-1",
                        "py-4 px-7  mb-5",
                        "border-b-2 border-[var(--crimson-color)]",
                    )}
                    >
                        <Button
                            className={cn(
                                "flex items-center",
                                "text-black-utility",
                                "p-0",
                                "hover:opacity-utility",
                                "hover:opacity-50",
                            )}
                            onClick={UnActiveSubMenuHandler}
                        >
                            <ArrowIcon direction="left" />
                            {
                                t("back-button")
                            }
                        </Button>
                    </div>
                    {link.museumParts?.map(part => (
                        <AppLink
                            href={part.href}
                            key={part.id}
                            className={cn(
                                "w-full",
                                "block",
                                "px-7",
                                "py-6",
                                "border-b border-b-black/25",
                                "hover:bg-[var(--white-light-color)]",
                                "transition-all",
                                "rounded-md",
                                "click-scale",
                            )}
                            onClick={UnActiveHumberHandler}
                        >
                            {getLocalizedValue(part.name, locale)}
                        </AppLink>
                    ))}
                </motion.div>
            </div>
        </AnimatePresenceWrapper>
    )
}

export default SubMenu