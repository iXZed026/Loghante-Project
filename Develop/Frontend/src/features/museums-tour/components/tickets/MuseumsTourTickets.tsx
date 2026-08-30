import React from 'react'
import MuseumsTourDayOfWeekBox from './MuseumsTourDayOfWeekBox'
import MuseumsTourTicketBox from './MuseumsTourTicketBox'

function MuseumsTourTickets() {
    return (
        <div className='fcol gap-6'>
            <div>
                <h3 className='text-xl'>
                    Choose a date and buy a ticket
                </h3>
            </div>
            <div className="w-full overflow-x-auto xl:overflow-x-visible">
                <div className="grid grid-cols-7 gap-5 min-w-[1000px] xl:min-w-0 py-2">
                    <MuseumsTourDayOfWeekBox />
                </div>
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