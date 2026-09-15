import AppLink from '@/components/ui/AppLink'
import React from 'react'

function WorkshopsAndStudiosDetailHeader() {
  return (
    <div>

      <div className='fcol gap-15'>
        {/* image */}
        <div className='w-full h-125 bg-crimson rounded-lg'>

        </div>
        {/* About WS And Studios */}
        <div className='text-center fcol gap-15'>
          <div className=''>
            <span className='font-wulkan lg:text-5xl text-3xl'>
              Chocolate making workshop
            </span>

          </div>
          <div>
            <p className='w-235 mx-auto text-black-light-utility'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint .
            </p>
          </div>
          <div>
            <AppLink
            href='/'
              className='py-3 px-5 bg-crimson text-white-utility rounded-lg'
            >
              Submit a request
            </AppLink>
          </div>
        </div>

      </div>

    </div>
  )
}

export default WorkshopsAndStudiosDetailHeader