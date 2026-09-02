import FadeIn from '@/components/animations/FadeIn'
import FadeUp from '@/components/animations/FadeUp'
import { verySlowTransitionOut } from '@/lib/animations/transitions'
import React from 'react'

function EventsAndCoursesHeader() {
    return (
        <div className='fcol gap-20 text-center sm:px-10 px-5'>
            <div>
                <FadeUp>
                    <h2
                        className='font-wulkan lg:text-5xl text-3xl font-bold'
                    >
                        Best Events & Courses in <span className=' text-crimson'>Loghanteh</span> 2026
                    </h2>
                </FadeUp>
            </div>
            <div>
                <FadeUp
                    once={true}
                    transition={verySlowTransitionOut}
                >
                    <p className='lg:w-200 w-full mx-auto text-sm text-black-light-utility leading-7'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit a
                    </p>
                </FadeUp>
            </div>
        </div>
    )
}

export default EventsAndCoursesHeader