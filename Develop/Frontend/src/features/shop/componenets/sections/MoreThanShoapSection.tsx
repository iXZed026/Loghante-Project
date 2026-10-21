"use client"

import Container from '@/components/shared/Container'
import AppLink from '@/components/ui/AppLink'
import Button from '@/components/ui/Button'
import { useTranslations } from 'next-intl'
import React from 'react'

function MoreThanShoapSection() {

    const t =
        useTranslations("shopMore")



    return (
        <section
            id="new-products"
            className="
                min-h-[50vh] 
                py-22.5
                bg-blue-utility
                text-white-utility
            "
        >
            <Container>


                <div className='fcol md:w-140 w-full gap-y-10'>
                    <div>
                        <h6 className='md:text-5xl text-3xl font-wulkan font-bold '>
                            {t("title")}
                        </h6>
                    </div>
                    <div>
                        <p className='md:text-base text-sm'>
                            {t("description")}
                        </p>
                    </div>
                    <div>
                        <AppLink
                            href='/'
                        >
                            <Button
                                className='
                                border-2
                                 border-white 
                                py-3 
                                px-5 
                                md:text-base 
                                text-sm
                                hover:bg-[var(--white-light-color)]    
                                hover:text-[var(--black-color)]   
                            '
                            >
                                {t("explore-button")}
                            </Button>
                        </AppLink>
                    </div>
                </div>

            </Container>
        </section>
    )
}

export default MoreThanShoapSection
