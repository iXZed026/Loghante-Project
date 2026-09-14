"use client";

import Button from "@/components/ui/Button";

import { cn } from "@/lib/utils/cn";

import {
    MuseumTourSessionResponse,
} from "@/lib/api/ticket/museum-tour";

import {
    useLocale,
    useTranslations,
} from "next-intl";

import {
    useRouter,
} from "next/navigation";

import React, {
    useState,
} from "react";

import {
    useTicketPayment
}
    from "@/features/loghante(root)/context/TicketPaymentContext";

interface MuseumsTourTicketBoxProps {
    ticket: MuseumTourSessionResponse;
}

function MuseumsTourTicketBox({
    ticket,
}: MuseumsTourTicketBoxProps) {

    const ticketBoxT =
        useTranslations(
            "museumsTour.ticket-box"
        );

    const locale =
        useLocale();

    const router =
        useRouter();

    const {
        setPaymentData,
    } = useTicketPayment();

    const [
        ticketCount,
        setTicketCount,
    ] = useState<number>(0);

    const increaseHandler = () => {

        setTicketCount((prev) => {

            if (
                prev >= ticket.capacity
            ) {
                return prev;
            }

            return prev + 1;
        });
    };

    const decreaseHandler = () => {

        setTicketCount((prev) => {

            if (prev <= 0) {
                return prev;
            }

            return prev - 1;
        });
    };

    const bookTicketHandler = () => {

        if (ticketCount < 1) {
            return;
        }

        setPaymentData({
            ticket,
            quantity: ticketCount,
        });

        router.push(
            `/${locale}/payment`
        );
    };

    const startAt =
        new Date(ticket.startAt);

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
                "fcol gap-10",
                "p-8",
                "border-[1px] border-black-opacity",
                "rounded-xl",
                "shadow-xl",
                ticket.capacity === 0 && [
                    "bg-[var(--white-light-color)]",
                    "justify-center",
                ]
            )}
        >

            {/* Start Time */}
            <div className="text-center">

                <span className="text-xl font-bold">
                    {formattedTime}
                </span>

            </div>

            {/* Remaining Capacity */}
            <div
                className={cn(
                    ticket.capacity === 0 && "hidden"
                )}
            >

                <span className="text-lg font-semibold">
                    {ticketBoxT("capacity")}{" "}
                    {ticket.capacity}
                </span>

            </div>

            {/* Ticket Quantity */}
            <div
                className={cn(
                    "select-none",
                    ticket.capacity === 0 ? "hidden" : "fbc",

                )}
            >

                <div className="font-semibold">

                    <span>
                        {ticketBoxT("ticket-count")}
                    </span>

                </div>

                <div
                    className="fcc gap-2">

                    <div
                        className={cn(
                            "fcc",
                            "bg-gray-600/30",
                            "rounded-4xl",
                            "font-bold",

                        )}
                    >

                        <span
                            className={cn(
                                "text-xl",
                                "cursor-pointer",
                                "click-scale",
                                "px-3 py-1",

                                ticketCount >=
                                ticket.capacity &&
                                "opacity-40 cursor-not-allowed"
                            )}
                            onClick={
                                increaseHandler
                            }
                        >
                            +
                        </span>

                        <span>
                            |
                        </span>

                        <span
                            className={cn(
                                "text-xl",
                                "cursor-pointer",
                                "click-scale",
                                "px-3 py-1",

                                ticketCount <= 0 &&
                                "opacity-40 cursor-not-allowed"
                            )}
                            onClick={
                                decreaseHandler
                            }
                        >
                            -
                        </span>

                    </div>

                    <div
                        className={cn(
                            "bg-gray-600/30",
                            "px-2 py-1",
                            "rounded-4xl",
                            "font-bold"
                        )}
                    >
                        <span>
                            {ticketCount}
                        </span>
                    </div>

                </div>

            </div>
            {/* Capacity Completed */}
            <span
                className={cn(
                    "text-lg font-semibold text-crimson",
                    ticket.capacity > 0 ? "hidden" : "text-center",
                )}
            >
                Capacity completed.
            </span>

            {/* Book Button */}
            <div
                className={cn(
                    "gap-2",
                    ticket.capacity === 0 ? "hidden" : "fcc",
                )}
            >

                <Button
                    type="button"
                    disabled={
                        ticketCount === 0
                    }
                    onClick={
                        bookTicketHandler
                    }
                    className={cn(
                        "font-semibold",
                        "px-3 py-2",
                        "bg-crimson",
                        "hover:bg-[var(--crimson-hover-color)]",

                        ticketCount === 0 &&
                        "opacity-50 cursor-not-allowed"
                    )}
                >
                    {
                        ticketBoxT(
                            "book-button"
                        )
                    }
                </Button>

            </div>

        </div>
    );
}

export default MuseumsTourTicketBox;