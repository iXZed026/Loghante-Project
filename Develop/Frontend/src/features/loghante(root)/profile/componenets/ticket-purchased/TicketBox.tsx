import TicketStatus from '../ui/TicketStatus'

function TicketBox() {
    return (
        <div className='grid grid-cols-12 border-2 border-black/20 py-5 lg:px-10 px-5 rounded-lg'>
            <div className='lg:col-span-6 md:col-span-8 col-span-7 flex lg:items-center lg:flex-row flex-col lg:gap-10 gap-y-3'>
                {/* Ticket Name */}
                <span className='lg:text-lg col-span-6'>
                    Loghanteh Museum Tour
                </span>
                {/* Ticket Date */}
                <span className='text-sm text-black-light-utility'>
                    26 August 2026
                </span>
            </div>
            <div className='lg:col-span-6 md:col-span-4 col-span-5 fec'>
                {/* Ticket Status */}
                <TicketStatus status={"upcoming"} />
            </div>
        </div>
    )
}

export default TicketBox