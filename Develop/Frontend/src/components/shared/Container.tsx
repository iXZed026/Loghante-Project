import { cn } from '@/lib/utils/cn'
import React, { ReactNode } from 'react'

function Container({
    children
}: {
    children: ReactNode
}) {
    return (
        <div
            className={cn(
                "lg:w-[90%]",
                "sm:w-[95%]",
                "w-[98%]",
                "mx-auto",
            )}
        >
            {children}
        </div>
    )
}

export default Container