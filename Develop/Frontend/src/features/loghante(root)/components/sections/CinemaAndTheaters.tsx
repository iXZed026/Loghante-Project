import React from 'react'
import LoghantehSectionBox from '../LoghantehSectionBox'
import { useTranslations } from 'next-intl'

function CinemaAndTheaters() {

    const t = useTranslations("LoghantehCinemaAndTheaters")

    return (
        <section id="cinema-and-theaters" className='loghante-section'>
            <LoghantehSectionBox
                sectionName={t("section-name")}
                title={t("title")}
                description={t("description")}
                href='/cinema-and-theaters'
            />
        </section>
    )
}

export default CinemaAndTheaters