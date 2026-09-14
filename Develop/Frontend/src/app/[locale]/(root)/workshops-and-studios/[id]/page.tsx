import Container from '@/components/shared/Container'
import WorkshopsAndStudiosHeader from '@/features/loghante(root)/worshops-and-studios/componenets/workshops-and-studios-detail/WorkshopsAndStudiosHeader'
import { cn } from '@/lib/utils/cn'
import React from 'react'

function WorkshopAndStudiosDetail() {
    return (
        <Container>
            <div className={cn(
                "min-h-screen",
                "fcol gap-10",
                "mt-20 py-10",
            )}>
                <WorkshopsAndStudiosHeader />
            </div>
        </Container>
    )
}

export default WorkshopAndStudiosDetail