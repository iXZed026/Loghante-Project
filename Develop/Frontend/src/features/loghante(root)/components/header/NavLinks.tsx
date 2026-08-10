import AppLink from "@/components/ui/AppLink";
import { cn } from "@/lib/utils/cn";
import { navLinks } from "../../data/navLinks";
import { RiArrowRightSLine } from "react-icons/ri";
import Button from "@/components/ui/Button";
import SubMenu from "./SubMenu";
import useActive from "@/hooks/useActive";
import { getLocalizedValue } from "@/lib/utils/getLocalizedValue";
import { useLocale } from "next-intl";
import { TranslationFunction } from "@/types/translations";
import ArrowIcon from "@/components/shared/ArrowIcon";

interface INavLinksProps {
    UnActiveHumberHandler: () => void;
    t: TranslationFunction;
}

function NavLinks({
    UnActiveHumberHandler,
    t
}: INavLinksProps) {

    const locale = useLocale()

    const [
        activeSubMenu,
        ,
        UnActiveSubMenuHandler,
        toggleSubMenuHandler,
    ] = useActive(false)

    return (
        <nav>
            <ul>
                {navLinks.map((link) => (
                    link.museumParts ? (
                        <li key={link.id}>
                            <Button
                                className={cn(
                                    "w-full",
                                    "fbc relative",
                                    "px-7",
                                    "py-3",
                                    "border-b border-b-black/25",
                                    "hover:bg-[var(--white-light-color)]",
                                    "transition-all",
                                    "text-black-utility",
                                    "rounded-md",
                                )}
                                onClick={toggleSubMenuHandler}
                            >
                                {getLocalizedValue(link.name, locale)}
                                <ArrowIcon />
                            </Button>
                            {/* SUB MENU */}
                            <SubMenu
                                link={link}
                                UnActiveHumberHandler={UnActiveHumberHandler}
                                activeSubMenu={activeSubMenu}
                                UnActiveSubMenuHandler={UnActiveSubMenuHandler}
                                t={t}
                            />
                        </li>
                    ) : (
                        <li key={link.id}>
                            <AppLink
                                href={link.path}
                                className={cn(
                                    "w-full",
                                    "block",
                                    "px-7",
                                    "py-5",
                                    "border-b border-b-black/25",
                                    "hover:bg-[var(--white-light-color)]",
                                    "transition-all",
                                    "rounded-md",
                                    "click-scale",
                                )}
                                onClick={UnActiveHumberHandler}
                            >
                                {getLocalizedValue(link.name, locale)}
                            </AppLink>
                        </li>
                    )
                ))}
            </ul>
        </nav>
    );
}

export default NavLinks;