"use client";

import {
    ReactNode,
    useEffect,
} from "react";

import {
    useRouter,
} from "next/navigation";

import {
    useTicketPayment,
} from "../../context/TicketPaymentContext";

interface PaymentGuardProps {
    children: ReactNode;
}

function PaymentGuard({
    children,
}: PaymentGuardProps) {

    const router =
        useRouter();

    const {
        paymentData,
    } = useTicketPayment();

    useEffect(() => {

        if (!paymentData) {
            router.back();
        }

    }, [
        paymentData,
        router,
    ]);

    if (!paymentData) {
        return null;
    }

    return children;
}

export default PaymentGuard;