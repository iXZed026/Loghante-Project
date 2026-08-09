import AppLink from "@/components/ui/AppLink";
import { cn } from "@/lib/utils/cn";
import { navLinks } from "../../data/navLinks";
import { RiArrowRightSLine } from "react-icons/ri";
import Button from "@/components/ui/Button";
import SubMenu from "./SubMenu";
import useActive from "@/hooks/useActive";

interface INavLinksProps {
    UnActiveHumberHandler: () => void;
}

function NavLinks({
    UnActiveHumberHandler,
}: INavLinksProps) {

    const [
        activeSubMenu,
        activeSubMenuHandler,
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
                                    "px-3",
                                    "py-3",
                                    "border-b border-b-black/25",
                                    "hover:bg-[var(--white-light-color)]",
                                    "transition-all",
                                    "text-black-utility",
                                    "rounded-md",
                                )}
                                onClick={toggleSubMenuHandler}
                            >
                                {link.name}
                                <RiArrowRightSLine className="size-5" />
                            </Button>
                            {/* SUB MENU */}
                            <SubMenu
                                link={link}
                                UnActiveHumberHandler={UnActiveHumberHandler}
                                activeSubMenu={activeSubMenu}
                                UnActiveSubMenuHandler={UnActiveSubMenuHandler}
                            />
                        </li>
                    ) : (
                        <li key={link.id}>
                            <AppLink
                                href={link.path}
                                className={cn(
                                    "w-full",
                                    "block",
                                    "px-3",
                                    "py-3",
                                    "border-b border-b-black/25",
                                    "hover:bg-[var(--white-light-color)]",
                                    "transition-all",
                                    "rounded-md",
                                    "click-scale",
                                )}
                                onClick={UnActiveHumberHandler}
                            >
                                {link.name}
                            </AppLink>
                        </li>
                    )
                ))}
            </ul>
        </nav>
    );
}

export default NavLinks;