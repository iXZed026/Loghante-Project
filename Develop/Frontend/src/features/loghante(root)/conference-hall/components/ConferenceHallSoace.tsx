import { cn } from '@/lib/utils/cn'
import React from 'react'
import ConferenceHallSpaceBox from './ConferenceHallSpaceBox'
import StaggerWrapper from '@/components/animations/StaggerWrapper'
import { conferenceHallContainerVariant } from '../../animations/loghante.variants'

function ConferenceHallSoace() {
    return (
        <div>
            {/* Header */}
            <div className='fcol gap-y-10 text-center mb-10'>
                <h6 className='font-wulkan lg:text-5xl text-3xl'>
                    Choose your space
                </h6>
                <span className='text-lg font-medium text-black-light-utility'>
                    Find your desired salon to learn about details of facilities and prices.
                </span>
            </div>
            {/* Conference Hall Space Boxes */}
            <StaggerWrapper
                key={1}
                variants={conferenceHallContainerVariant}
                once
                className={cn(
                    "grid grid-cols-12 lg:gap-10 gap-3 mb-15",
                )}
            >
                
                <ConferenceHallSpaceBox/>
                <ConferenceHallSpaceBox/>
                <ConferenceHallSpaceBox/>
                <ConferenceHallSpaceBox/>
            </StaggerWrapper>
        </div>
    )
}

export default ConferenceHallSoace