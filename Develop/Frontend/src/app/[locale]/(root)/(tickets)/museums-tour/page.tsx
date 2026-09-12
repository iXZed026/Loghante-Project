import Container from '@/components/shared/Container'
import MuseumsTourHeaderBox from '@/features/loghante(root)/tickets/museums-tour/components/MuseumsTourHeaderBox'
import MuseumsTourTickets from '@/features/loghante(root)/tickets/museums-tour/components/tickets/MuseumsTourTickets'



function MuseumsTour() {
  return (
    <Container>
      <div className='xl:px-36 py-18 mt-20'>
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