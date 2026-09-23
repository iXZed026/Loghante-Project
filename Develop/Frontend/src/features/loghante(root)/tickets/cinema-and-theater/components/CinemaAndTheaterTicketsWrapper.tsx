import StaggerWrapper from "@/components/animations/StaggerWrapper"
import {
    dayOfTheWeeksContainerVariant,
} from "@/features/loghante(root)/animations/loghante.variants"
import { getCinemaAndTheaterTickets } from "./data/cinema-and-theater"
import CinemaAndTheaterTicketBox from "./CinemaAndTheaterTicketBox"
import type { CinemaAndTheaterType } from "./data/cinema-and-theater-tabs"

interface Props {
    type: CinemaAndTheaterType
    date: string
}

async function CinemaAndTheaterTicketsWrapper({
    type,
    date,
}: Props) {
    const tickets = getCinemaAndTheaterTickets(type, date)

    return (
        <>
            {tickets.length === 0 ? (
                <div className="py-16 text-center">
                    <p className="text-lg text-[var(--black-light-color)]">
                        برای این روز برنامه‌ای وجود ندارد.
                    </p>
                </div>
            ) : (
                <StaggerWrapper
                    once
                    variants={dayOfTheWeeksContainerVariant}
                    className="grid grid-cols-12 gap-6"
                >
                    {tickets.map((ticket) => (
                        <CinemaAndTheaterTicketBox
                            key={ticket.id}
                            ticket={ticket}
                        />
                    ))}
                </StaggerWrapper>
            )}
        </>
    )
}

export default CinemaAndTheaterTicketsWrapper