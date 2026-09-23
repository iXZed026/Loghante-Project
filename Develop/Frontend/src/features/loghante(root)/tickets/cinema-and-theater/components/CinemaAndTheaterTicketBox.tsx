"use client"

import AppImage from "@/components/ui/AppImage"
import AppLink from "@/components/ui/AppLink"
import { cn } from "@/lib/utils/cn"
import { getLocalizedValue } from "@/lib/utils/getLocalizedValue"
import { useLocale, useTranslations } from "next-intl"
import { useEffect, useState } from "react"
import {
    FaRegClock,
    FaTicket,
} from "react-icons/fa6"
import {
    MdOutlineEventSeat,
} from "react-icons/md"
import type { CinemaAndTheaterTicket } from "./data/cinema-and-theater"

interface CinemaAndTheaterTicketBoxProps {
    ticket: CinemaAndTheaterTicket
}

function CinemaAndTheaterTicketBox({
    ticket,
}: CinemaAndTheaterTicketBoxProps) {

    const locale = useLocale()

    const ticketBoxT = useTranslations(
        "cinemaAndTheater.ticket-box"
    )

    const [currentTime, setCurrentTime] =
        useState<Date | null>(null)

    useEffect(() => {
        const updateTime = () => {
            setCurrentTime(new Date())
        }

        updateTime()

        const interval = setInterval(
            updateTime,
            60_000
        )

        return () => clearInterval(interval)
    }, [])

    const ticketName = getLocalizedValue(
        ticket.name,
        locale
    )

    const ticketGenre = ticket.genre
        ? getLocalizedValue(
            ticket.genre,
            locale
        )
        : null

    const formattedTime = ticket.startAt

    const isFull =
        ticket.remainingCapacity <= 0

    const isLowCapacity =
        ticket.remainingCapacity > 0 &&
        ticket.remainingCapacity <= 10

    const isCinema =
        ticket.type === "cinema"

    /*
     * Calculate ticket status
     */

    const isInProgress = (() => {

        if (!currentTime || isFull) {
            return false
        }

        const [hours, minutes] =
            ticket.startAt
                .split(":")
                .map(Number)

        const startTime =
            new Date(currentTime)

        startTime.setHours(
            hours,
            minutes,
            0,
            0
        )

        const endTime = new Date(
            startTime.getTime() +
            ticket.duration * 60 * 1000
        )

        return (
            currentTime >= startTime &&
            currentTime < endTime
        )

    })()

    const isUnavailable =
        isFull || isInProgress

    /*
     * Button content
     */

    const buttonContent = isFull
        ? ticketBoxT("sold-out")
        : isInProgress
            ? ticketBoxT("in-progress")
            : ticketBoxT("book-button")

    return (
        <div
            className={cn(
                "md:col-span-6 col-span-12",
                "group",
                "relative",
                "overflow-hidden",
                "rounded-2xl",
                "border border-black-opacity",
                "bg-white",
                "shadow-lg",
                "transition-all duration-500",
                "hover:shadow-2xl",

                isInProgress &&
                "border-crimson/40",

                isFull &&
                "opacity-90",
            )}
        >

            {/* Image */}

            <div
                className="
                    relative
                    h-64
                    w-full
                    overflow-hidden
                    bg-[var(--black-light-color)]
                "
            >

                {ticket.imageUrl ? (
                    <>
                        <AppImage
                            src={ticket.imageUrl}
                            alt={ticketName}
                            width={900}
                            height={550}
                            className="
                                h-full
                                w-full
                                object-cover
                                transition-transform
                                duration-700
                                group-hover:scale-105
                            "
                        />

                        <div
                            className={cn(
                                "absolute",
                                "inset-0",
                                "bg-gradient-to-t",
                                "from-black/85",
                                "via-black/20",
                                "to-transparent",
                                isInProgress &&
                                "from-crimson/80",
                            )}
                        />
                    </>
                ) : (
                    <div
                        className="
                            flex
                            h-full
                            w-full
                            items-center
                            justify-center
                            bg-[var(--black-light-color)]
                        "
                    >
                        <span
                            className="
                                text-sm
                                text-white/50
                            "
                        >
                            {ticketBoxT(
                                "image-not-available"
                            )}
                        </span>
                    </div>
                )}

                {/* Type */}

                <div
                    className={cn(
                        "absolute",
                        "left-4 top-4",
                        "rounded-full",
                        "border border-white/20",
                        "px-4 py-1.5",
                        "text-xs",
                        "font-bold",
                        "backdrop-blur-md",

                        isCinema
                            ? [
                                "bg-crimson/90",
                                "text-white",
                            ]
                            : [
                                "bg-gold-utility/90",
                                "text-black",
                            ]
                    )}
                >
                    {isCinema
                        ? ticketBoxT("cinema")
                        : ticketBoxT("theater")}
                </div>

                {/* Time */}

                <div
                    className="
                        absolute
                        right-4 top-4
                        flex
                        items-center
                        gap-2
                        rounded-full
                        bg-black/55
                        px-4
                        py-1.5
                        text-sm
                        font-semibold
                        text-white
                        backdrop-blur-md
                    "
                >
                    <FaRegClock
                        className="size-3.5"
                    />

                    <span>
                        {formattedTime}
                    </span>
                </div>

                {/* In Progress Badge */}

                {isInProgress && (
                    <div
                        className="
                            absolute
                            bottom-5
                            left-5
                            flex
                            items-center
                            gap-2
                            rounded-full
                            border border-white/20
                            bg-black/60
                            px-4
                            py-2
                            text-xs
                            font-bold
                            text-white
                            backdrop-blur-md
                        "
                    >
                        <span
                            className="
                                size-2
                                animate-pulse
                                rounded-full
                                bg-white
                            "
                        />

                        <span>
                            {ticketBoxT(
                                "in-progress"
                            )}
                        </span>
                    </div>
                )}

                {/* Name */}

                <div
                    className={cn(
                        "absolute",
                        "left-5",
                        "right-5",
                        isInProgress
                            ? "bottom-14"
                            : "bottom-5",
                    )}
                >
                    <h3
                        className="
                            text-xl
                            font-bold
                            text-white
                            drop-shadow-lg
                        "
                    >
                        {ticketName}
                    </h3>

                    {isCinema &&
                        ticketGenre && (
                            <span
                                className="
                                    mt-1
                                    inline-block
                                    text-sm
                                    text-white/75
                                "
                            >
                                {ticketGenre}
                            </span>
                        )}
                </div>

            </div>

            {/* Information */}

            <div
                className="
                    fbc
                    gap-4
                    px-6
                    py-5
                "
            >

                {/* Capacity */}

                <div
                    className="
                        flex
                        items-center
                        gap-3
                    "
                >
                    <div
                        className={cn(
                            "fcc",
                            "size-10",
                            "rounded-full",
                            "bg-[var(--white-light-color)]",
                            isFull
                                ? "text-black-light-utility"
                                : "text-crimson",
                        )}
                    >
                        <MdOutlineEventSeat
                            className="size-5"
                        />
                    </div>

                    <div className="fcol">

                        <span
                            className="
                                text-xs
                                text-black-light-utility
                            "
                        >
                            {ticketBoxT(
                                "capacity"
                            )}
                        </span>

                        <span
                            className="font-bold"
                        >
                            {ticket.remainingCapacity}
                        </span>

                    </div>
                </div>

                {/* Capacity Status */}

                <div>

                    {isFull ? (

                        <div
                            className="
                                flex
                                items-center
                                gap-2
                                rounded-full
                                bg-black/5
                                px-4
                                py-2
                                text-sm
                                font-semibold
                                text-crimson
                            "
                        >
                            <FaTicket
                                className="size-3.5"
                            />

                            <span>
                                {ticketBoxT(
                                    "sold-out"
                                )}
                            </span>
                        </div>

                    ) : isInProgress ? (

                        <div
                            className="
                                flex
                                items-center
                                gap-2
                                rounded-full
                                bg-crimson/10
                                px-4
                                py-2
                                text-sm
                                font-semibold
                                text-crimson
                            "
                        >
                            <span
                                className="
                                    size-2
                                    animate-pulse
                                    rounded-full
                                    bg-crimson
                                "
                            />

                            <span>
                                {ticketBoxT(
                                    "in-progress"
                                )}
                            </span>
                        </div>

                    ) : isLowCapacity ? (

                        <div
                            className="
                                rounded-full
                                bg-gold-utility/20
                                px-4
                                py-2
                                text-sm
                                font-semibold
                                text-[#8A671E]
                            "
                        >
                            {ticketBoxT(
                                "few-seats",
                                {
                                    count:
                                        ticket.remainingCapacity
                                }
                            )}
                        </div>

                    ) : (

                        <div
                            className="
                                rounded-full
                                bg-crimson/10
                                px-4
                                py-2
                                text-sm
                                font-semibold
                                text-crimson
                            "
                        >
                            {ticketBoxT(
                                "available"
                            )}
                        </div>

                    )}

                </div>

            </div>

            {/* Book Ticket */}

            <div className="px-6 pb-6">

                <AppLink
                    href="#"
                    aria-disabled={isUnavailable}
                    className={cn(
                        "flex",
                        "w-full",
                        "items-center",
                        "justify-center",
                        "gap-2",
                        "rounded-xl",
                        "px-5 py-3",
                        "font-semibold",
                        "transition-all duration-300",

                        isUnavailable
                            ? [
                                "cursor-not-allowed",
                                "bg-black/10",
                                "text-black/40",
                                "pointer-events-none",
                            ]
                            : [
                                "bg-crimson",
                                "text-white",
                                "hover:bg-[var(--crimson-opacity-color)]",
                                "click-scale",
                            ],
                    )}
                >

                    {isInProgress ? (
                        <>
                            <span
                                className="
                                    size-2
                                    animate-pulse
                                    rounded-full
                                    bg-current
                                "
                            />

                            {buttonContent}
                        </>
                    ) : (
                        <>
                            <FaTicket
                                className="size-3.5"
                            />

                            {buttonContent}
                        </>
                    )}

                </AppLink>

            </div>

        </div>
    )
}

export default CinemaAndTheaterTicketBox