import FadeIn from '@/components/animations/FadeIn'
import FadeUp from '@/components/animations/FadeUp'
import { slowTransitionOut, verySlowTransitionOut } from '@/lib/animations/transitions'
import { cn } from '@/lib/utils/cn'
import React from 'react'

function ConferenceHallHeader() {
    return (
        <div
            className={cn(
                "flex lg:flex-row flex-col justify-center items-center gap-5 gap-y-10",
            )}
        >
            {/* Image */}
            <div className='w-full fcc'>
                <FadeIn
                className='w-full'
                    transition={verySlowTransitionOut}
                    once
                >
                    <div
                        className='bg-crimson rounded-lg lg:w-100 w-full h-100'
                    >

                    </div>
                </FadeIn>
            </div>
            {/* Content */}
            <div className='fcol gap-y-20 lg:text-start text-center w-full'>
                <div>
                    <FadeUp
                        transition={verySlowTransitionOut}
                        y={100}
                        once
                    >
                        <h3 className='font-wulkan md:text-5xl text-3xl font-bold'>
                            Conference Halls
                        </h3>
                    </FadeUp>
                </div>
                <div>
                    <FadeUp
                        transition={slowTransitionOut}
                        y={60}
                        once
                    >
                        <p className='text-black-light-utility'>
                            Loghanteh Complex, with its diverse spaces and advanced equipment, is ready to host your events, conferences, and ceremonies.
                        </p>
                    </FadeUp>
                </div>
            </div>
        </div>
    )
}

export default ConferenceHallHeader