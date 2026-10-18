import ShopHeader from '@/features/shop/componenets/shared/ShopHeader'
import React from 'react'
import "@/features/shop/styles/shop.css";

function Shoplayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <ShopHeader />
            <div className='min-h-screen '>
                {children}
                <div className='min-h-screen> '></div>
            </div >
        </>
    )
}

export default Shoplayout
