import Container from '@/components/shared/Container'
import CartItemWrraper from '@/features/shop/cart/componenets/CartItemWrraper'
import CartOrderOverview from '@/features/shop/cart/componenets/CartOrderOverview'
import CartPaymentRules from '@/features/shop/cart/componenets/CartPaymentRules'
import React from 'react'

function CartPage() {
    return (
        <div className='py-27'>

            <Container>
                <div className='fcol gap-y-15'>
                    {/* Cart Header */}
                    <div className='grid grid-cols-12 gap-5'>
                        <CartItemWrraper />
                        <CartOrderOverview />
                    </div>

                    {/* Cart Payment Rules */}
                    <div className='grid grid-cols-12 gap-5'>
                        <CartPaymentRules />
                    </div>
                </div>
            </Container>

        </div>
    )
}

export default CartPage
