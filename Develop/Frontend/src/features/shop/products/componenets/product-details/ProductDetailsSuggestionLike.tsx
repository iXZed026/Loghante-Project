import ProductBox from '@/features/shop/componenets/ui/ProductBox'
import { cn } from '@/lib/utils/cn'
import React from 'react'

function ProductDetailsSuggestionLike() {
    return (
        <div className='fcol gap-y-10'>
            <div>
                <h6 className='font-wulkan md:text-3xl text-2xl'>
                    You May Also Like
                </h6>
            </div>
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
        </div>
    )
}

export default ProductDetailsSuggestionLike
