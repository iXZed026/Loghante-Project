import Container from '@/components/shared/Container'
import WorkshopsAndStudiosDetailCompBox from '@/features/loghante(root)/worshops-and-studios/componenets/workshops-and-studios-detail/WorkshopsAndStudiosDetailCompBox'
import WorkshopsAndStudiosDetailHeader from '@/features/loghante(root)/worshops-and-studios/componenets/workshops-and-studios-detail/WorkshopsAndStudiosDetailHeader'
import { cn } from '@/lib/utils/cn'

function WorkshopAndStudiosDetail() {
    return (
        <Container>
            <div className={cn(
                "min-h-screen",
                "fcol gap-10",
                "mt-20 py-10",
            )}>
                <WorkshopsAndStudiosDetailHeader />
                <WorkshopsAndStudiosDetailCompBox 
                />
                <WorkshopsAndStudiosDetailCompBox 
                    reverse={false}
                />
                <WorkshopsAndStudiosDetailCompBox 
                />
            </div>
        </Container>
    )
}

export default WorkshopAndStudiosDetail