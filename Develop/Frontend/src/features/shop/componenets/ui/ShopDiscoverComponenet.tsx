import Container from '@/components/shared/Container';
import AppLink from '@/components/ui/AppLink'
import Button from '@/components/ui/Button'
import React from 'react'

interface IShopDiscoverComponenet {
    title: string;
    description: string;
    button: string
    href:string
}

function ShopDiscoverComponenet({
    title,
    description,
    button,
    href
}: IShopDiscoverComponenet) {
    return (

        <div
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
                            {title}
                        </h6>
                    </div>
                    <div>
                        <p className='md:text-base text-sm'>
                            {description}
                        </p>
                    </div>
                    <div>
                        <AppLink
                            href={href}
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
                                {button}
                            </Button>
                        </AppLink>
                    </div>
                </div>

            </Container>
        </div>

    )
}

export default ShopDiscoverComponenet
