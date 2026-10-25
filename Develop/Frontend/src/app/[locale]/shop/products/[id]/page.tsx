import Container from '@/components/shared/Container'
import ProductBox from '@/features/shop/componenets/ui/ProductBox'
import ProductBoxexWrraper from '@/features/shop/componenets/ui/ProductBoxexWrraper'
import ProductDetailsHeader from '@/features/shop/products/componenets/product-details/ProductDetailsHeader/ProductDetailsHeader'
import ProductDetailsWorkshop from '@/features/shop/products/componenets/product-details/ProductDetailsWorkshop'
import ProductMoreDetails from '@/features/shop/products/componenets/product-details/ProductMoreDetails'
import { cn } from '@/lib/utils/cn'
import React from 'react'

function ProductDetailsPage() {
    return (
        <div
            className='py-32'
        >

            <div className='fcol gap-y-15'>
                <Container>
                    <div className='fcol gap-y-15'>
                    {/* Header */}
                    <ProductDetailsHeader />

                    {/* More Details */}
                    <ProductMoreDetails />
                    </div>
                </Container>

                {/* Workshps */}
                <ProductDetailsWorkshop />


                {/* Like Suggestion */}

                <Container>
                    <div
                        className={cn(
                            "grid lg:grid-cols-12 grid-cols-6 lg:gap-3"
                        )}
                    >
                        <ProductBox
                            col={"3"}
                        />
                        <ProductBox
                            col={"3"}
                        />
                        <ProductBox
                            col={"3"}
                        />
                        <ProductBox
                            col={"3"}
                        />
                    </div>
                </Container>

            </div>


        </div>
    )
}

export default ProductDetailsPage
