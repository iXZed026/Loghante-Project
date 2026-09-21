import { fetcher } from "@/lib/api/fetcher"

export type EventAndCourseType =
    | "events"
    | "courses"

export interface EventImage {
    imageUrl: string
    displayOrder: number
}

export interface EventSeat {
    seatId: number
    rowLabel: string
    seatNumber: number
    isBooked: boolean
}

export interface EventHall {
    hallId: number
    name: string
    description: string
}

export interface EventSession {
    sessionId: number
    eventId: number
    hall: EventHall
    startAt: string
    duration: number
    capacity: number
    price: number | null
    seats: EventSeat[]
}

export interface EventAndCourse {
    eventId: number
    name: string
    description: string
    images: EventImage[]
    sessions: EventSession[]
}

export interface EventAndCourseResponse {
    data: EventAndCourse[]
    message: string
    success: boolean
}

export async function getEventsAndCourses(
    type: EventAndCourseType,
    date: string,
    locale: string,
): Promise<EventAndCourseResponse> {
    return fetcher<EventAndCourseResponse>(
        `/tickets/${type}?date=${encodeURIComponent(date)}`,
        {
            method: "GET",
        },
        locale,
    )
}