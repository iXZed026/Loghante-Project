import React from 'react'
import ProductBoxexWrraper from './ProductBoxexWrraper'
import ProductBox from './ProductBox'
import AppLink from '@/components/ui/AppLink'
import ArrowIcon from '@/components/shared/ArrowIcon'

interface IRecommendedProducts {
    endPointAPI: string
    title: string,
    description?: string
}

function RecommendedProducts({
    endPointAPI,
    title,
    description
}: IRecommendedProducts) {
    return (
        <div>
            {/* Title */}
            <div className='fbc'>
                <div>
                    <h3 className='font-wulkan text-4xl'>
                        {title}
                    </h3>
                    {description && <h6>{description}</h6>}
                </div>

                <div>
                    <AppLink
                        href='/products'
                        className='
                            fcc 
                            px-3 py-2 
                            text-sm hover:text-[var(--black-light-color)]
                            transition-colors
                        '
                    >
                        <span>
                            View all Products
                        </span>
                        <ArrowIcon />
                    </AppLink>
                </div>
            </div>

            {/* Product Boxes Wrraper */}
            <ProductBoxexWrraper
                endPointAPI={endPointAPI}
            >
                <ProductBox />
                <ProductBox />
                <ProductBox />
                <ProductBox />
                <ProductBox />
            </ProductBoxexWrraper>

        </div>
    )
}

export default RecommendedProducts
