import FadeUp from '@/components/animations/FadeUp'
import AppLink from '@/components/ui/AppLink'
import { defaultTransitionOut, fastTransitionOut, verySlowTransitionOut } from '@/lib/animations/transitions'
import { cn } from '@/lib/utils/cn'
import React from 'react'
import { MdOutlineReduceCapacity } from 'react-icons/md'
import { conferenceHallVariant } from '../../animations/loghante.variants'

function ConferenceHallSpaceBox() {
    return (
        <FadeUp
            variants={conferenceHallVariant}
            transition={fastTransitionOut}
            className={cn(
                "lg:col-span-4 sm:col-span-6 col-span-12",
                "min-h-125",
                "shadow-lg",
                "rounded-lg",
                "overflow-hidden",
            )}
            once
            y={100}
            amount={0.3}
        >
            <div>
                {/* Images */}
                <div>
                    <div className='w-full bg-crimson h-50' />
                </div>

                {/* Body */}
                <div className='text-center p-5 fcol gap-y-8 text-crimson'>

                    <div className='text-black-utility'>
                        <span className='text-center font-semibold'>
                            Fathali Shahi Garden
                        </span>
                    </div>

                    <div className='fbc'>
                        <div className='fcc gap-1'>
                            <span>
                                <MdOutlineReduceCapacity />
                            </span>

                            <span>
                                Capacity
                            </span>
                        </div>

                        <div>
                            <span>
                                300 people
                            </span>
                        </div>
                    </div>

                    <div className='fbc'>
                        <div className='fcc gap-1'>
                            <span>
                                <MdOutlineReduceCapacity />
                            </span>

                            <span>
                                Area
                            </span>
                        </div>

                        <div>
                            <span>
                                1200 square meters
                            </span>
                        </div>
                    </div>

                    <div className='fbc'>
                        <div className='fcc gap-1'>
                            <span>
                                <MdOutlineReduceCapacity />
                            </span>

                            <span>
                                Layout
                            </span>
                        </div>

                        <div>
                            <span>
                                Types of layouts
                            </span>
                        </div>
                    </div>

                </div>

                {/* Button */}
                <div className='fcc'>
                    <AppLink
                        href='/'
                        className={cn(
                            "text-sm",
                            "bg-crimson",
                            "px-3 py-2.5",
                            "rounded-lg",
                            "text-white-utility",
                            "hover:bg-[var(--crimson-opacity-color)]",
                            "transition-colors",
                            "click-scale"
                        )}
                    >
                        View details
                    </AppLink>
                </div>
            </div>
        </FadeUp>
    )
}

export default ConferenceHallSpaceBox