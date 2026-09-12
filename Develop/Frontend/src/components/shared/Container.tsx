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
                "w-[90%]",
                "mx-auto",
            )}
        >
            {children}
        </div>
    )
}

export default Container