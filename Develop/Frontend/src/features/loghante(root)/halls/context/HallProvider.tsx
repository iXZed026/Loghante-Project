"use client";

import {
    createContext,
    ReactNode,
    useContext,
    useState,
} from "react";

export interface CinemaDetails {
    eventId?: number;
    releaseYear: string | number;
    director: string;
    country: string;
    filmDuration: number;
    genre: string;
    imdbScore: number;
}

export interface TheaterDetails {
    eventId?: number;
    director: string;
    writer: string;
    duration: number;
    releaseYear: string | number;
}

export interface HallEventData {
    sessionId: number;
    eventId: number;
    hallId: number;

    title: string;
    description: string;

    startAt: number | string;

    imageURL: string;

    price?: number | string;

    cinemaDetails?: CinemaDetails;
    theaterDetails?: TheaterDetails;
}

export interface HallData {
    eventData: HallEventData;
}

interface HallContextType {
    hallData: HallData | null;

    setHallData: (
        data: HallData
    ) => void;

    clearHallData: () => void;

    isReady: boolean;
}

const HallContext =
    createContext<
        HallContextType | undefined
    >(undefined);

interface HallProviderProps {
    children: ReactNode;
}

export function HallProvider({
    children,
}: HallProviderProps) {

    const [
        hallData,
        setHallData,
    ] = useState<HallData | null>(null);

    const [
        isReady,
    ] = useState(true);

    const clearHallData = () => {
        setHallData(null);
    };

    return (
        <HallContext.Provider
            value={{
                hallData,
                setHallData,
                clearHallData,
                isReady,
            }}
        >
            {children}
        </HallContext.Provider>
    );
}

export function useHall() {

    const context =
        useContext(HallContext);

    if (!context) {
        throw new Error(
            "useHall must be used within HallProvider"
        );
    }

    return context;
}