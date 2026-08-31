import Container from '@/components/shared/Container'
import PaymentDetails from '@/features/loghante(root)/payment/PaymentDetails'
import PaymentTicketInfo from '@/features/loghante(root)/payment/PaymentTicketInfo'
import { cn } from '@/lib/utils/cn'
import React from 'react'

function Payment() {
  return (
    <Container>
      <div className={cn(
        "grid grid-cols-12 gap-5",
        "py-8",
      )}>
        <PaymentTicketInfo />
        <PaymentDetails />
      </div>
    </Container>
  )
}

export default Payment