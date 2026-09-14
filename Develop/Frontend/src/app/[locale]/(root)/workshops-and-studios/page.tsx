import FadeUp from '@/components/animations/FadeUp'
import Container from '@/components/shared/Container'
import WorkShopAndStudiosBox from '@/features/loghante(root)/worshops-and-studios/componenets/WorkShopAndStudiosBox'
import { slowTransitionOut } from '@/lib/animations/transitions'
import { cn } from '@/lib/utils/cn'
import React from 'react'

function WorkshopsAndStudios() {
    return (
        <Container>
            <div className={cn(
                "mt-20 py-20",
                "min-h-screen",
                "lg:px-30",
            )}>

                {/* Header */}
                <div className='fcol gap-10 text-center mb-20'>
                    <FadeUp
                        transition={slowTransitionOut}
                        y={40}
                        amount={0.6}
                        once
                    >
                        <h2 className='font-wulkan font-bold md:text-5xl text-3xl text-crimson'>
                            Loghanteh Workshops and studios
                        </h2>
                    </FadeUp>
                    <FadeUp
                        transition={slowTransitionOut}
                        y={60}
                        once
                    >
                        <h6 className='md:text-lg text-sm font-medium lg:w-165 mx-auto text-black-light-utility'>
                            Step into the diverse world of Loghanteh Workshops and studios and discover a new story every time.
                        </h6>
                    </FadeUp>
                </div>

                {/* Boxes */}
                <div className={cn(
                    "grid grid-cols-12 gap-5"
                )}>

                    {/* WS And Studios Boxe */}
                    <WorkShopAndStudiosBox />
                    <WorkShopAndStudiosBox />
                    <WorkShopAndStudiosBox />
                    <WorkShopAndStudiosBox />
                </div>
            </div >
        </Container>
    )
}

export default WorkshopsAndStudios