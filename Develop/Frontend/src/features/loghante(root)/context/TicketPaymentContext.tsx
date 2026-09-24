"use client";

import {
    createContext,
    ReactNode,
    useContext,
    useState,
} from "react";

export type TicketPaymentType =
    | "museum-tour"
    | "events-and-courses"
    | "cinema-and-theater";

export interface TicketPaymentData {
    type: TicketPaymentType;

    ticket: {
        sessionId: number;
        eventId: number;
        name: string;
        startAt: string;
        durationM: number;
        capacity: number;
        price: number | null;
    };

    hall?: {
        hallName: string;
        seatsNumbs: number[];
    };

    quantity: number;
}

interface TicketPaymentContextType {
    paymentData: TicketPaymentData | null;

    setPaymentData: (
        data: TicketPaymentData
    ) => void;

    clearPaymentData: () => void;
}

const TicketPaymentContext =
    createContext<
        TicketPaymentContextType | undefined
    >(undefined);

interface TicketPaymentProviderProps {
    children: ReactNode;
}

export function TicketPaymentProvider({
    children,
}: TicketPaymentProviderProps) {

    const [
        paymentData,
        setPaymentData,
    ] = useState<TicketPaymentData | null>({
        type: "cinema-and-theater",

        ticket: {
            sessionId: 25,
            eventId: 8,
            name: "Shadows of Tehran",
            startAt: "2026-09-24T18:30:00",
            durationM: 120,
            capacity: 100,
            price: 250000,
        },

        hall: {
            hallName: "Loghanteh Grand Hall",
            seatsNumbs: [12, 13],
        },

        quantity: 2,
    });

    const clearPaymentData = () => {
        setPaymentData(null);
    };

    return (
        <TicketPaymentContext.Provider
            value={{
                paymentData,
                setPaymentData,
                clearPaymentData,
            }}
        >
            {children}
        </TicketPaymentContext.Provider>
    );
}

export function useTicketPayment() {

    const context =
        useContext(
            TicketPaymentContext
        );

    if (!context) {
        throw new Error(
            "useTicketPayment must be used within TicketPaymentProvider"
        );
    }

    return context;
}