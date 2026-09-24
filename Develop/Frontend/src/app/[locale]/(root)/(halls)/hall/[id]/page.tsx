"use client";

import React, {
    useEffect,
    useState,
} from "react";

import {
    useParams,
    useRouter,
} from "next/navigation";

import SeatsWrapper, {
    HallSeat,
    SelectedSeat,
} from "@/features/loghante(root)/halls/hall/componenets/SeatsWrapper";

import SelectedSeats from "@/features/loghante(root)/halls/hall/componenets/SelectedSeats";

import HallGuard from "@/features/loghante(root)/halls/componenets/HallGuard";

import {
    HallProvider,
    useHall,
} from "@/features/loghante(root)/halls/context/HallProvider";

import { halls } from "@/features/loghante(root)/halls/data/halls";

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
        <div className="min-h-screen py-30">
            <div className="mx-auto w-full max-w-7xl px-5">
                <div className="grid grid-cols-12 gap-10">
                    <div className="col-span-12 lg:col-span-8">
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

                    <div className="col-span-12 lg:col-span-4">
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

function HallPage() {
    const params = useParams();
    const router = useRouter();

    const { setHallData } =
        useHall();

    const [hall, setHall] =
        useState<(typeof halls)[number] | null>(
            null
        );

    useEffect(() => {
        const hallId = Number(
            params.id
        );

        if (Number.isNaN(hallId)) {
            router.back();
            return;
        }

        const foundHall = halls.find(
            (item) =>
                item.id === hallId
        );

        if (!foundHall) {
            router.back();
            return;
        }

        setHall(foundHall);

        // فقط اطلاعات مربوط به Hall
        // داخل Context قرار می‌گیرد.
        // seats از Context استفاده نمی‌کند.
        setHallData({
            hallId: foundHall.id,

            boxData: {
                title:
                    foundHall.hallName.en,

                description: "",

                imageURL: "",
            },
        });
    }, [
        params.id,
        router,
        setHallData,
    ]);

    if (!hall) {
        return null;
    }

    return (
        <HallGuard ready={hall !== null}>
            <HallContent
                seats={hall.seats}
            />
        </HallGuard>
    );
}

function HallPageWithProvider() {
    return (
        <HallProvider>
            <HallPage />
        </HallProvider>
    );
}

export default HallPageWithProvider;