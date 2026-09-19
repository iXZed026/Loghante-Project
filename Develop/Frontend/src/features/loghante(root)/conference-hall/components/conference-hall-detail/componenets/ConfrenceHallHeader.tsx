import React from 'react'
import ConferenceHallHeaderImages from './ConferenceHallHeaderImages'
import { cn } from '@/lib/utils/cn'
import ConfrenceHallHeaderDetail from './ConfrenceHallHeaderDetail'

function ConfrenceHallHeader() {
    return (
        <div
            className={cn(
                "grid grid-cols-12 lg:gap-20",
                "lg:px-25"
            )}
        >
            <ConferenceHallHeaderImages />
            <ConfrenceHallHeaderDetail />
        </div>
    )
}

export default ConfrenceHallHeader