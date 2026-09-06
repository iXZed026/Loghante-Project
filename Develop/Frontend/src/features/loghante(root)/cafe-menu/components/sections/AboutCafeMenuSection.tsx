import FadeUp from '@/components/animations/FadeUp'
import { slowTransitionOut, verySlowTransitionOut } from '@/lib/animations/transitions'
import { cn } from '@/lib/utils/cn'
import React from 'react'

function AboutCafeMenuSection() {
    return (
        <div
            className='min-h-screen grid grid-cols-12 lg:gap-15 gap-y-15 py-20'
        >

            {/* Image */}
            <FadeUp
                once
                transition={verySlowTransitionOut}
                y={100}
                className={cn(
                    "lg:col-span-6 col-span-12",
                    "fcc",
                )}
            >
                <div className='w-130 h-130 rounded-xl bg-crimson' />
            </FadeUp >

            {/* Content */}
            <div
                className={
                    cn(
                        "lg:col-span-6 col-span-12",
                        "fcc"
                    )
                }
            >
                <div className='lg:w-130 lg:text-start text-center fcol gap-15'>
                    <FadeUp
                        once
                        transition={slowTransitionOut}
                        y={40}
                        amount={0.6}
                    >
                        <h3 className='md:text-5xl text-3xl font-bold font-wulkan leading-15'>
                            A Warm space Inside Loghanteh
                        </h3>
                    </FadeUp>
                    <FadeUp
                        once
                        transition={slowTransitionOut}
                        y={60}
                    >
                        <p className='md:text-base text-sm text-black-light-utility'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint .
                        </p>
                    </FadeUp>
                </div>
            </div >
        </div >
    )
}

export default AboutCafeMenuSection