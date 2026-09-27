"use client";

import {
    useRouter,
} from "next/navigation";

import {
    useLocale,
} from "next-intl";

import Button from "@/components/ui/Button";

import {
    cn,
} from "@/lib/utils/cn";

import type {
    SelectedSeat,
} from "./SeatsWrapper";

import {
    useHall,
} from "../../context/HallProvider";

import {
    useTicketPayment,
} from "@/features/loghante(root)/context/TicketPaymentContext";
import { removeFromLocalStorage } from "@/lib/utils/localStorage";

interface SelectedSeatsProps {
    seats: SelectedSeat[];
}

function SelectedSeats({
    seats,
}: SelectedSeatsProps) {

    const locale =
        useLocale();

    const router =
        useRouter();

    const {
        hallData,
        clearHallData,
    } = useHall();

    const {
        setPaymentData,
    } = useTicketPayment();

    const event =
        hallData?.eventData;

    const handleContinue = () => {

        if (!event) {
            return;
        }

        setPaymentData({
            type: "cinema-and-theater",

            ticket: {
                sessionId:
                    event.sessionId,

                eventId:
                    event.eventId,

                name:
                    event.title,

                startAt:
                    String(event.startAt),

                durationM:
                    event.duration,

                price:
                    event.price !== undefined
                        ? Number(event.price)
                        : null,
            },

            hall: {
                hallName:
                    "Loghanteh Grand Hall",

                seatsNumbs:
                    seats.map((seat) => ({
                        seatNum:
                            seat.seatNum,

                        row:
                            seat.row,
                    })),
            },

            quantity:
                seats.length,
        });
        
        router.push(
            `/${locale}/payment`,
        );
    };

    if (seats.length === 0) {
        return (
            <div
                className={cn(
                    "rounded-2xl",
                    "border",
                    "border-black-opacity",
                    "bg-white",
                    "p-6",
                    "text-center",
                )}
            >
                <p className="text-sm text-black-light-utility">
                    No seats selected yet.
                </p>
            </div>
        );
    }

    const groupedSeats =
        Object.groupBy(
            seats,
            (seat) => seat.row,
        );

    return (
        <div
            className={cn(
                "rounded-2xl",
                "border",
                "border-black-opacity",
                "bg-white",
                "p-6",
            )}
        >
            <div className="fbc mb-5 gap-4">

                <div className="fcol gap-1">

                    <h2 className="text-lg font-bold">
                        Selected Seats
                    </h2>

                    <span className="text-xs text-black-light-utility">
                        {seats.length} seats x{" "}
                        {event?.price ?? 0} Toman
                    </span>

                </div>

                <div
                    className="
                        size-10
                        fcc
                        rounded-xl
                        bg-crimson
                        font-bold
                        text-white
                    "
                >
                    {seats.length}
                </div>

            </div>

            <div
                className="
                    fcol
                    min-h-[30vh]
                    justify-between
                "
            >

                <div className="fcol gap-3">

                    {Object.entries(
                        groupedSeats,
                    ).map(
                        ([row, rowSeats]) => (
                            <div
                                key={row}
                                className="
                                    flex
                                    items-center
                                    gap-3
                                "
                            >

                                <span
                                    className="
                                        w-14
                                        shrink-0
                                        text-xs
                                        font-semibold
                                        text-black-light-utility
                                    "
                                >
                                    Row {row}
                                </span>

                                <div
                                    className="
                                        flex
                                        flex-wrap
                                        gap-2
                                    "
                                >
                                    {rowSeats?.map(
                                        (seat) => (
                                            <span
                                                key={
                                                    seat.seatNum
                                                }
                                                className="
                                                    fcc
                                                    h-9
                                                    min-w-9
                                                    rounded-lg
                                                    bg-[var(--crimson-opacity-color)]
                                                    px-2
                                                    text-sm
                                                    font-semibold
                                                    text-crimson
                                                "
                                            >
                                                {
                                                    seat.seatNum
                                                }
                                            </span>
                                        ),
                                    )}
                                </div>

                            </div>
                        ),
                    )}

                </div>

                <div className="mt-6">

                    <Button
                        type="button"
                        onClick={
                            handleContinue
                        }
                        className="
                            w-full
                            fbc
                            bg-crimson
                            py-3
                            text-sm
                            font-semibold
                            hover:bg-[var(--crimson-opacity-color)]
                            hover:text-crimson
                        "
                    >
                        <span>
                            Continue to Payment
                        </span>

                        {event?.price === 0 ? (
                            <span
                                className="
                                    font-semibold
                                    text-gold-utility
                                "
                            >
                                Free
                            </span>
                        ) : (
                            <span
                                className="
                                    fcol
                                    items-center
                                    gap-y-1
                                "
                            >
                                {(
                                    Number(
                                        event?.price ?? 0,
                                    ) *
                                    seats.length
                                ).toLocaleString()}

                                <span>
                                    Toman
                                </span>
                            </span>
                        )}

                    </Button>

                </div>

            </div>
        </div>
    );
}

export default SelectedSeats;