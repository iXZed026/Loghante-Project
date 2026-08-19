import React from 'react'
import LoghantehSectionBox from '../LoghantehSectionBox'
import { useTranslations } from 'next-intl'

function ConferenceHall() {

    const t = useTranslations("LoghantehCinemaAndTheaters")
    //common.json
    const cmT = useTranslations("common")

    return (
        <section id="cinema-and-theaters" className='loghante-section'>
            <LoghantehSectionBox
                sectionName={t("section-name")}
                title={t("title")}
                description={t("description")}
                href='/cinema-and-theaters'
                textButton={cmT("button.show-more")}
                reverse={true}
            />
        </section>
    )
}

export default ConferenceHall