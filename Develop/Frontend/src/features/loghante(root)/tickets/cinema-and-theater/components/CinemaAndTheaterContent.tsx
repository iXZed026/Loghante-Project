import CinemaAndTheaterDate from './CinemaAndTheaterDate'
import CinemaAndTheaterTab from './CinemaAndTheaterTab'
import CinemaAndTheaterTicketsWrapper from './CinemaAndTheaterTicketsWrapper'

interface CinemaAndTheaterContentProps {
    typeParam?: string
    dateParam?: string
}

function CinemaAndTheaterContent({
    typeParam,
    dateParam,
}: CinemaAndTheaterContentProps) {

    const type =
        typeParam === "theater"
            ? "theater"
            : "cinema"

    const date =
        dateParam ??
        new Date().toISOString().slice(0, 10)

    return (
        <div className="fcol gap-8">

            {/* Cinema / Theater */}

            <CinemaAndTheaterTab
                type={type}
            />

            {/* Days */}

            <CinemaAndTheaterDate
                selectedDate={date}
            />

            {/* Tickets */}

            <CinemaAndTheaterTicketsWrapper
                type={type}
                date={date}
            />

        </div>
    )
}

export default CinemaAndTheaterContent