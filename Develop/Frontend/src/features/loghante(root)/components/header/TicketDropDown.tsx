"use client"
import AnimatePresenceWrapper from '@/components/animations/AnimatePresenceWrapper'
import Button from '@/components/ui/Button'
import { motion } from "framer-motion";
import { IoIosArrowDown } from 'react-icons/io'
import { tickets } from '@/data/tickets';
import AppLink from '@/components/ui/AppLink';
import useActive from '@/hooks/useActive';
import { cn } from '@/lib/utils/cn';
import { useRef } from 'react';
import useClickOutside from '@/hooks/useClickOutside';
import { dropdownVariants } from '@/lib/animations/variants';

function TicketDropDown() {

    //custom hooks
    const [
        activeTicketDripDown,
        activeHandler,
        UnActiveTicketDropDownHandler,
        toggleTicketDripDownHandler,
    ] = useActive(false)

    const dropDownRef =
        useRef<HTMLDivElement | null>(null)

    useClickOutside(
        dropDownRef,
        UnActiveTicketDropDownHandler,
    )


    return (
        <div className='relative' ref={dropDownRef}>
            <Button
                className={cn(
                    "py-3 fcc gap-2 ",
                    "font-semibold text-md",
                    "bg-crimson",
                    "hover:bg-[#42151A]",
                    activeTicketDripDown && "rounded-none border-b-1",
                )}
                onClick={toggleTicketDripDownHandler}
            >
                Reserve Ticket
                <IoIosArrowDown className="size-3" />
            </Button>
            <AnimatePresenceWrapper isActive={activeTicketDripDown}>
                <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className={cn(
                        "absolute w-full bg-crimson text-center fcol",
                        activeTicketDripDown && "rounded=b-md"
                    )}
                >
                    {tickets.map(t => (
                        <span
                            className="py-3 bg-hover-crimson transition-all"
                            key={t.id}
                            onClick={UnActiveTicketDropDownHandler}
                        >
                            <AppLink
                                href={`/${t.href}`}
                            >
                                {t.ticketType}
                            </AppLink>
                        </span>
                    ))}
                </motion.div>
            </AnimatePresenceWrapper>
        </div>
    )
}

export default TicketDropDown