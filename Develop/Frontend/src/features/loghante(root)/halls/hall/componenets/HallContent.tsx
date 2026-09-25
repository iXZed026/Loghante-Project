"use client";

import React, {
    useState,
} from "react";

import SeatsWrapper, {
    HallSeat,
    SelectedSeat,
} from "./SeatsWrapper";

import SelectedSeats from "./SelectedSeats";

interface HallContentProps {
    seats: HallSeat[];
}

function HallContent({
    seats,
}: HallContentProps) {
    const [
        selectedSeats,
        setSelectedSeats,
    ] = useState<SelectedSeat[]>([]);

    const toggleSeat = (
        seat: SelectedSeat
    ) => {
        setSelectedSeats(
            (currentSeats) => {
                const exists =
                    currentSeats.some(
                        (item) =>
                            item.seatNum ===
                            seat.seatNum
                    );

                if (exists) {
                    return currentSeats.filter(
                        (item) =>
                            item.seatNum !==
                            seat.seatNum
                    );
                }

                return [
                    ...currentSeats,
                    seat,
                ];
            }
        );
    };

    return (
        <div className="grid grid-cols-12 gap-10">

            <div className="col-span-12 lg:col-span-4 lg:order-1">
                <SelectedSeats
                    seats={selectedSeats}
                />
            </div>
            

            <div className="col-span-12 lg:col-span-8 lg:order-2">
                <SeatsWrapper
                    seats={seats}
                    selectedSeats={
                        selectedSeats
                    }
                    onToggleSeat={
                        toggleSeat
                    }
                />
            </div>

        </div>
    );
}

export default HallContent;