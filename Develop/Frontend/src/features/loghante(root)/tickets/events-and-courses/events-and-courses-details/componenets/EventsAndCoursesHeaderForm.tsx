"use client"

import FadeIn from '@/components/animations/FadeIn'
import Button from '@/components/ui/Button'
import { slowTransitionOut } from '@/lib/animations/transitions'
import { cn } from '@/lib/utils/cn'
import {
    EventAndCourseSessionDetail,
} from '@/lib/api/ticket/events-and-courses'
import {
    useLocale,
    useTranslations,
} from 'next-intl'
import { useState } from 'react'

import {
    FaLocationDot,
    FaRegClock,
} from 'react-icons/fa6'

import {
    MdOutlineDateRange,
    MdOutlinePriceChange,
} from 'react-icons/md'
import { useRouter } from 'next/navigation'
import { useHall } from '@/features/loghante(root)/halls/context/HallProvider'

interface EventsAndCoursesHeaderFormProps {
    event: EventAndCourseSessionDetail
}

function EventsAndCoursesHeaderForm({
    event,
}: EventsAndCoursesHeaderFormProps) {

    const locale = useLocale()
    const router = useRouter()

    const { setHallData } =
        useHall()

    const commonT =
        useTranslations("common")

    const eventsAndCoursesHeaderT =
        useTranslations(
            "eventsAndCoursesDetails.header"
        )

    const [count, setCount] =
        useState<number>(0)

    function increaseCount(): void {
        setCount(prev =>
            Math.min(prev + 1, 20)
        )
    }

    function decreaseCount(): void {
        setCount(prev =>
            Math.max(prev - 1, 0)
        )
    }

    function submitForm(
        e: React.FormEvent<HTMLFormElement>
    ): void {
        e.preventDefault()


        setHallData({
            eventData: {
                title: event.name,
                description: event.description,
                startAt: event.startAt,
                // imageURL: event.images[0].imageUrl,
                imageURL: "/images/loghanteh-cafe.jpg",
                price:event.price
            }
        })

        router.push(`/${locale}/hall/${event.hallId}`)

    }



    const startAt =
        new Date(event.startAt)

    const date =
        startAt.toLocaleDateString(
            locale === "fa"
                ? "fa-IR"
                : "en-US",
            {
                day: "numeric",
                month: "long",
                year: "numeric",
            }
        )

    const hours =
        startAt.getHours()

    const minutes =
        startAt.getMinutes()

    const formattedHours =
        hours % 12 || 12

    const formattedMinutes =
        String(minutes).padStart(2, "0")

    const period =
        hours >= 12
            ? locale === "fa"
                ? "ب.ظ."
                : "PM"
            : locale === "fa"
                ? "ق.ظ."
                : "AM"

    const time =
        locale === "fa"
            ? `${formattedHours}:${formattedMinutes} ${period}`
            : `${formattedHours}:${formattedMinutes} ${period}`

    return (
        <FadeIn
            once
            transition={slowTransitionOut}
            className={cn(
                "lg:col-span-5 col-span-12",
            )}
        >
            <form
                className={cn(
                    "fcol gap-y-9",
                    "rounded-xl",
                    "border border-black-opacity",
                    "py-9.5 px-7.5",
                )}
                onSubmit={submitForm}
            >

                {/* Name */}

                <div>
                    <span className="text-xl font-semibold">
                        {event.name}
                    </span>
                </div>

                {/* Details */}

                <div
                    className={cn(
                        "fcol gap-y-6",
                        "text-black-light-utility",
                        "text-sm",
                    )}
                >

                    {/* Location */}

                    <div className="flex items-center gap-2">
                        <span>
                            <FaLocationDot
                                className="size-4 text-crimson"
                            />
                        </span>

                        <span>
                            {eventsAndCoursesHeaderT(
                                "details.address"
                            )}
                        </span>
                    </div>

                    {/* Date */}

                    <div className="flex items-center gap-2">
                        <span>
                            <MdOutlineDateRange
                                className="size-4 text-crimson"
                            />
                        </span>

                        <span>
                            {date}
                        </span>
                    </div>

                    {/* Time */}

                    <div className="flex items-center gap-2">
                        <span>
                            <FaRegClock
                                className="size-4 text-crimson"
                            />
                        </span>

                        <span>
                            {time}
                        </span>
                    </div>

                    {/* Price */}

                    <div className="flex items-center gap-2">
                        <span>
                            <MdOutlinePriceChange
                                className="size-4 text-crimson"
                            />
                        </span>

                        <div className="fbc w-full">
                            <span>
                                {eventsAndCoursesHeaderT(
                                    "details.amount"
                                )}
                            </span>

                            <span className="text-xl font-bold text-crimson">
                                {event.price.toLocaleString(
                                    locale
                                )}{" "}
                                {commonT(
                                    "price-type"
                                )}
                            </span>
                        </div>
                    </div>

                </div>

                {/* Count */}

                {/* <div className="fbc">
                    <div>
                        <span className="font-semibold">
                            {eventsAndCoursesHeaderT(
                                "details.count"
                            )}
                        </span>
                    </div>

                    <div
                        className={cn(
                            "fcc gap-5",
                            "text-2xl font-bold",
                            "select-none",
                        )}
                    >
                        <div
                            className={cn(
                                "fcc gap-2 px-2",
                                "rounded-3xl",
                                "bg-[var(--white-light-color)]",
                            )}
                        >
                            <span
                                onClick={
                                    increaseCount
                                }
                                className="py-1 px-2 cursor-pointer active:scale-75 transition-all"
                            >
                                +
                            </span>

                            <span>|</span>

                            <span
                                onClick={
                                    decreaseCount
                                }
                                className="py-1 px-2 cursor-pointer active:scale-75 transition-all"
                            >
                                -
                            </span>
                        </div>

                        <div className="text-xl px-3 py-1 rounded-3xl bg-[var(--white-light-color)]">
                            <span>
                                {count}
                            </span>
                        </div>
                    </div>
                </div> */}

                {/* Book */}

                {/* {event.price !== 0 &&( */}
                <div className="w-full">
                    <Button
                        className={cn(
                            "w-full",
                            "py-3 px-3",
                            "bg-crimson",
                            "font-bold",
                        )}
                    >
                        {eventsAndCoursesHeaderT(
                            "details.book-button"
                        )}
                    </Button>
                </div>
                {/* )} */}

            </form>
        </FadeIn>
    )
}

export default EventsAndCoursesHeaderForm