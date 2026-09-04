"use client"

import AppLink from '@/components/ui/AppLink'
import { DayOfTheWeek } from '@/data/days-of-the-week'
import { formatMonthDay, formatMonthYear } from '@/lib/utils/date'
import { getLocalizedValue } from '@/lib/utils/getLocalizedValue'
import { cn } from '@/lib/utils/cn'
import { useLocale } from 'next-intl'
import React from 'react'

interface ICalendarEvent {
    background: string
    title?: string
}

const CalendarEvents: ICalendarEvent[] = [
    {
        background: "bg-gold-utility",
        title: "Conference",
    },
    {
        background: "bg-crimson",
        title: "Workshop",
    },
    {
        background: "bg-white",
    },
    {
        background: "bg-black-light-utility",
        title: "Meeting",
    },
    {
        background: "bg-white",
    },
    {
        background: "bg-gold-utility",
        title: "Seminar",
    },
    {
        background: "bg-crimson",
        title: "Party",
    },
    {
        background: "bg-white",
    },
    {
        background: "bg-black-light-utility",
        title: "Conference",
    },
    {
        background: "bg-gold-utility",
        title: "Workshop",
    },
    {
        background: "bg-white",
    },
    {
        background: "bg-crimson",
        title: "Meeting",
    },
    {
        background: "bg-white",
    },
    {
        background: "bg-gold-utility",
        title: "Event",
    },
    {
        background: "bg-crimson",
        title: "Course",
    },
    {
        background: "bg-white",
    },
    {
        background: "bg-black-light-utility",
        title: "Conference",
    },
    {
        background: "bg-gold-utility",
        title: "Workshop",
    },
    {
        background: "bg-white",
    },
    {
        background: "bg-crimson",
        title: "Seminar",
    },
    {
        background: "bg-white",
    },
    {
        background: "bg-gold-utility",
        title: "Meeting",
    },
    {
        background: "bg-white",
    },
    {
        background: "bg-crimson",
        title: "Conference",
    },
    {
        background: "bg-black-light-utility",
        title: "Course",
    },
    {
        background: "bg-white",
    },
    {
        background: "bg-gold-utility",
        title: "Workshop",
    },
    {
        background: "bg-white",
    },
    {
        background: "bg-crimson",
        title: "Event",
    },
    {
        background: "bg-white",
    },
    {
        background: "bg-black-light-utility",
        title: "Meeting",
    },
    {
        background: "bg-gold-utility",
        title: "Seminar",
    },
    {
        background: "bg-white",
    },
    {
        background: "bg-crimson",
        title: "Conference",
    },
    {
        background: "bg-white",
    },
]

function EventsAndCoursesDate() {

    const locale = useLocale()

    const today = new Date()

    const calendarDates = Array.from(
        { length: 35 },
        (_, index) => {

            const date = new Date(today)

            date.setDate(
                today.getDate() + index - 2
            )

            return date
        }
    )


    const weekDays = Array.from(
        { length: 7 },
        (_, index) => {

            const date = new Date(today)

            date.setDate(
                today.getDate() + index - 2
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
            today,
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

                <span className="md:text-4xl text-2xl font-semibold font-wulkan">
                    {monthTitle}
                </span>

            </div>

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

                        const event =
                            CalendarEvents[index]

                        const isPast =
                            index < 2

                        const hasEvent =
                            event.background !== "bg-white"

                        const formattedDate =
                            formatMonthDay(
                                date,
                                locale
                            )

                        const content = (

                            <div
                                className={cn(
                                    "relative fcol justify-between",
                                    "w-full md:h-35 sm:h-45 h-50",
                                    "p-3",
                                    "border-r border-b border-black-opacity",
                                    "transition-all",
                                    "col-span-6 sm:col-span-4 md:col-span-1",
                                    event.background,
                                    isPast &&
                                    "opacity-50",
                                    hasEvent
                                        ? "text-white-light-utility"
                                        : "text-black",
                                )}
                            >
                                <div className="text-sm opacity-80 font-semibold">
                                    {formattedDate}
                                </div>

                                {event.title && (
                                    <div
                                        className={cn(
                                            "font-bold",
                                            "line-clamp-2",
                                            "break-all",
                                        )}
                                        title={event.title}
                                    >
                                        {event.title}
                                    </div>
                                )}

                            </div>
                        )

                        if (isPast) {

                            return (
                                <React.Fragment
                                    key={date.toISOString()}
                                >
                                    {content}
                                </React.Fragment>
                            )
                        }

                        if (!hasEvent) {

                            return (
                                <div
                                    key={date.toISOString()}
                                    className="hidden md:block"
                                >
                                    {content}
                                </div>
                            )
                        }

                        return (
                            <AppLink
                                key={date.toISOString()}
                                href="/"
                                className="block col-span-6 sm:col-span-4 md:col-span-1"
                            >
                                {content}
                            </AppLink>
                        )
                    }
                )}

            </div>

        </div>
    )
}

export default EventsAndCoursesDate

