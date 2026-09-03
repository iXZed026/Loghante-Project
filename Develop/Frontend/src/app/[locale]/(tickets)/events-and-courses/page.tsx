import EventsAndCoursesDate from '@/features/loghante(root)/tickets/events-and-courses/components/EventsAndCoursesDate'
import EventsAndCoursesHeader from '@/features/loghante(root)/tickets/events-and-courses/components/EventsAndCoursesHeader'
import React from 'react'

function EventsAndCourses() {
  return (
      <div className='py-18'>
        <EventsAndCoursesHeader />
        <EventsAndCoursesDate/>
      </div>
  )
}

export default EventsAndCourses