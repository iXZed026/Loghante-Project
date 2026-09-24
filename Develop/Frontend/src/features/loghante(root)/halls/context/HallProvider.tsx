"use client";

import {
    createContext,
    ReactNode,
    useContext,
    useState,
} from "react";

export interface CinemaDetails {
    eventId: number;
    releaseYear: number;
    director: string;
    country: string;
    filmDuration: number;
    genre: string;
    imdbScore: number;
}

export interface TheaterDetails {
    eventId: number;
    director: string;
    writer: string;
    duration: number;
}

export interface HallBoxData {
    title: string;
    description: string;
    imageURL: string;

    cinemaDetails?: CinemaDetails;

    theaterDetails?: TheaterDetails;
}

export interface HallData {
    hallId: number;
    boxData: HallBoxData;
}

interface HallContextType {
    hallData: HallData | null;

    setHallData: (
        data: HallData
    ) => void;

    clearHallData: () => void;
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

    const clearHallData = () => {
        setHallData(null);
    };

    return (
        <HallContext.Provider
            value={{
                hallData,
                setHallData,
                clearHallData,
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