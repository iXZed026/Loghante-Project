import { useTranslations } from 'next-intl'
import React from 'react'
import AboutLoghantehComponent from '../AboutLoghantehComponent'

function AboutMuseums() {

    const t = useTranslations("about")

    return (
        <div className='px-20 min-h-screen  py-30'>
            <AboutLoghantehComponent
                t={t}
                reverse={false}
                title={t("about.title")}
                description={t("about.description")}
            />
            <br /> <br />

            <AboutLoghantehComponent
                t={t}
                reverse={true}
                title={t("history.title")}
                description={t("history.description")}
            />
        </div>
    )
}

export default AboutMuseums