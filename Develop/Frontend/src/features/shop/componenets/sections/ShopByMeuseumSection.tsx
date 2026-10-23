"use client"

import RecommendedProducts from '../ui/RecommendedProducts'
import ShopMeuseumsBox from '../ui/ShopMeuseumsBox'
import { cn } from '@/lib/utils/cn'
import { museumParts } from '@/features/loghante(root)/data/museumParts'
import { useLocale, useTranslations } from 'next-intl'
import { getLocalizedValue } from '@/lib/utils/getLocalizedValue'

function ShopByMeuseumSection() {

    const t =
        useTranslations("shopMusesums")

    return (
        <section
            id="shop-meuseum"
            className="min-h-[70vh] py-22.5"
        >
            <div>
                {/* Title */}
                <div className='fbc min-h-20 mb-20'>
                    <div className='fcol gap-y-5 md:w-130 w-full'>
                        <h3 className='font-wulkan sm:text-4xl text-3xl font-bold'>
                            {t("title")}
                        </h3>
                        <h6 className='text-black-light-utility sm:text-base text-sm'>
                            {t("description")}
                        </h6>
                    </div>

                </div>

                {/* Boxes Wrraper */}
                <div
                    className={cn(
                        "grid grid-cols-12 gap-4",
                    )}
                >
                    {museumParts.map(museum => (
                        <ShopMeuseumsBox
                            key={museum.id}
                            title={getLocalizedValue(museum.name, useLocale())}
                            imageURL={museum.imageURL}
                        />
                    ))}
                </div>

            </div>

        </section>
    )
}

export default ShopByMeuseumSection
