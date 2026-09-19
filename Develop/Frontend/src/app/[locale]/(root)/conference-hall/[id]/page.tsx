import Container from '@/components/shared/Container'
import ConferenceHallHeaderImages from '@/features/loghante(root)/conference-hall/components/conference-hall-detail/componenets/ConferenceHallHeaderImages'
import ConfrenceHallHeader from '@/features/loghante(root)/conference-hall/components/conference-hall-detail/componenets/ConfrenceHallHeader'
import ConferenceHallHeader from '@/features/loghante(root)/conference-hall/components/ConferenceHallHeader'
import { cn } from '@/lib/utils/cn'
import React from 'react'

function ConfrenceHallDetail() {
    return (
        <Container>
            <div className={cn(
                "min-h-screen",
                "py-30",
            )}>
                <ConfrenceHallHeader />
            </div>
        </Container>
    )
}

export default ConfrenceHallDetail