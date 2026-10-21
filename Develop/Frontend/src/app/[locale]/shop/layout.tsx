import ShopHeader from '@/features/shop/componenets/ShopHeader/ShopHeader'
import React from 'react'
import '@/features/shop/styles/shop.css'
import Footer from '@/components/shared/footer/Footer'

function Shoplayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="shop-layout">
            <ShopHeader />

            <div className="min-h-screen">
                {children}
            </div>

            <Footer
                initial
                background='var(--blue-color)'
            />
        </div>
    )
}

export default Shoplayout