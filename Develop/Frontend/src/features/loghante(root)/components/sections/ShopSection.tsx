import React from 'react'
import LoghantehSectionBox from '../LoghantehSectionBox'
import { useTranslations } from 'next-intl'

function ShopSection() {

    const t = useTranslations("LoghantehShop")

    return (
        <section id="shop" className='loghante-section'>
            <LoghantehSectionBox
                sectionName={t("section-name")}
                title={t("title")}
                description={t("description")}
                reverse={true}
                href='/shop'
            />
        </section>
    )
}

export default ShopSection