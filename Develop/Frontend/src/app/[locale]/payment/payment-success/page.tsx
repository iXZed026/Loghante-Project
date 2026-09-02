import Container from '@/components/shared/Container'
import PaymentSuccessHeader from '@/features/loghante(root)/payment/payment-success/components/PaymentSuccessHeader'
import React from 'react'

function PaymentSuccess() {
  return (
    <div className='py-15'>
      <Container>
        <div className='fcol gap-10'>
          <PaymentSuccessHeader />
        </div>
      </Container>
    </div>
  )
}

export default PaymentSuccess