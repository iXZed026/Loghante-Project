"use client"
import AnimatePresenceWrapper from '@/components/animations/AnimatePresenceWrapper'
import Button from '@/components/ui/Button'
import { motion } from "framer-motion";
import { IoIosArrowDown } from 'react-icons/io'
import { TicketdropdownVariants } from '../../animations/loghante.variants';
import { tickets } from '@/data/tickets';
import AppLink from '@/components/ui/AppLink';
import useActive from '@/hooks/useActive';
import { cn } from '@/lib/utils/cn';

function TicketDripDown() {

    //custom hooks
    const {
        active,
        activeHandler,
        UnActiveHandler,
        toggleHandler,
    } = useActive(false)


    return (
        <div className='relative'>
            <Button
                className={cn(
                    "bg-crimson py-2 fcc gap-2 font-semibold",
                    active && "rounded-none border-b-1",
                )}
                onClick={toggleHandler}
            >
                Reserve Ticket
                <IoIosArrowDown className="size-5" />
            </Button>
            <AnimatePresenceWrapper isActive={active}>
                <motion.div
                    variants={TicketdropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className={cn(
                        "absolute w-full bg-crimson text-center fcol",
                        active && "rounded=b-md"
                    )}
                >
                    {tickets.map(t => (
                        <span
                            className="py-3 bg-hover-crimson transition-all"
                            key={t.id}
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

export default TicketDripDown