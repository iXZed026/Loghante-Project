import Container from '@/components/shared/Container'
import ShopFIltersWrraper from '@/features/shop/products/componenets/ShopFIltersWrraper'
import ShopProductsWrraper from '@/features/shop/products/componenets/ShopProductsWrraper'
import React from 'react'

function ProductsPage() {
    return (
        <Container>
            <div
                className='grid grid-cols-12 gap-5 py-27'
            >
                <ShopFIltersWrraper />
                <ShopProductsWrraper />
            </div>
        </Container>
    )
}

export default ProductsPage
