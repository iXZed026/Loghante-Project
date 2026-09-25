"use client";

import React from "react";

import Button from "@/components/ui/Button";

import { cn } from "@/lib/utils/cn";

import type { SelectedSeat } from "./SeatsWrapper";
import { useHall } from "../../context/HallProvider";

interface SelectedSeatsProps {
    seats: SelectedSeat[];
}

function SelectedSeats({
    seats,
}: SelectedSeatsProps) {

    const event =
        useHall().hallData?.eventData

    const handleContinue = () => {
        // TODO:
        // Navigate to /payment
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
            (seat) => seat.row
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
                        {seats.length} seats x {event?.price} Toman
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

            <div className="fcol justify-between min-h-[30vh]">
                <div className="fcol gap-3">
                    {Object.entries(
                        groupedSeats
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
                                        )
                                    )}
                                </div>
                            </div>
                        )
                    )}
                </div>

                <div className="mt-6">
                    <Button
                        onClick={
                            handleContinue
                        }
                        className="
                        text-sm
                        w-full
                        font-semibold
                        bg-crimson
                        hover:bg-[var(--crimson-opacity-color)]
                        hover:text-crimson
                        py-3
                        fbc
                    "
                    >
                        Continue to Payment
                        {event?.price === 0 || null ? (
                            <span className="text-gold utility font-semibold">
                                Free
                            </span>
                        ) : (
                            <span className="fcol gap-y-1 items-center">
                                {(Number(event?.price)) * seats.length}
                                <span>Toman</span>
                            </span>
                        )}
                    </Button>
                </div>
            </div>
        </div >
    );
}

export default SelectedSeats;