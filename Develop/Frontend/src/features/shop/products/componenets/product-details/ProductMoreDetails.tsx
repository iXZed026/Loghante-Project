import { useTranslations } from 'next-intl'
import React from 'react'

function ProductMoreDetails() {

    const t =
        useTranslations("shopProductDetails.more-details")

    return (
        <div className='fcol gap-y-15 md:px-10'>

            {/* Title */}
            <div>
                <h6 className='text-2xl font-bold'>
                    {t("title")}
                </h6>
            </div>

            {/* Details */}

            <div className='md:text-base text-sm text-black-light-utility fcol gap-y-5'>
                <div className='fbc'>
                    <span>
                        {t("material")}
                    </span>
                    <span>
                        Glass, Gold plated
                    </span>
                </div>
                <div className='fbc'>
                    <span>
                        {t("dimensions")}
                    </span>
                    <span>
                        12 cm X 5 cm
                    </span>
                </div>
                <div className='fbc'>
                    <span>
                        {t("height")}
                    </span>
                    <span>
                        250g
                    </span>
                </div>
                <div className='fbc'>
                    <span>
                        {t("year")}
                    </span>
                    <span>
                        Qajar dynasty (19th century)
                    </span>
                </div>
                <div className='fbc'>
                    <span>
                        {t("origin")}
                    </span>
                    <span>
                        Iran
                    </span>
                </div>
                <div className='fbc'>
                    <span>
                        {t("skU")}
                    </span>
                    <span>
                        LP-PRF-001
                    </span>
                </div>
                <div className='fbc'>
                    <span>
                        {t("availability")}
                    </span>
                    <span>
                        In Stock
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ProductMoreDetails
