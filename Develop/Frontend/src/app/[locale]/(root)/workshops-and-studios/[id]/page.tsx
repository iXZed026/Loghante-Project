import Container from '@/components/shared/Container'
import WorkshopsAndStudiosDetailCompBox from '@/features/loghante(root)/worshops-and-studios/componenets/workshops-and-studios-detail/WorkshopsAndStudiosDetailCompBox'
import WorkshopsAndStudiosDetailForm from '@/features/loghante(root)/worshops-and-studios/componenets/workshops-and-studios-detail/WorkshopsAndStudiosDetailForm'
import WorkshopsAndStudiosDetailHeader from '@/features/loghante(root)/worshops-and-studios/componenets/workshops-and-studios-detail/WorkshopsAndStudiosDetailHeader'
import { workshopAndStudios } from '@/features/loghante(root)/worshops-and-studios/data/workshop-and-studios'
import { notFound } from 'next/navigation'
import { cn } from '@/lib/utils/cn'

interface IWorkshopAndStudiosDetail {
    params: Promise<{
        id: string
    }>
}

async function WorkshopAndStudiosDetail({
    params,
}: IWorkshopAndStudiosDetail) {

    const { id } = await params

    const workshopId = Number(id)

    const workshop = workshopAndStudios.find(
        (item) => item.id === workshopId
    )

    if (!workshop) {
        notFound()
    }

    return (
        <Container>
            <div
                className={cn(
                    "min-h-screen",
                    "fcol gap-10",
                    "mt-20 py-10",
                )}
            >

                <WorkshopsAndStudiosDetailHeader
                    workshop={workshop}
                />

                {workshop.closeUps.map((closeUp, index) => (
                    <WorkshopsAndStudiosDetailCompBox
                        key={`${workshop.id}-${index}`}
                        closeUp={closeUp}
                        reverse={index % 2 === 0}
                    />
                ))}

                <WorkshopsAndStudiosDetailForm />

            </div>
        </Container>
    )
}

export default WorkshopAndStudiosDetail