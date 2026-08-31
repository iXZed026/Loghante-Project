import React from 'react'
import MuseumsTourDayOfWeekBox from './MuseumsTourDayOfWeekBox'
import MuseumsTourTicketBox from './MuseumsTourTicketBox'
import StaggerWrapper from '@/components/animations/StaggerWrapper'
import { dayOfTheWeeksContainerVariant } from '@/features/loghante(root)/animations/loghante.variants'
import { useTranslations } from 'next-intl'

function MuseumsTourTickets() {

    const DayOFTheWeeksT =
        useTranslations("museumsTour.day-of-the-weeks")

    return (
        <div className='fcol gap-6'>
            <div>
                <h3 className='text-xl'>
                    {
                        DayOFTheWeeksT("title")
                    }
                </h3>
            </div>
            <div className="w-full overflow-y-hidden overflow-x-auto xl:overflow-x-visible">
                <StaggerWrapper
                    variants={dayOfTheWeeksContainerVariant}
                    className="grid grid-cols-7 gap-5 min-w-[1000px] xl:min-w-0 py-2"
                >
                    <MuseumsTourDayOfWeekBox />
                </StaggerWrapper>
            </div>
            <div className='grid grid-cols-12 gap-10 xl:px-20'>
                <MuseumsTourTicketBox />
                <MuseumsTourTicketBox />
                <MuseumsTourTicketBox />
                <MuseumsTourTicketBox />
            </div>
        </div>
    )
}

export default MuseumsTourTickets