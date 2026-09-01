import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils/cn'
import { useLocale, useTranslations } from 'next-intl';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { FaLocationDot, FaRegClock } from 'react-icons/fa6';
import { ticketRules } from '../data/ticketRules';
import { getLocalizedValue } from '@/lib/utils/getLocalizedValue';

function PaymentTicketInfo() {

    const paymentTicketInfoT = useTranslations("payment.ticket-info")

    return (
        <div className={cn(
            "lg:col-span-6 col-span-12",
            "md:p-10 p-7",
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
                        {paymentTicketInfoT("ticket-date.change-button")}
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
                        {paymentTicketInfoT("rules.title")}
                    </span>
                </div>
                <div>
                    <ul
                        className='fcol gap-10 pl-5 py-5 list-disc leading-9 text-black-light-utility'
                    >
                        {ticketRules.map(rule => {
                            const locale = useLocale()
                            return <li key={rule.id}>
                                {getLocalizedValue(rule.rulesText, locale)}
                            </li>
                        })}
                    </ul>
                </div>
            </div>
        </div >
    )
}

export default PaymentTicketInfo