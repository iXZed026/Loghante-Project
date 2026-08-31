import Container from '@/components/shared/Container'
import MuseumsTourHeaderBox from '@/features/loghante(root)/museums-tour/components/MuseumsTourHeaderBox'
import MuseumsTourTickets from '@/features/loghante(root)/museums-tour/components/tickets/MuseumsTourTickets'


function MuseumsTour() {
  return (
    <Container>
      <div className='py-7.5 xl:px-36'>
        {/* Museums Tout Header */}
        <div className='mb-15'>
          <MuseumsTourHeaderBox />
        </div>
        {/* Museums Tour Tickets */}
          <MuseumsTourTickets />
      </div>
    </Container>
  )
}

export default MuseumsTour