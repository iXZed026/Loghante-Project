"use client"
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils/cn'
import React, { useState } from 'react'

function MuseumsTourTicketBox() {

    const [ticketCount, setTicketCount] =
        useState<number>(0)

    const increaseHandler: () => void =
        () => {
            setTicketCount(prev => prev + 1)
        }
        
        const decreaseHandler: () => void =
        () => {
            if(ticketCount !< 1) return;
            setTicketCount(prev => prev - 1)
            
        }

    return (
        <div className={cn(
            "lg:col-span-6 col-span-12",
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
            <div className='fbc select-none'>
                <div className='font-semibold'>
                    <span>Number of tickets: </span>
                </div>
                <div className='fcc gap-2'>
                    <div className='fcc  bg-gray-600/30 rounded-4xl font-bold'>
                        <span
                            className='text-xl cursor-pointer click-scale px-3 py-1'
                            onClick={increaseHandler}
                        >
                            +
                        </span>
                        <span>|</span>
                        <span
                            className='text-xl cursor-pointer click-scale px-3 py-1'
                            onClick={decreaseHandler}
                        >
                            -
                        </span>
                    </div>
                    <div className='bg-gray-600/30 px-2 py-1 rounded-4xl font-bold'>
                        <span>{ticketCount}</span>
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