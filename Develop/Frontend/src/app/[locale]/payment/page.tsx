import FadeUp from '@/components/animations/FadeUp'
import Container from '@/components/shared/Container'
import PaymentDetails from '@/features/loghante(root)/payment/PaymentDetails'
import PaymentTicketInfo from '@/features/loghante(root)/payment/PaymentTicketInfo'
import { cn } from '@/lib/utils/cn'

function Payment() {

  //fetching ticket data("here is server component")

  return (
    <FadeUp>
      <Container>
        <div
          className={cn(
            "grid grid-cols-12 lg:gap-15 gap-5",
            "py-7.5",
            "w-full max-w-full",
            "min-w-0",
            "overflow-x-hidden",
          )}
        >
          <PaymentTicketInfo />
          <PaymentDetails />
        </div>
      </Container>
    </FadeUp>
  )
}

export default Payment