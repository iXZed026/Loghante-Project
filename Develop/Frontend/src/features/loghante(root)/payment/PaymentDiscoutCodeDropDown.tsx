"use client"

import AnimatePresenceWrapper from '@/components/animations/AnimatePresenceWrapper'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import useActive from '@/hooks/useActive'
import { cn } from '@/lib/utils/cn'
import { CiDiscount1 } from 'react-icons/ci'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { motion } from "framer-motion";
import { dropdownVariants } from '@/lib/animations/variants'
import { useRef } from 'react'
import useClickOutside from '@/hooks/useClickOutside'

function PaymentDiscoutCodeDropDown() {

    const [
        activeDD,
        ,
        unActiveDDHandler,
        toggleDDHandler,
    ] = useActive(false)

    const dropDownRef =
        useRef<HTMLDivElement | null>(null);

    useClickOutside(
        dropDownRef,
        unActiveDDHandler,

    );

    return (
        <div
            className="px-5 mb-15"
            ref={dropDownRef}
        >

            <Button
                type="button"
                className={cn(
                    "fbc w-full",
                    "py-4",
                    "rounded-md",
                    "text-black-utility",
                    "border-[1px] border-black-opacity",
                    "hover:bg-[var(--crimson-opacity-color)]"
                )}
                onClick={toggleDDHandler}
            >

                <div className="fcc gap-2">

                    <CiDiscount1 className="size-6" />

                    <span>
                        Do you have a discount code?
                    </span>

                </div>

                <MdKeyboardArrowDown className="size-7" />

            </Button>
            <AnimatePresenceWrapper isActive={activeDD}>
                <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className={cn(
                        "w-full",
                        "fbc gap-5",
                        "mt-3",
                    )}
                >
                    <Input
                        className={cn(
                            "w-full",
                            "rounded-lg",
                            "border-[1px] border-black-opacity",
                        )}
                        type="text"
                        placeholder="Enter your discount code"
                    />

                    <Button
                        type="button"
                        className={cn(
                            "shrink-0",
                            "text-lg",
                            "py-1 px-5",
                            "bg-crimson",
                            "hover:bg-[var(--crimson-opacity-color)]",
                        )}
                    >
                        Apply
                    </Button>
                </motion.div>
            </AnimatePresenceWrapper>
        </div>

    )
}

export default PaymentDiscoutCodeDropDown