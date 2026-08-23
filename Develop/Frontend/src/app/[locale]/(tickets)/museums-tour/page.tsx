import Container from '@/components/shared/Container'
import MuseumsTourHeaderBox from '@/features/museums-tour/components/MuseumsTourHeaderBox'
import MuseumsTourTickets from '@/features/museums-tour/components/tickets/MuseumsTourTickets'

function MuseumsTour() {
  return (
    <Container>
      <div className='py-7.5 px-36'>
        {/* Museums Tout Header */}
        <div className='mb-30'>
          <MuseumsTourHeaderBox />
        </div>
        {/* Museums Tour Tickets */}
        <MuseumsTourTickets />
      </div>
    </Container>
  )
}

export default MuseumsTour