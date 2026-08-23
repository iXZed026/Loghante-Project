import React from 'react'
import MuseumsTourDayOfWeekBox from './MuseumsTourDayOfWeekBox'
import MuseumsTourTicketBox from './MuseumsTourTicketBox'

function MuseumsTourTickets() {
    return (
        <div className='fcol gap-6'>
            <div className='grid grid-cols-7 gap-5'>
                <MuseumsTourDayOfWeekBox />
            </div>
            <MuseumsTourTicketBox />
        </div>
    )
}

export default MuseumsTourTickets