import AnimatePresenceWrapper from '@/components/animations/AnimatePresenceWrapper'
import { cn } from '@/lib/utils/cn'
import { motion } from "framer-motion";
import { openSlideMenu, openSlideMenuFa } from '@/lib/animations/variants';
import useClickOutside from '@/hooks/useClickOutside';
import { useRef } from 'react';
import NavLinks from './NavLinks';
import { IoMdClose } from "react-icons/io";
import Button from '@/components/ui/Button';
import { TranslationFunction } from '@/types/translations';
import { useLocale } from 'next-intl';

interface IHamburgerMenuProps {
    activeHumber: boolean
    UnActiveHumberHandler: () => void
    t: TranslationFunction;

}

function HamburgerMenu({
    activeHumber,
    UnActiveHumberHandler,
    t
}: IHamburgerMenuProps) {

    const divElem =
        useRef<HTMLDivElement | null>(null)

    useClickOutside(
        divElem,
        UnActiveHumberHandler
    )

    const locale = useLocale()

    return (
        <AnimatePresenceWrapper isActive={activeHumber}>
            {/* BLACK BACKGROUND */}
            <div
                className={cn(
                    "w-full h-[100vh]",
                    "bg-black/70",
                    "text-black-utility md:text-md text-sm",
                    "fixed left-0  top-0",
                    "z-40",
                )}
            >
                {/* SLIDEBAR(HUMBURGER MENY) */}
                <motion.div
                    variants={
                        locale !== "fa" ?
                            openSlideMenu :
                            openSlideMenuFa
                    }
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className={cn(
                        "w-90 h-[100vh]",
                        "bg-white-utility",
                        "fixed top-0",
                        locale === "fa" ? "right-0" : "left-0",
                        "shadow-lg",
                        "z-50",
                    )}
                    ref={divElem}
                >
                    <div className={cn(
                        "gap-1",
                        "py-4 px-2  mb-5",
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
                            onClick={UnActiveHumberHandler}
                        >
                            {
                                t("close-button")
                            }
                            <IoMdClose className={cn(
                                "size-5",
                                "text-crimson"
                            )} />
                        </Button>
                    </div>
                    <div>
                        <NavLinks
                            UnActiveHumberHandler={UnActiveHumberHandler}
                            t={t}
                        />
                    </div>
                </motion.div>

            </div>
        </AnimatePresenceWrapper >
    )
}

export default HamburgerMenu