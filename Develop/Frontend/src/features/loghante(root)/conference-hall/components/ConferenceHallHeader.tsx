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
                <div
                    className='bg-crimson rounded-lg lg:w-100 w-full h-100'
                >

                </div>
            </div>
            {/* Image */}
            <div className='fcol gap-y-20 lg:text-start text-center w-full'>
                <div>
                    <h3 className='font-wulkan md:text-5xl text-3xl font-bold'>
                        Conference Halls

                    </h3>
                </div>
                <div>
                    <p className='text-black-light-utility'>
                        Loghanteh Complex, with its diverse spaces and advanced equipment, is ready to host your events, conferences, and ceremonies.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ConferenceHallHeader