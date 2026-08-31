import AppLink from '@/components/ui/AppLink'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils/cn'
import { FaRegCalendarAlt } from 'react-icons/fa';
import { FaLocationDot, FaRegClock } from 'react-icons/fa6';
import { SlCalender } from "react-icons/sl";

function PaymentTicketInfo() {
    return (
        <div className={cn(
            "lg:col-span-6 col-span-12",
            "p-10",
            "border-[1px] border-black-opacity",
            "rounded-xl",
            "md:text-base text-sm",
        )}>
            {/* Ticket Date Details */}
            <div className='fbc'>
                <div className='fcol items-start gap-5 text-black-light-utility'>
                    <span className='fcc gap-2'>
                        <FaRegCalendarAlt className='text-crimson' />
                        <span>Monday, August 18</span>
                    </span>
                    <span className='fcc gap-2'>
                        <FaRegClock className='text-crimson' />
                        <span>Time 12:40 P.M</span>
                    </span>
                </div>
                <div>
                    <Button
                        className={cn(
                            "text-crimson font-semibold",
                            "hover:text-[var(--crimson-opacity-color)]",
                            "click-scale",
                        )}
                    >
                        Change
                    </Button>
                </div>
            </div>
            <div className='w-full h-[0.5px] bg-black-light-utility my-10' />
            {/* Ticket Type Details */}
            <div
                className={cn(
                    "fcol items-start gap-5",
                )}
            >
                <div>
                    <span className='md:text-xl text-lg text-bold'>
                        Loghanteh Museum Tour
                    </span>
                </div>
                <div className='flex gap-2'>
                    <span>
                        <FaLocationDot className='text-crimson' />
                    </span>
                    <span>
                        Tehran - shahid ghodosy
                    </span>
                </div>
            </div>
            <div className='w-full h-[0.5px] bg-black-light-utility my-10' />
            {/* Tickets Rules */}
            <div>
                <div>
                    <span className='md:text-xl text-lg'>
                        Payment and tour rules
                    </span>
                </div>
                <div>
                    <ul
                        className='fcol gap-10 pl-5 py-5 list-disc leading-9 text-black-light-utility'
                        >
                        <li>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                        </li>
                        <li>
                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                        </li>
                        <li>
                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                        </li>
                    </ul>
                </div>
            </div>
        </div >
    )
}

export default PaymentTicketInfo