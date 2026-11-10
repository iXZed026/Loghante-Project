import React from 'react'
import { IProductCategory } from '../../data/productCategories'
import { getLocalizedValue } from '@/lib/utils/getLocalizedValue'
import { useLocale } from 'next-intl'
import AppLink from '@/components/ui/AppLink'


function ShopCategoryBox(props: IProductCategory) {
    return (
        <AppLink
            href={`/shop/products?category=${props.id}`}
            scroll={true}
            className="
                col-span-1
                fcol
                gap-y-5
                transition duration-400
                hover:scale-110
            "
        >

            {/* Image */}
            <div className='fcc'>
                <div className='md:p-11 p-9 bg-blue-utility rounded-full'>

                </div>
            </div>

            {/* Name */}
            <div className='md:text-sm text-xs font-semibold text-center'>
                <h6>
                    {
                        getLocalizedValue(props.name, useLocale())
                    }
                </h6>
            </div>

        </AppLink>
    )
}

export default ShopCategoryBox
