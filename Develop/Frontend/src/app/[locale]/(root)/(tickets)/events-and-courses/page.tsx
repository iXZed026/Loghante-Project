import EventsAndCoursesDate from '@/features/loghante(root)/tickets/events-and-courses/components/EventsAndCoursesDate'
import EventsAndCoursesHeader from '@/features/loghante(root)/tickets/events-and-courses/components/EventsAndCoursesHeader'

function EventsAndCourses() {
  return (
    <div className='py-18 mt-20'>
      <EventsAndCoursesHeader />
      <EventsAndCoursesDate />
    </div>
  )
}

export default EventsAndCourses