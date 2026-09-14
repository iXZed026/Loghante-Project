"use client";

import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils/cn'
import {
    useLocale,
    useTranslations
} from 'next-intl';

import {
    FaRegCalendarAlt
} from 'react-icons/fa';

import {
    FaLocationDot,
    FaRegClock
} from 'react-icons/fa6';

import { ticketRules } from '../data/ticketRules';

import {
    getLocalizedValue
} from '@/lib/utils/getLocalizedValue';

import {
    useTicketPayment
} from '../../context/TicketPaymentContext';
import AppLink from '@/components/ui/AppLink';

function PaymentTicketInfo() {

    const paymentTicketInfoT =
        useTranslations(
            "payment.ticket-info"
        );

    const locale =
        useLocale();

    const {
        paymentData,
    } = useTicketPayment();

    if (!paymentData) {
        return null;
    }

    const {
        ticket,
        quantity,
    } = paymentData;

    const startAt =
        new Date(ticket.startAt);

    const formattedDate =
        startAt.toLocaleDateString(
            locale === "fa"
                ? "fa-IR"
                : "en-US",
            {
                weekday: "long",
                month: "long",
                day: "numeric",
            }
        );

    const formattedTime =
        startAt.toLocaleTimeString(
            locale === "fa"
                ? "fa-IR"
                : "en-GB",
            {
                hour: "2-digit",
                minute: "2-digit",
            }
        );

    return (
        <div
            className={cn(
                "lg:col-span-6 col-span-12",
                "md:p-10 p-7",
                "border-[1px] border-black-opacity",
                "rounded-xl",
                "md:text-base text-sm",
            )}
        >

            {/* Ticket Date Details */}
            <div className='fbc'>

                <div
                    className='fcol items-start gap-5 text-black-light-utility'
                >

                    <span className='fcc gap-2'>

                        <FaRegCalendarAlt
                            className='text-crimson'
                        />

                        <span>
                            {formattedDate}
                        </span>

                    </span>

                    <span className='fcc gap-2'>

                        <FaRegClock
                            className='text-crimson'
                        />

                        <span>
                            {formattedTime}
                        </span>

                    </span>

                </div>

                <div>

                    <AppLink
                        href='/museums-tour'
                        className={cn(
                            "text-crimson font-semibold",
                            "hover:text-[var(--crimson-opacity-color)]",
                            "click-scale",
                        )}
                    >
                        {
                            paymentTicketInfoT(
                                "ticket-date.change-button"
                            )
                        }
                    </AppLink>

                </div>

            </div>

            <div
                className='w-full h-[0.5px] bg-black-light-utility my-10'
            />

            {/* Ticket Type Details */}
            <div
                className={cn(
                    "fcol items-start gap-5",
                )}
            >

                <div>

                    <span className='md:text-xl text-lg font-bold'>
                        {
                            ticket.name ||
                            "Loghanteh Museum Tour"
                        }
                    </span>

                </div>

                <div className='flex gap-2'>

                    <span>
                        <FaLocationDot
                            className='text-crimson'
                        />
                    </span>

                    <span>
                        Tehran - Shahid Ghodousi
                    </span>

                </div>

                <div>

                    <span>
                        {quantity} ticket
                        {quantity > 1 ? "s" : ""}
                    </span>

                </div>

            </div>

            <div
                className='w-full h-[0.5px] bg-black-light-utility my-10'
            />

            {/* Tickets Rules */}
            <div>

                <div>

                    <span className='md:text-xl text-lg'>
                        {
                            paymentTicketInfoT(
                                "rules.title"
                            )
                        }
                    </span>

                </div>

                <div>

                    <ul
                        className='fcol gap-10 pl-5 py-5 list-disc leading-9 text-black-light-utility'
                    >

                        {
                            ticketRules.map(
                                rule => (

                                    <li
                                        key={rule.id}
                                    >
                                        {
                                            getLocalizedValue(
                                                rule.rulesText,
                                                locale
                                            )
                                        }
                                    </li>

                                )
                            )
                        }

                    </ul>

                </div>

            </div>

        </div>
    )
}

export default PaymentTicketInfo