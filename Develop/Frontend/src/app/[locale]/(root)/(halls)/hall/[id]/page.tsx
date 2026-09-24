"use client";

import React, {
    useState,
} from "react";

import SeatsWrapper, {
    SelectedSeat,
} from "@/features/loghante(root)/halls/hall/componenets/SeatsWrapper";

import SelectedSeats from "@/features/loghante(root)/halls/hall/componenets/SelectedSeats";

function HallPage() {

    const [
        selectedSeats,
        setSelectedSeats,
    ] = useState<SelectedSeat[]>([]);

    const toggleSeat = (
        seat: SelectedSeat
    ) => {

        setSelectedSeats(
            (currentSeats) => {

                const isSelected =
                    currentSeats.some(
                        (selectedSeat) =>
                            selectedSeat.seatNum ===
                            seat.seatNum
                    );

                if (isSelected) {
                    return currentSeats.filter(
                        (selectedSeat) =>
                            selectedSeat.seatNum !==
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
        <div
            className="
                min-h-screen
                py-30
            "
        >

            <div
                className="
                    mx-auto
                    w-full
                    max-w-7xl
                    px-5
                "
            >

                <div
                    className="
                        grid
                        grid-cols-12
                        gap-10
                    "
                >

                    {/* Hall */}
                    <div
                        className="
                            col-span-12
                            lg:col-span-8
                        "
                    >

                        <SeatsWrapper
                            selectedSeats={
                                selectedSeats
                            }
                            onToggleSeat={
                                toggleSeat
                            }
                        />

                    </div>

                    {/* Selected Seats */}
                    <div
                        className="
                            col-span-12
                            lg:col-span-4
                        "
                    >

                        <SelectedSeats
                            seats={
                                selectedSeats
                            }
                        />

                    </div>

                </div>

            </div>

        </div>
    );
}

export default HallPage;