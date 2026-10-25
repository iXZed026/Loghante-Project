"use client"

import Container from '@/components/shared/Container'
import AppLink from '@/components/ui/AppLink'
import Button from '@/components/ui/Button'
import { useTranslations } from 'next-intl'
import React from 'react'
import ShopDiscoverComponenet from '../ui/ShopDiscoverComponenet'

function MoreThanShoapSection() {

    const t =
        useTranslations("shopMore")



    return (
        <section
            id="new-products"
        >
            <ShopDiscoverComponenet
                title={t("title")}
                description={t("description")}
                button={t("explore-button")}
                href='/'
            />
        </section>
    )
}

export default MoreThanShoapSection
