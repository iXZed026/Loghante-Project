import FadeUp from '@/components/animations/FadeUp'
import AppLink from '@/components/ui/AppLink'
import {
    eventsAndCoursesVariant,
} from '@/features/loghante(root)/animations/loghante.variants'
import {
    fastTransitionOut,
} from '@/lib/animations/transitions'
import { cn } from '@/lib/utils/cn'
import {
    EventAndCourse,
    EventSession,
} from '@/lib/api/ticket/events-and-courses'

interface IEventAndCoursesBox {
    event: EventAndCourse
    session: EventSession
}

function EventAndCoursesBox({
    event,
    session,
}: IEventAndCoursesBox) {

    const isPaid =
        session.price !== null &&
        session.price > 0

    return (
        <AppLink
            className="md:col-span-4 sm:col-span-6 col-span-12"
            href={`/events-and-courses/${session.sessionId}`}
        >
            <FadeUp
                transition={fastTransitionOut}
                variants={eventsAndCoursesVariant}
                once
                className={cn(
                    "relative",
                    "rounded-lg",
                    "h-80",
                    "bg-black-light-utility",
                    "cursor-pointer",
                    "hover:scale-97",
                    "transition-all duration-300",
                )}
            >
                {/* Price status */}
                <div
                    className={cn(
                        "absolute top-3 rounded-r-xl",
                        "px-5 py-1.5",
                        isPaid?"bg-gold-utility":"bg-crimson text-white-utility",
                        "font-semibold",
                    )}
                >
                    {isPaid
                        ? "Paid"
                        : "Free"}
                </div>

                {/* Event information */}
                <div
                    className={cn(
                        "absolute bottom-0 rounded-r-xl",
                        "px-5 py-4",
                        "font-semi-bold",
                    )}
                >
                    <span
                        className={cn(
                            "text-white-utility",
                            "text-sm",
                            "font-semibold",
                        )}
                    >
                        {event.name}
                    </span>
                </div>
            </FadeUp>
        </AppLink>
    )
}

export default EventAndCoursesBox