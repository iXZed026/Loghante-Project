import Container from '@/components/shared/Container'
import ProductDetailsHeader from '@/features/shop/products/componenets/product-details/ProductDetailsHeader/ProductDetailsHeader'
import ProductDetailsWorkshop from '@/features/shop/products/componenets/product-details/ProductDetailsWorkshop'
import ProductMoreDetails from '@/features/shop/products/componenets/product-details/ProductMoreDetails'
import React from 'react'

function ProductDetailsPage() {
    return (
        <div
            className='py-32'
        >

            <Container>
                <div className='fcol gap-y-15'>
                    {/* Header */}
                    <ProductDetailsHeader />

                    {/* More Details */}
                    <ProductMoreDetails />

                    {/* Workshps */}
                    <ProductDetailsWorkshop />


                    {/* Like Suggestion */}
                </div>
            </Container>


        </div>
    )
}

export default ProductDetailsPage
