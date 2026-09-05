import Container from "@/components/shared/Container"
import EventsAndCoursesDetailsAbout from "@/features/loghante(root)/tickets/events-and-courses/events-and-courses-details/componenets/EventsAndCoursesDetailsAbout"
import EventsAndCoursesDetailsHeader from "@/features/loghante(root)/tickets/events-and-courses/events-and-courses-details/componenets/EventsAndCoursesDetailsHeader"

function EventsAndCoursesDetails() {
    return (
        <Container>
            <div className='mt-20 xl:px-25 sm:px-10 py-18 fcol gap-y-10'>
                <EventsAndCoursesDetailsHeader />
                <EventsAndCoursesDetailsAbout />
            </div>
        </Container>
    )
}

export default EventsAndCoursesDetails  