"use client"

import AppImage from "@/components/ui/AppImage"
import { cn } from "@/lib/utils/cn"
import { getLocalizedValue } from "@/lib/utils/getLocalizedValue"
import { useLocale } from "next-intl"

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


    const ticketName = getLocalizedValue(
        ticket.name,
        locale
    )

    const ticketGenre = ticket.genre
        ? getLocalizedValue(ticket.genre, locale)
        : null

    const formattedTime = ticket.startAt

    const isFull =
        ticket.remainingCapacity <= 0

    const isLowCapacity =
        ticket.remainingCapacity > 0 &&
        ticket.remainingCapacity <= 10

    const isCinema =
        ticket.type === "cinema"

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
                            className="
                                absolute
                                inset-0
                                bg-gradient-to-t
                                from-black/85
                                via-black/20
                                to-transparent
                            "
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
                            Image not available
                        </span>
                    </div>
                )}

                {/* Type */}

                <div
                    className={cn(
                        "absolute",
                        "left-4 top-4",
                        "rounded-full",
                        "px-4 py-1.5",
                        "text-xs",
                        "font-bold",
                        "backdrop-blur-md",
                        "border border-white/20",
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
                        ? "Cinema"
                        : "Theater"}
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
                    <FaRegClock className="size-3.5" />

                    <span>
                        {formattedTime}
                    </span>
                </div>

                {/* Name */}

                <div
                    className="
                        absolute
                        bottom-5
                        left-5
                        right-5
                    "
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
                        className="
                            fcc
                            size-10
                            rounded-full
                            bg-[var(--white-light-color)]
                            text-crimson
                        "
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
                            Remaining
                        </span>

                        <span
                            className="
                                font-bold
                            "
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
                            <FaTicket className="size-3.5" />

                            <span>
                                Capacity Full
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
                            Few seats left
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
                            Available
                        </div>

                    )}

                </div>

            </div>
        </div>
    )
}

export default CinemaAndTheaterTicketBox