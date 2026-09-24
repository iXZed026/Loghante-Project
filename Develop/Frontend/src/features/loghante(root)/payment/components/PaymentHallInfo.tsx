"use client";

import { cn } from "@/lib/utils/cn";
import { useTranslations } from "next-intl";
import {
    FaChair,
    FaLocationDot,
} from "react-icons/fa6";

import {
    useTicketPayment,
} from "../../context/TicketPaymentContext";

function PaymentHallInfo() {

    const hallT =
        useTranslations(
            "payment.ticket-info.hall"
        );

    const {
        paymentData,
    } = useTicketPayment();

    const hall =
        paymentData?.hall;

    if (!hall) {
        return null;
    }

    return (
        <div
            className={cn(
                "rounded-xl",
                "border border-black-opacity",
                "bg-[var(--crimson-opacity-color)]",
                "p-5",
                "fcol gap-5",
            )}
        >

            {/* Hall */}
            <div className="fcol gap-2">

                <span
                    className={cn(
                        "text-xs",
                        "text-black-light-utility",
                    )}
                >
                    {
                        hallT("title")
                    }
                </span>

                <div
                    className="fcc gap-2"
                >

                    <FaLocationDot
                        className="text-crimson"
                    />

                    <span
                        className="font-semibold"
                    >
                        {
                            hall.hallName
                        }
                    </span>

                </div>

            </div>

            {/* Seats */}
            <div className="fcol gap-2">

                <span
                    className={cn(
                        "text-xs",
                        "text-black-light-utility",
                    )}
                >
                    {
                        hallT("seats")
                    }
                </span>

                <div
                    className={cn(
                        "flex flex-wrap",
                        "gap-2",
                    )}
                >

                    {
                        hall.seatsNumbs.map(
                            (seatNumber) => (
                                <div
                                    key={seatNumber}
                                    className={cn(
                                        "fcc",
                                        "size-9",
                                        "rounded-lg",
                                        "bg-crimson",
                                        "text-sm",
                                        "font-bold",
                                        "text-white",
                                        "shadow-sm",
                                    )}
                                >
                                    <FaChair
                                        className="size-3"
                                    />

                                    <span>
                                        {
                                            seatNumber
                                        }
                                    </span>

                                </div>
                            )
                        )
                    }

                </div>

            </div>

        </div>
    );
}

export default PaymentHallInfo;