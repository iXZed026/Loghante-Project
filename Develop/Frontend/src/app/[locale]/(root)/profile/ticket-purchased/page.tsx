import FadeUp from '@/components/animations/FadeUp'
import TicketBox from '@/features/loghante(root)/profile/componenets/ticket-purchased/TicketBox'

function page() {
    return (
        <FadeUp>
            <div>
                {/* Ticket Purchased Header */}
                <div className='mb-18'>
                    <h2 className='font-medium md:text-4xl text-2xl'>
                        Ticket purchased
                    </h2>
                </div>
                {/* Tickets  */}
                <div className='fcol gap-5 xl:px-20 '>
                    {/* Ticket Box */}
                    <TicketBox />
                    <TicketBox />
                    <TicketBox />
                    <TicketBox />
                </div>
            </div>
        </FadeUp>
    )
}

export default page