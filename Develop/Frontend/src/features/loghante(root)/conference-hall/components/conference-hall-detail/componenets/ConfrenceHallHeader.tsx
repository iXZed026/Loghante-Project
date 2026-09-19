import React from 'react'
import ConferenceHallHeaderImages from './ConferenceHallHeaderImages'
import { cn } from '@/lib/utils/cn'

function ConfrenceHallHeader() {
    return (
        <div
            className={cn(
                "grid grid-cols-12 gap-5",
                "lg:px-15"
            )}
        >
            <ConferenceHallHeaderImages />
            <div 
                className={cn(
                    "col-span-6"
                )}
            >

            </div>
        </div>
    )
}

export default ConfrenceHallHeader