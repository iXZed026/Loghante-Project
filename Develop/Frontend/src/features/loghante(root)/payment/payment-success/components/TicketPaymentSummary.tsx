import { cn } from '@/lib/utils/cn'
import React from 'react'
import { FaCalendarAlt } from 'react-icons/fa'
import { FaRegClock } from 'react-icons/fa6'

function TicketPaymentSummary() {
    return (
        <div className={cn(
            "py-10",
            "flex lg:flex-row flex-col gap-5"
        )}>
            <div className='fcc w-full'>
                <div className='border-2 p-30'>

                </div>
            </div>
            <div className='fcol w-full items-start gap-5'>
                <div>
                    <span className='text-lg'>Reservation Code</span>
                </div>
                <div>
                    <span className='text-5xl text-bold text-crimson'>
                        695554
                    </span>
                </div>
                <div className='w-80'>
                    <span className='text-black-light-utility text-sm'>
                        Show this QR code at the entrance
                        or use your reservation code
                    </span>
                </div>
                <div>
                    <span className='text-lg font-semibold'>
                        Loghanteh Museum Tour
                    </span>
                </div>
                <div className='fcol gap-4'>
                    <div className='flex gap-2'>
                        <span>
                            <FaCalendarAlt
                                className='size-4 text-crimson'
                            />
                        </span>
                        <span className='text-black-light-utility'>
                            Monday, August 18
                        </span>
                    </div>
                    <div className='flex gap-2'>
                        <span>
                            <FaRegClock
                                className='size-4 text-crimson'
                            />
                        </span>
                        <span className='text-black-light-utility'>
                            Time 12:40 P.M
                        </span>
                    </div>
                </div>
            </div>
            <div></div>
        </div>
    )
}

export default TicketPaymentSummary