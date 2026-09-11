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
        >
            <Button
                className={cn(
                    "md:w-40 w-full",
                    "py-3 flex justify-center items-center gap-2 ",
                    "md:font-semibold",
                    "bg-crimson",
                    isScrolled ?
                        "hover:bg-[#936c23]" :
                        "hover:bg-[#42151A]",
                    isScrolled && "bg-gold-utility",
                    activeTicketDripDown && "rounded-none border-b-2",
                )}
                onClick={toggleTicketDripDownHandler}
            >
                {t?.("ticket-button") ?? "Tickets"}
                <IoIosArrowDown className={cn(
                    "size-3 transition-transform duration-300",
                    activeTicketDripDown && "rotate-180"
                )} />
            </Button>

            <AnimatePresenceWrapper isActive={activeTicketDripDown}>
                <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className={cn(
                        "absolute w-full bg-crimson text-center fcol overflow-hidden",
                        activeTicketDripDown && "rounded-b-md",
                        isScrolled && "bg-gold-utility",
                    )}
                >
                    {tickets.map((ticket) => (
                        <AppLink
                            key={ticket.id}
                            href={`/${ticket.href}`}
                            className={cn(
                                "block w-full py-3 px-2",
                                "transition-all",
                                isScrolled ?
                                    "hover:bg-[#936c23]/50" :
                                    "hover:bg-[#42151A]/50",
                            )}
                            onClick={UnActiveTicketDropDownHandler}
                        >
                            {getLocalizedValue(
                                ticket.ticketType,
                                locale,
                            )}
                        </AppLink>
                    ))}
                </motion.div>
            </AnimatePresenceWrapper>
        </div>
    );
}

export default TicketDropDown;