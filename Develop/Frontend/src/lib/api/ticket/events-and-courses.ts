import { fetcher } from "../fetcher";

export interface EventAndCourseSessionResponse {
    sessionId: number;
    eventId: number;
    name: string;
    primaryDescription: string;
    secondaryDescription: string;
    startAt: string;
    durationM: number;
    capacity: number;
    price: number | null;
}

export interface EventAndCourseResponse {
    data: EventAndCourseSessionResponse[];
    message: string;
    success: boolean;
}

export async function getEventAndCourseSessions(
    date: string,
    locale: string,
): Promise<EventAndCourseResponse> {
    return fetcher<EventAndCourseResponse>(
        `/tickets/events-and-courses?date=${encodeURIComponent(date)}`,
        {
            method: "GET",
        },
        locale,
    );
}