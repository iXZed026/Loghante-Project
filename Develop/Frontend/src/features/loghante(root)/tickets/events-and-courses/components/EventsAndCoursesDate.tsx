"use client"

import { useEffect, useState } from "react"
import { DayOfTheWeek } from '@/data/days-of-the-week'
import { formatMonthDay, formatMonthYear } from '@/lib/utils/date'
import { getLocalizedValue } from '@/lib/utils/getLocalizedValue'
import { cn } from '@/lib/utils/cn'
import { useLocale } from 'next-intl'
import FadeUp from '@/components/animations/FadeUp'
import FadeIn from '@/components/animations/FadeIn'
import {
    slowTransitionIn,
} from '@/lib/animations/transitions'
import {
    getEventAndCourseSessions,
    EventAndCourseSessionResponse,
} from '@/lib/api/ticket/events-and-courses'

function EventsAndCoursesDate() {

    const locale = useLocale()

    const [selectedDate, setSelectedDate] =
        useState<Date>(new Date())

    const [sessions, setSessions] =
        useState<EventAndCourseSessionResponse[]>([])

    const [isLoading, setIsLoading] =
        useState<boolean>(false)

    const [error, setError] =
        useState<boolean>(false)


    useEffect(() => {

        let isMounted = true

        async function fetchSessions() {

            setIsLoading(true)
            setError(false)

            const year =
                selectedDate.getFullYear()

            const month =
                String(
                    selectedDate.getMonth() + 1
                ).padStart(2, "0")

            const day =
                String(
                    selectedDate.getDate()
                ).padStart(2, "0")

            const date =
                `${year}-${month}-${day}`

            try {

                const response =
                    await getEventAndCourseSessions(
                        date,
                        locale
                    )

                if (!isMounted) return

                if (!response.success) {

                    setSessions([])
                    setError(true)

                    return
                }

                setSessions(
                    response.data ?? []
                )

            } catch {

                if (!isMounted) return

                setSessions([])
                setError(true)

            } finally {

                if (isMounted) {
                    setIsLoading(false)
                }

            }
        }

        fetchSessions()

        return () => {
            isMounted = false
        }

    }, [selectedDate, locale])


    const calendarDates = Array.from(
        { length: 35 },
        (_, index) => {

            const date =
                new Date(selectedDate)

            date.setDate(
                selectedDate.getDate() + index - 2
            )

            return date
        }
    )


    const weekDays = Array.from(
        { length: 7 },
        (_, index) => {

            const date =
                new Date(selectedDate)

            date.setDate(
                selectedDate.getDate() + index - 2
            )

            const dayNumber =
                date.getDay() === 0
                    ? 2
                    : date.getDay() === 6
                        ? 1
                        : date.getDay() + 2

            return DayOfTheWeek.find(
                day =>
                    day.dayOTWeekNumber === dayNumber
            )!
        }
    )


    const monthTitle =
        formatMonthYear(
            selectedDate,
            locale
        )


    return (
        <div
            className={cn(
                "max-w-6xl mx-auto",
                "p-6",
            )}
        >

            <div className="py-10 text-center">

                <FadeIn once={true}>

                    <span
                        className="md:text-4xl text-2xl font-semibold font-wulkan"
                    >
                        {monthTitle}
                    </span>

                </FadeIn>

            </div>


            <FadeUp
                once={true}
                amount={0}
                transition={slowTransitionIn}
            >

                <div
                    className={cn(
                        "w-full",
                        "grid grid-cols-12 md:grid-cols-7 gap-0.5",
                        "border-t border-l border-black-opacity",
                    )}
                >

                    {weekDays.map((day) => (

                        <div
                            key={day.id}
                            className={cn(
                                "col-span-12 md:col-span-1",
                                "border-r border-b border-black-opacity",
                                "p-2",
                                "text-sm",
                                "font-semibold",
                                "text-black-light-utility",
                                "bg-gray-100",
                                "hidden md:block",
                            )}
                        >
                            {getLocalizedValue(
                                day.dayOTWeek,
                                locale
                            )}
                        </div>

                    ))}


                    {calendarDates.map(
                        (date, index) => {

                            const isPast =
                                index < 2

                            const isSelected =
                                date.toDateString() ===
                                selectedDate.toDateString()

                            const formattedDate =
                                formatMonthDay(
                                    date,
                                    locale
                                )

                            const hasEvent =
                                index >= 2 &&
                                sessions.length > 0 &&
                                isSelected


                            return (
                                <button
                                    type="button"
                                    key={date.toISOString()}
                                    onClick={() =>
                                        setSelectedDate(date)
                                    }
                                    className={cn(
                                        "relative fcol justify-between",
                                        "w-full md:h-35 sm:h-45 h-50",
                                        "p-3",
                                        "border-r border-b border-black-opacity",
                                        "transition-all",
                                        "col-span-6 sm:col-span-4 md:col-span-1",
                                        isPast &&
                                        "opacity-50",
                                        isSelected &&
                                        "ring-2 ring-inset ring-crimson",
                                        hasEvent
                                            ? "bg-crimson text-white-light-utility"
                                            : "bg-white text-black",
                                        "text-left",
                                    )}
                                >

                                    <div
                                        className="text-sm opacity-80 font-semibold"
                                    >
                                        {formattedDate}
                                    </div>


                                    {isSelected && isLoading && (
                                        <div className="font-bold">
                                            Loading...
                                        </div>
                                    )}


                                    {isSelected &&
                                        !isLoading &&
                                        error && (
                                            <div className="font-bold">
                                                Failed to load
                                            </div>
                                        )
                                    }


                                    {isSelected &&
                                        !isLoading &&
                                        !error &&
                                        sessions.length > 0 && (
                                            <div
                                                className="font-bold line-clamp-2 break-all"
                                            >
                                                {sessions.length}{" "}
                                                {sessions.length === 1
                                                    ? "event"
                                                    : "events"}
                                            </div>
                                        )
                                    }


                                    {isSelected &&
                                        !isLoading &&
                                        !error &&
                                        sessions.length === 0 && (
                                            <div
                                                className="font-bold line-clamp-2"
                                            >
                                                No events
                                            </div>
                                        )
                                    }

                                </button>
                            )
                        }
                    )}

                </div>

            </FadeUp>


            {!isLoading &&
                !error &&
                sessions.length > 0 && (

                    <div className="mt-10 fcol gap-5">

                        {sessions.map((session) => (

                            <div
                                key={session.sessionId}
                                className={cn(
                                    "border border-black-opacity",
                                    "rounded-xl",
                                    "p-5",
                                )}
                            >

                                <div className="fbc gap-5">

                                    <div className="fcol gap-2">

                                        <span
                                            className="font-bold text-lg"
                                        >
                                            {session.name}
                                        </span>

                                        <span
                                            className="text-black-light-utility"
                                        >
                                            {session.primaryDescription}
                                        </span>

                                    </div>


                                    <div className="text-right">

                                        <div>
                                            {new Date(
                                                session.startAt
                                            ).toLocaleTimeString(
                                                locale === "fa"
                                                    ? "fa-IR"
                                                    : "en-GB",
                                                {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                }
                                            )}
                                        </div>

                                        <div>
                                            {session.durationM} min
                                        </div>

                                    </div>

                                </div>


                                <div className="mt-5 flex justify-between">

                                    <span>
                                        Capacity:{" "}
                                        {session.capacity}
                                    </span>

                                    {session.price !== null && (
                                        <span>
                                            {session.price}
                                        </span>
                                    )}

                                </div>

                            </div>

                        ))}

                    </div>

                )
            }


            {!isLoading &&
                !error &&
                sessions.length === 0 && (
                    <div className="mt-10 text-center">
                        No events or courses available.
                    </div>
                )
            }

        </div>
    )
}

export default EventsAndCoursesDate