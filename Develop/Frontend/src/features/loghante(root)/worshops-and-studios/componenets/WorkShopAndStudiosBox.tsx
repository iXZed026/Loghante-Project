import { cn } from '@/lib/utils/cn'
import React from 'react'

function WorkShopAndStudiosBox() {
    return (
        <div className={cn(
            "lg:col-span-4 sm:col-span-6 col-span-12",
            "fcol justify-between",
            "bg-crimson",
            "h-90",
            "rounded-lg",
            "relative",
        )}>

            {/* Image */}
            <div>

            </div>

            {/* title */}
                <div className={cn(
                    "w-full",
                    "py-6 px-3",
                    "absolute bottom-0 left-0",
                    "text-white-light-utility",
                    "gradient-shadow",
                )}>
                <div className='w-45 text-lg font-semibold'>
                    <span>
                        Chocolate making workshop
                    </span>
                </div>
                </div>
        </div>
    )
}

export default WorkShopAndStudiosBox