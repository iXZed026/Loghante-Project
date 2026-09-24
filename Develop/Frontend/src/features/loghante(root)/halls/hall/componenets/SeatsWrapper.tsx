"use client";

import React from "react";

import SeatsBox from "./SeatsBox";

export interface HallSeat {
    seatNum: number;
    row: number;
}

export interface SelectedSeat {
    seatNum: number;
    row: number;
}

interface SeatsWrapperProps {
    seats: HallSeat[];
    selectedSeats: SelectedSeat[];
    onToggleSeat: (
        seat: SelectedSeat
    ) => void;
}

function SeatsWrapper({
    seats,
    selectedSeats,
    onToggleSeat,
}: SeatsWrapperProps) {
    const rows = Object.groupBy(
        seats,
        (seat) => seat.row
    );

    const isSeatSelected = (
        seatNum: number
    ) => {
        return selectedSeats.some(
            (seat) =>
                seat.seatNum === seatNum
        );
    };

    return (
        <div className="fcol gap-4">
            {Object.entries(rows).map(
                ([row, rowSeats]) => (
                    <div
                        key={row}
                        className="
                            flex
                            items-center
                            justify-center
                            gap-3
                        "
                    >
                        {/* Row Number */}
                        <div
                            className="
                                size-8
                                shrink-0
                                fcc
                                rounded-lg
                                bg-black
                                text-xs
                                font-semibold
                                text-white
                            "
                        >
                            {row}
                        </div>

                        {/* Seats */}
                        <div
                            className="
                                flex
                                justify-center
                                gap-3
                            "
                        >
                            {rowSeats?.map(
                                (seat) => (
                                    <SeatsBox
                                        key={
                                            seat.seatNum
                                        }
                                        seatNum={
                                            seat.seatNum
                                        }
                                        selected={isSeatSelected(
                                            seat.seatNum
                                        )}
                                        onClick={() =>
                                            onToggleSeat(
                                                seat
                                            )
                                        }
                                    />
                                )
                            )}
                        </div>
                    </div>
                )
            )}
        </div>
    );
}

export default SeatsWrapper;