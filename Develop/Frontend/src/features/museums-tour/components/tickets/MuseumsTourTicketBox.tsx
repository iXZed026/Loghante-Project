import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils/cn'
import React from 'react'

function MuseumsTourTicketBox() {
    return (
        <div className={cn(
            "col-span-6",
            "fcol gap-10",
            "p-8",
            "border-[1px] border-black-opacity",
            "rounded-xl",
            "shadow-xl"
        )}>
            {/* Start Time */}
            <div className='text-center'>
                <span className='text-xl font-bold'>
                    10:15
                </span>
            </div>
            {/* Remaining Capacity */}
            <div>
                <span className='text-lg font-semibold'>
                    Remaining capacity: 12
                </span>
            </div>
            <div className='fbc'>
                <div className='font-semibold'>
                    <span>Number of visitors: </span>
                </div>
                <div className='fcc gap-2'>
                    <div className='fcc gap-3 bg-gray-600/30 px-3 py-1 rounded-4xl font-bold'>
                        <span className='text-xl cursor-pointer'>+</span>
                        <span>|</span>
                        <span className='text-xl cursor-pointer'>-</span>
                    </div>
                    <div className='bg-gray-600/30 px-2 py-1 rounded-4xl font-bold'>
                        <span>0</span>
                    </div>
                </div>
            </div>
            <div className='fcc'>
                <Button
                    className={cn(
                        "text-lg font-bold",
                        "px-3 py-2",
                        "bg-crimson",
                        "hover:bg-[var(--crimson-hover-color)]",
                    )}
                >
                    Book a Ticket
                </Button>
            </div>
        </div>
    )
}

export default MuseumsTourTicketBox