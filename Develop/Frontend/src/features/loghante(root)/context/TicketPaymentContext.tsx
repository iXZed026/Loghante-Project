"use client";

import {
    createContext,
    ReactNode,
    useContext,
    useState,
} from "react";

import {
    MuseumTourSessionResponse,
} from "@/lib/api/ticket/museum-tour";

interface TicketPaymentData {
    ticket: MuseumTourSessionResponse;
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
    ] = useState<TicketPaymentData | null>(null);

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