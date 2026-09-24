"use client";

import {
    ReactNode,
    useEffect,
} from "react";

import { useRouter } from "next/navigation";

import { useHall } from "../context/HallProvider";

interface HallGuardProps {
    children: ReactNode;
    ready: boolean;
}

function HallGuard({
    children,
    ready,
}: HallGuardProps) {
    const router = useRouter();

    const { hallData } =
        useHall();

    useEffect(() => {
        if (
            ready &&
            !hallData
        ) {
            router.back();
        }
    }, [
        ready,
        hallData,
        router,
    ]);

    if (!ready) {
        return null;
    }

    if (!hallData) {
        return null;
    }

    return children;
}

export default HallGuard;