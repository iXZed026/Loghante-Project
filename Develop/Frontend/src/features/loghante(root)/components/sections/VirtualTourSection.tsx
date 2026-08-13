import { useTranslations } from 'next-intl'
import React from 'react'
import LoghantehSectionBox from '../LoghantehSectionBox'

function VirtualTourSection() {

    const t = useTranslations("LoghantehVirtualTour")

    return (
        <section id="virtual-tour" className='loghante-section'>
            <LoghantehSectionBox
                sectionName={t("section-name")}
                title={t("title")}
                description={t("description")}
                reverse={true}
                href='/cinema-and-theaters'
            />
        </section>
    )
}

export default VirtualTourSection