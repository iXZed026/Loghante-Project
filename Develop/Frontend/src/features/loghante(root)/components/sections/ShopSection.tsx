import React from 'react'
import LoghantehSectionBox from '../LoghantehSectionBox'
import { useTranslations } from 'next-intl'

function ShopSection() {

    const t = useTranslations("LoghantehShop")

    return (
        <section className='loghante-section'>
            <LoghantehSectionBox
                sectionName={t("section-name")}
                title={t("title")}
                description={t("description")}
                reverse={true}
            />
        </section>
    )
}

export default ShopSection