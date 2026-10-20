"use client"

import Container from '@/components/shared/Container'
import Button from '@/components/ui/Button'
import React from 'react'

function MoreThanShoapSection() {

    console.log("More initial")



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
                                More Than a Shop
                            </h6>
                        </div>
                        <div>
                            <p>
                                Discover Loghanteh — a historical and cultural complex bringing together museums, cafés, exhibitions, cultural spaces and unique experiences.
                            </p>
                        </div>
                        <div>
                            <Button
                                className='border-2 border-white py-3 px-5'
                            >
                                Explore Loghanteh
                            </Button>
                        </div>
                    </div>

            </Container>
        </section>
    )
}

export default MoreThanShoapSection
