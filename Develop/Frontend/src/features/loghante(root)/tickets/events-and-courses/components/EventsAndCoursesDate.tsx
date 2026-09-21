"use client"

import {
    ChangeEvent,
    useEffect,
    useRef,
    useState,
} from "react"
import { useSearchParams } from "next/navigation"
import { formatMonthYear } from "@/lib/utils/date"
import { cn } from "@/lib/utils/cn"
import { useLocale } from "next-intl"
import {
    FiChevronLeft,
    FiChevronRight,
} from "react-icons/fi"
import Button from "@/components/ui/Button"
import { FaRegCalendarAlt } from "react-icons/fa"
import {
    EventAndCourse,
    EventAndCourseType,
    getEventsAndCourses,
} from "@/lib/api/ticket/events-and-courses"
import EventsAndCoursesBoxWrraper from "./EventsAndCoursesBoxWrraper"

function EventsAndCoursesDate() {
    const locale = useLocale()
    const searchParams = useSearchParams()

    const typeParam = searchParams.get("type")

    const type: EventAndCourseType =
        typeParam === "courses"
            ? "courses"
            : "events"

    const [selectedDate, setSelectedDate] =
        useState<Date>(new Date())

    const [data, setData] =
        useState<EventAndCourse[]>([])

    const [isLoading, setIsLoading] =
        useState(false)

    const [error, setError] =
        useState(false)

    const monthInputRef =
        useRef<HTMLInputElement>(null)

    function openMonthPicker() {
        monthInputRef.current?.showPicker()
    }

    function changeMonth(amount: number) {
        setSelectedDate((prev) => {
            const newDate = new Date(prev)

            newDate.setMonth(
                newDate.getMonth() + amount
            )

            return newDate
        })
    }

    function handleMonthChange(
        e: ChangeEvent<HTMLInputElement>
    ) {
        if (!e.target.value) {
            return
        }

        const [year, month] =
            e.target.value
                .split("-")
                .map(Number)

        setSelectedDate(
            new Date(
                year,
                month - 1,
                1
            )
        )
    }

    useEffect(() => {
        let isMounted = true

        async function fetchData() {
            setIsLoading(true)
            setError(false)

            const year =
                selectedDate.getFullYear()

            const month =
                String(
                    selectedDate.getMonth() + 1
                ).padStart(2, "0")

            const date =
                `${year}-${month}-01`

            try {
                const response =
                    await getEventsAndCourses(
                        type,
                        date,
                        locale,
                    )

                if (!isMounted) {
                    return
                }

                if (!response.success) {
                    setData([])
                    setError(true)

                    return
                }
                console.log(response)
                setData(
                    response.data ?? []
                )
            } catch {
                if (!isMounted) {
                    return
                }

                setData([])
                setError(true)
            } finally {
                if (isMounted) {
                    setIsLoading(false)
                }
            }
        }

        fetchData()

        return () => {
            isMounted = false
        }
    }, [
        selectedDate,
        type,
        locale,
    ])

    const monthTitle =
        formatMonthYear(
            selectedDate,
            locale
        )

    const inputMonth =
        `${selectedDate.getFullYear()}-${String(
            selectedDate.getMonth() + 1
        ).padStart(2, "0")}`

    return (
        <>
            <div
                className={cn(
                    "w-full",
                    "flex items-center justify-center",
                    "gap-4 py-10",
                )}
            >
                {/* Previous month */}
                <button
                    type="button"
                    onClick={() =>
                        changeMonth(-1)
                    }
                    aria-label="Previous month"
                    className={cn(
                        "flex items-center justify-center",
                        "text-[var(--gold-color)]",
                        "md:p-2 p-1",
                        "rounded-full",
                        "transition-colors",
                        "bg-[var(--crimson-color)]",
                        "hover:bg-[var(--crimson-opacity-color)]",
                        "click-scale",
                    )}
                >
                    <FiChevronLeft
                        size={24}
                    />
                </button>

                {/* Month title */}
                <span
                    className={cn(
                        "min-w-40",
                        "text-center",
                        "md:text-3xl text-xl",
                        "font-semibold",
                        "font-wulkan",
                    )}
                >
                    {monthTitle}
                </span>

                {/* Next month */}
                <Button
                    type="button"
                    onClick={() =>
                        changeMonth(1)
                    }
                    aria-label="Next month"
                    className={cn(
                        "flex items-center justify-center",
                        "text-[var(--gold-color)]",
                        "md:p-2 p-1",
                        "rounded-full",
                        "transition-colors",
                        "bg-[var(--crimson-color)]",
                        "hover:bg-[var(--crimson-opacity-color)]",
                        "click-scale",
                    )}
                >
                    <FiChevronRight
                        size={24}
                    />
                </Button>

                {/* Month picker */}
                <label
                    onClick={openMonthPicker}
                    className={cn(
                        "relative",
                        "fcc",
                        "rounded-full",
                        "transition-colors",
                        "click-scale",
                        "hover:text-[var(--crimson-color)]",
                    )}
                >
                    <FaRegCalendarAlt
                        size={22}
                    />

                    <input
                        ref={monthInputRef}
                        type="month"
                        value={inputMonth}
                        onChange={
                            handleMonthChange
                        }
                        className={cn(
                            "absolute",
                            "inset-0",
                            "w-full",
                            "h-full",
                            "opacity-0",
                        )}
                    />
                </label>
            </div>

            <EventsAndCoursesBoxWrraper
                data={data}
                isLoading={isLoading}
                error={error}
            />
        </>
    )
}

export default EventsAndCoursesDate