"use client"
import EventsAndCoursesHeaderImages from './EventsAndCoursesHeaderImages'
import EventsAndCoursesHeaderForm from './EventsAndCoursesHeaderForm'

function EventsAndCoursesDetailsHeader() {
    return (
        <div className='grid grid-cols-12 lg:gap-10 gap-y-10'>
            {/*Events Images */}
            <EventsAndCoursesHeaderImages />
            {/* Events Details */}
            <EventsAndCoursesHeaderForm />
        </div>
    )
}

export default EventsAndCoursesDetailsHeader