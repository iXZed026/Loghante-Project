import FadeIn from '@/components/animations/FadeIn'
import Button from '@/components/ui/Button'
import { slowTransitionOut } from '@/lib/animations/transitions'
import { cn } from '@/lib/utils/cn'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { FaLocationDot, FaRegClock } from 'react-icons/fa6'
import { MdOutlineDateRange, MdOutlinePriceChange } from 'react-icons/md'

function EventsAndCoursesHeaderForm() {

    const commonT =
        useTranslations("common")

    const eventsAndCoursesHeaderT =
        useTranslations("eventsAndCoursesDetails.header")

    const [count, setCount] =
        useState<number>(0)

    function increaseCount(): void {
        setCount(prev => Math.min(prev + 1, 20))
    }

    function decreaseCount(): void {
        setCount(prev => Math.max(prev - 1, 0))
    }

    function submitForm(
        e: any
    ): void {

        e.preventDefault()

    }

    return (
        <FadeIn
        once={true}
            transition={slowTransitionOut}
        className={cn(
            "lg:col-span-5 col-span-12",
        )}>
            <form className={cn(
                "fcol gap-y-9",
                "rounded-xl",
                "border border-black-opacity",
                "py-9.5 px-7.5",
            )}
                onSubmit={submitForm}
            >
                <div>
                    <span className='text-xl font-semibold'>
                        World Cacoa Milk Day
                    </span>
                </div>

                <div className='fcol gap-y-6 text-black-light-utility text-sm'>
                    <div className='flex items-center gap-2'>
                        <span>
                            <FaLocationDot className='size-4 text-crimson' />
                        </span>
                        <span>
                            {eventsAndCoursesHeaderT("details.address")}
                        </span>
                    </div>

                    <div className='flex items-center gap-2'>
                        <span>
                            <MdOutlineDateRange className='size-4 text-crimson' />
                        </span>
                        <span>
                            4 April, 2026
                        </span>
                    </div>

                    <div className='flex items-center gap-2'>
                        <span>
                            <FaRegClock className='size-4 text-crimson' />
                        </span>
                        <span>
                            12:40 P.M
                        </span>
                    </div>

                    <div className='flex items-center gap-2'>
                        <span>
                            <MdOutlinePriceChange className='size-4 text-crimson' />
                        </span>
                        <div className='fbc w-full'>
                            <span>{eventsAndCoursesHeaderT("details.amount")}</span>
                            <span className='text-xl font-bold text-crimson'>
                                200000 {commonT("price-type")}
                            </span>
                        </div>
                    </div>
                </div>

                <div className='fbc'>
                    <div>
                        <span className='font-semibold'>
                            {eventsAndCoursesHeaderT("details.count")}
                        </span>
                    </div>
                    <div className='fcc gap-5 text-2xl font-bold select-none'>
                        <div className='fcc gap-2 px-2 rounded-3xl bg-[var(--white-light-color)]'>
                            <span
                                onClick={increaseCount}
                                className='py-1 px-2 cursor-pointer active:scale-75 transition-all'
                            >
                                +
                            </span>
                            <span>
                                |
                            </span>
                            <span
                                onClick={decreaseCount}
                                className='py-1 px-2 cursor-pointer active:scale-75 transition-all'
                            >
                                -
                            </span>
                        </div>
                        <div className='text-xl px-3 py-1 rounded-3xl bg-[var(--white-light-color)]'>
                            <span>
                                {count}
                            </span>
                        </div>
                    </div>
                </div>

                <div className='w-full'>
                    <Button
                        className={cn(
                            "w-full",
                            "py-3 px-3",
                            "bg-crimson",
                            "font-bold "
                        )}
                    >
                        {eventsAndCoursesHeaderT("details.book-button")}
                    </Button>
                </div>

            </form>

        </FadeIn
        
        >
    )
}

export default EventsAndCoursesHeaderForm