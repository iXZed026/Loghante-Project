"use client";

import {
    ReactNode,
    useEffect,
} from "react";

import {
    useParams,
    useRouter,
} from "next/navigation";

import {
    useHall,
} from "../context/HallProvider";

interface HallGuardProps {
    children: ReactNode;
}

function HallGuard({
    children,
}: HallGuardProps) {

    const router =
        useRouter();

    const params =
        useParams();

    const {
        hallData,
    } = useHall();

    const locale =
        params.locale as string;

    useEffect(() => {

        if (!hallData) {
            router.replace(`/${locale}`);
        }

    }, [
        hallData,
        locale,
        router,
    ]);

    if (!hallData) {
        return null;
    }

    return children;
}

export default HallGuard;