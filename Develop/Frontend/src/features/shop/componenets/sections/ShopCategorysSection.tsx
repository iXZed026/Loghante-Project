import ArrowIcon from '@/components/shared/ArrowIcon'
import AppLink from '@/components/ui/AppLink'
import React from 'react'
import ShopCategoryBox from '../ShopCategorys/ShopCategoryBox'
import { productCategories } from '../../data/productCategories'
import { useTranslations } from 'next-intl'

function ShopCategorysSection() {

    const t =
        useTranslations("shopCategorys")


    return (
        <section
            id="new-products"
            className="
                min-h-[50vh] 
                py-22.5
            "
        >
            {/* Header */}
            <div className='fbc mb-20'>
                <div className='fcol gap-y-5 md:w-130 w-full'>
                    <h3 className='font-wulkan sm:text-4xl text-3xl font-bold'>
                        {t("title")}
                    </h3>
                    <h6 className='text-black-light-utility sm:text-base text-sm'>
                        {t("description")}
                    </h6>
                </div>

            </div>

            {/* Categorys */}
            <div
                className='grid xl:grid-cols-12 md:grid-cols-6 grid-cols-3  md:gap-2 gap-5'
            >
                {productCategories.map(catgory => (
                    <ShopCategoryBox
                        {...catgory}
                        key={catgory.id}
                    />
                )
                )}
            </div>
        </section>
    )
}

export default ShopCategorysSection
