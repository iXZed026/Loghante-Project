import ShopDiscoverComponenet from '@/features/shop/componenets/ui/ShopDiscoverComponenet'
import { useTranslations } from 'next-intl'
import React from 'react'

function ProductDetailsWorkshop() {

    const t =
        useTranslations("shopProductDetails.workshop")

    return (
        <div className='rounded-lg'>
            <ShopDiscoverComponenet
                title={t("title")}
                description={t("description")}
                button={t("explore-button")}
                href={"/workshops-and-studios"}
            />
        </div>
    )
}

export default ProductDetailsWorkshop
