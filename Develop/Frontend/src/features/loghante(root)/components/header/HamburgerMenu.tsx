import AnimatePresenceWrapper from '@/components/animations/AnimatePresenceWrapper'
import { cn } from '@/lib/utils/cn'
import { motion } from "framer-motion";
import { openSlideMenu } from '@/lib/animations/variants';
import useClickOutside from '@/hooks/useClickOutside';
import { useRef } from 'react';
import NavLinks from './NavLinks';
import { IoMdClose } from "react-icons/io";
import Button from '@/components/ui/Button';
import { MdOpacity } from 'react-icons/md';

interface IHamburgerMenuProps {
    activeHumber: boolean
    UnActiveHumberHandler: () => void
}

function HamburgerMenu({
    activeHumber,
    UnActiveHumberHandler,
}: IHamburgerMenuProps) {

    const divElem =
        useRef<HTMLDivElement | null>(null)

    useClickOutside(
        divElem,
        UnActiveHumberHandler
    )

    return (
        <AnimatePresenceWrapper isActive={activeHumber}>
            {/* BLACK BACKGROUND */}
            <div
                className={cn(
                    "w-full h-[100vh]",
                    "bg-black/70",
                    "text-black-utility",
                    "fixed left-0 top-0",
                    "z-40",
                )}
            >
                {/* SLIDEBAR(HUMBURGER MENY) */}
                <motion.div
                    variants={openSlideMenu}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className={cn(
                        "w-90 h-[100vh]",
                        "bg-white-utility",
                        "fixed left-0 top-0",
                        "shadow-lg",
                        "rounded-r-lg",
                        "z-50",
                    )}
                    ref={divElem}
                >
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
                            onClick={UnActiveHumberHandler}
                        >
                            close
                            <IoMdClose className={cn(
                                "size-5",
                                "text-crimson"
                            )} />
                        </Button>
                    </div>
                    <div>
                        <NavLinks UnActiveHumberHandler={UnActiveHumberHandler} />
                    </div>
                </motion.div>

            </div>
        </AnimatePresenceWrapper >
    )
}

export default HamburgerMenu