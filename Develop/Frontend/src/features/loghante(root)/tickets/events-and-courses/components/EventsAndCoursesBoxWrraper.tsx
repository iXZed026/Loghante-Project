import Container from '@/components/shared/Container'
import StaggerWrapper from '@/components/animations/StaggerWrapper'
import {
    eventsAndCoursesContainerVariant,
} from '@/features/loghante(root)/animations/loghante.variants'
import { cn } from '@/lib/utils/cn'
import {
    EventAndCourse,
} from '@/lib/api/ticket/events-and-courses'
import EventAndCoursesBox from './EventAndCoursesBox'

interface IEventsAndCoursesBoxWrraper {
    data: EventAndCourse[]
    isLoading: boolean
    error: boolean
}

function EventsAndCoursesBoxWrraper({
    data,
    isLoading,
    error,
}: IEventsAndCoursesBoxWrraper) {

    if (isLoading) {
        return (
            <div className="text-center py-10">
                Loading...
            </div>
        )
    }

    if (error) {
        return (
            <div className="text-center py-10">
                Failed to load events.
            </div>
        )
    }

    const sessions = data.flatMap(
        (event) =>
            event.sessions.map((session) => ({
                event,
                session,
            }))
    )

    if (sessions.length === 0) {
        return (
            <div className="text-center py-10">
                No events or courses available.
            </div>
        )
    }

    return (
        <Container>
            <StaggerWrapper
                className={cn(
                    "grid grid-cols-12 gap-5 lg:px-45",
                )}
                variants={
                    eventsAndCoursesContainerVariant
                }
                amount={0.3}
                once
            >
                {sessions.map(
                    ({ event, session }) => (
                        <EventAndCoursesBox
                            key={session.sessionId}
                            event={event}
                            session={session}
                        />
                    )
                )}
            </StaggerWrapper>
        </Container>
    )
}

export default EventsAndCoursesBoxWrraper