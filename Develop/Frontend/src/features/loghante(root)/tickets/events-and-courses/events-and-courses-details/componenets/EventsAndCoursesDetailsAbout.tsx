import FadeIn from '@/components/animations/FadeIn'
import FadeUp from '@/components/animations/FadeUp'
import { verySlowTransitionOut } from '@/lib/animations/transitions'
import { formatMonthYear } from '@/lib/utils/date'
import { useLocale, useTranslations } from 'next-intl'
import React from 'react'
import { FaRegClock } from 'react-icons/fa6'

function EventsAndCoursesDetailsAbout() {

  const locale = useLocale()

  const today = new Date()

  const eventsAndCoursesAboutT =
    useTranslations("eventsAndCoursesDetails.about")

  return (
    <div className='grid grid-cols-12 gap-5'>
      <div className='lg:col-span-7 col-span-12'>
        {/* About Event Or Course Header */}
        <div className='fcol gap-5 py-10 border-t border-black-opacity'>
          <div className='overflow-hidden'>
            <FadeIn
              transition={verySlowTransitionOut}
              once={true}
            >
              <h4 className='text-2xl font-semibold'>
                World Cacoa Milk Day
              </h4>
            </FadeIn>
          </div>
          <FadeUp
            once={true}
          >
            <div className='flex gap-2'>
              <span>
                <FaRegClock
                  className='size-4 text-crimson'
                />
              </span>
              <span className='text-black-light-utility'>
                {eventsAndCoursesAboutT("publish")} {formatMonthYear(today, locale)}
              </span>
            </div>
          </FadeUp>
        </div>

        {/* About main  */}
        <div
          className='fcol gap-10 whitespace-pre-line text-black-light-utility leading-8 text-justify'
        >
          {/* About Text */}
          <div className='overflow-hidden'>
            <FadeUp
            once
              amount={0.2}
            >
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.


                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
              </p>
            </FadeUp>
          </div>
          {/* About Image */}
          <div className='overflow-hidden'>
            <FadeUp
              once
              transition={verySlowTransitionOut}
            >
              <div className='w-full h-100 bg-crimson rounded-xl'>

              </div>
            </FadeUp>
          </div>
          {/* About Text */}
          <div className='overflow-hidden'>
            <FadeIn
              once={true}
              transition={verySlowTransitionOut}
            >
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
              </p>
            </FadeIn>
          </div>
          {/* About Location Box */}
          <div>
            <div className='w-full h-80 bg-crimson rounded-xl'>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventsAndCoursesDetailsAbout