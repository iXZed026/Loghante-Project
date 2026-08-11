"use client";

import AnimatePresenceWrapper from "@/components/animations/AnimatePresenceWrapper";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import { tickets } from "@/data/tickets";
import AppLink from "@/components/ui/AppLink";
import useActive from "@/hooks/useActive";
import { cn } from "@/lib/utils/cn";
import { useRef } from "react";
import useClickOutside from "@/hooks/useClickOutside";
import { dropdownVariants } from "@/lib/animations/variants";
import { useLocale } from "next-intl";
import { getLocalizedValue } from "@/lib/utils/getLocalizedValue";
import { TranslationFunction } from "@/types/translations";

interface ITicketDropDown {
    t?: TranslationFunction;
    isScrolled?: Boolean
}

function TicketDropDown(
    {
        t,
        isScrolled,
    }
        : ITicketDropDown
) {
    const [
        activeTicketDripDown,
        ,
        UnActiveTicketDropDownHandler,
        toggleTicketDripDownHandler,
    ] = useActive(false);

    const locale = useLocale();

    const dropDownRef = useRef<HTMLDivElement | null>(null);

    useClickOutside(dropDownRef, UnActiveTicketDropDownHandler);

    return (
        <div
            className="relative" ref={dropDownRef}
            onClick={toggleTicketDripDownHandler}
        >
            <Button
                className={cn(
                    "md:w-40 w-30",
                    "md:py-3 py-1 fcc gap-2",
                    "md:font-semibold",
                    "bg-crimson",
                    isScrolled ?
                        "hover:bg-[#936c23]" :
                        "hover:bg-[#42151A]",
                    isScrolled && "bg-gold-utility",
                    activeTicketDripDown && "rounded-none border-b-1",
                )}
            >
                {t?.("ticket-button") ?? "Tickets"}
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
                        activeTicketDripDown && "rounded-b-md",
                        isScrolled && "bg-gold-utility",
                    )}
                >
                    {tickets.map((ticket) => (
                        <span
                            className={cn(
                                "py-3 px-2",
                                "transition-all",
                                isScrolled ?
                                    "bg-hover-gold" :
                                    "bg-hover-crimson",
                            )}
                            key={ticket.id}
                            onClick={UnActiveTicketDropDownHandler}
                        >
                            <AppLink href={`/${ticket.href}`}>
                                {getLocalizedValue(
                                    ticket.ticketType,
                                    locale,
                                )}
                            </AppLink>
                        </span>
                    ))}
                </motion.div>
            </AnimatePresenceWrapper>
        </div>
    );
}

export default TicketDropDown;