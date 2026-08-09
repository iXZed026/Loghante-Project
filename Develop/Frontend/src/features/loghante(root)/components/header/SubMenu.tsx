import AppLink from "@/components/ui/AppLink";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { INavLinks } from "../../data/navLinks";
import AnimatePresenceWrapper from "@/components/animations/AnimatePresenceWrapper";
import { openSlideMenu } from "@/lib/animations/variants";
import { RiArrowLeftSLine } from "react-icons/ri";

interface ISubMenu {
    link: INavLinks;
    UnActiveHumberHandler: () => void;
    activeSubMenu: boolean;
    UnActiveSubMenuHandler: () => void
}

function SubMenu({
    link,
    UnActiveHumberHandler,
    activeSubMenu,
    UnActiveSubMenuHandler,
}: ISubMenu

) {
    return (
        <AnimatePresenceWrapper isActive={activeSubMenu}>
            <div className="absolute md:left-full top-0 overflow-hidden">
                <motion.div
                    variants={openSlideMenu}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className={cn(
                        "h-[100vh] w-90",
                        " bg-white-utility",
                        "border-l-2 border-black/20",
                    )}>
                    <div className={cn(
                        "gap-0.5",
                        "py-4 px-5  mb-5",
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
                            <RiArrowLeftSLine className={cn(
                                "size-5",
                                "text-crimson"
                            )} />
                            back
                        </Button>
                    </div>
                    {link.museumParts?.map(part => (
                        <AppLink
                            href={part.href}
                            key={part.id}
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
                            {part.musesumName}
                        </AppLink>
                    ))}
                </motion.div>
            </div>
        </AnimatePresenceWrapper>
    )
}

export default SubMenu