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
                <div className='fcol gap-y-5 md:w-130 w-full'>
                    <h3 className='font-wulkan sm:text-4xl text-3xl font-bold'>
                        {title}
                    </h3>
                    {description &&
                        <h6 className='text-black-light-utility sm:text-base text-sm'>
                            {description}
                        </h6>}
                </div>

                <div className='md:w-auto w-4/6'>
                    <AppLink
                        href='/products'
                        className='
                            fec 
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
                <ProductBox />
                <ProductBox />
            </ProductBoxexWrraper>

        </div>
    )
}

export default RecommendedProducts
