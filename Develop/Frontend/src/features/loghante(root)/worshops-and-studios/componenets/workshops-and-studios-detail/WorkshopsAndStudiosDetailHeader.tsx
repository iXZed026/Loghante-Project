import AppLink from '@/components/ui/AppLink'
import { WorkshopAndStudio } from '../../data/workshop-and-studios'
import { getLocalizedValue } from '@/lib/utils/getLocalizedValue'
import { useLocale, useTranslations } from 'next-intl'
import React from 'react'

interface IWorkshopsAndStudiosDetailHeader {
    workshop: WorkshopAndStudio
}

function WorkshopsAndStudiosDetailHeader({
    workshop,
}: IWorkshopsAndStudiosDetailHeader) {

    const locale = useLocale()

    const wsAndStdsPageT =
        useTranslations("workshopsAndStudios.page")

    const title = getLocalizedValue(
        workshop.title,
        locale
    )

    const description = getLocalizedValue(
        workshop.description,
        locale
    )

    return (
        <div>

            <div className='fcol gap-15'>

                {/* Image / Video */}
                <div className='w-full h-125 bg-crimson rounded-lg overflow-hidden'>

                    {/* 
                    Add workshop.video here when video paths are available.
                    */}

                </div>

                {/* About WS And Studios */}
                <div className='text-center fcol gap-15'>

                    <div>
                        <span className='font-wulkan lg:text-5xl text-3xl'>
                            {title}
                        </span>
                    </div>

                    <div>
                        <p className='md:w-235 w-full mx-auto text-black-light-utility'>
                            {description}
                        </p>
                    </div>

                    <div className='fcol items-center gap-5'>

                        <AppLink
                            href='/'
                            className='py-4 px-13 bg-crimson text-white-utility rounded-lg'
                        >
                            {wsAndStdsPageT("submit-button")}
                        </AppLink>

                        <a
                            href="tel:02165555555"
                            className="text-crimson font-semibold text-lg py-3 px-5 rounded-lg"
                        >
                            {wsAndStdsPageT("contact")}
                            021-6555555
                        </a>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default WorkshopsAndStudiosDetailHeader