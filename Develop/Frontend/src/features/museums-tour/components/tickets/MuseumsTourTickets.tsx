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
            <div className='grid grid-cols-7 gap-5'>
                <MuseumsTourDayOfWeekBox />
            </div>
            <div className='grid grid-cols-12 gap-10 px-20'>
                <MuseumsTourTicketBox />
                <MuseumsTourTicketBox />
                <MuseumsTourTicketBox />
                <MuseumsTourTicketBox />
            </div>
        </div>
    )
}

export default MuseumsTourTickets