import React from 'react'
import LoghantehSectionBox from '../LoghantehSectionBox'
import { useTranslations } from 'next-intl'

function EventsAndCoursesSection() {

    const t = useTranslations("LoghantehEventsAndCourses")

    return (
        <section id="events-and-courses" className='loghante-section'>
            <LoghantehSectionBox
                sectionName={t("section-name")}
                title={t("title")}
                description={t("description")}
                href="/events-and-courses"
            />
        </section>
    )
}

export default EventsAndCoursesSection