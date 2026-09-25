"use client";

import React from "react";

import { useRouter } from "next/navigation";

import {
    FaRegMoneyBillAlt,
} from "react-icons/fa";

import {
    SlCalender,
} from "react-icons/sl";

import Button from "@/components/ui/Button";

import { cn } from "@/lib/utils/cn";

import {
    useHall,
} from "../../context/HallProvider";

function HallTicketDetails() {

    const router =
        useRouter();

    const {
        hallData,
    } = useHall();

    const event =
        hallData?.eventData;

    if (!event) {
        return null;
    }

    const startAt =
        new Date(event.startAt);

    const formattedDate =
        startAt.toLocaleDateString(
            "en-US",
            {
                weekday: "long",
                month: "long",
                day: "numeric",
            },
        );

    const formattedTime =
        startAt.toLocaleTimeString(
            "en-US",
            {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
            },
        );

    function changeButtonHandler() {
        router.back();
    }

    return (
        <div className="fcol gap-5">

            <div>
                <span className="text-xl">
                    Choose your seat
                </span>
            </div>

            <div className="fcc">

                <div className="flex w-full items-center gap-2">
                    <FaRegMoneyBillAlt
                        className="text-crimson"
                        size={25}
                    />

                    <span>
                        Amount Paid:{" "}
                        {event.price?.toLocaleString()}{" "}
                        Toman
                    </span>
                </div>

                <div className="w-full fbc bg-gold-opacity p-8">

                    <div className="fcol gap-3 text-sm text-black-light-utility">

                        <div className="flex items-center gap-2">
                            <SlCalender
                                className="text-crimson"
                                size={13}
                            />

                            <span>
                                {formattedDate}
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <SlCalender
                                className="text-crimson"
                                size={13}
                            />

                            <span>
                                Time {formattedTime}
                            </span>
                        </div>

                    </div>

                    <div>
                        <Button
                            className={cn(
                                "text-crimson",
                                "hover:text-[var(--crimson-opacity-color)]",
                            )}
                            onClick={changeButtonHandler}
                        >
                            Change
                        </Button>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default HallTicketDetails;