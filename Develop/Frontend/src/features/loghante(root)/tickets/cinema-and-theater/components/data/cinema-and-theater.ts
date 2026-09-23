import type { CinemaAndTheaterType } from "./cinema-and-theater-tabs"

export interface CinemaAndTheaterTicket {
    id: number
    type: CinemaAndTheaterType
    name: {
        en:string
        fa:string
    }
    genre?: {
        en:string
        fa:string
    }
    imageUrl: string
    startAt: string
    remainingCapacity: number
}

const mockTickets: CinemaAndTheaterTicket[] = [
    {
        id: 1,
        type: "cinema",
        name: {
            fa: "فیلم سینمایی اول",
            en: "First Movie",
        },
        genre: {
            fa: "درام",
            en: "Drama",
        },
        imageUrl: "/images/loghanteh-cafe.jpg",
        startAt: "18:00",
        remainingCapacity: 42,
    },
    {
        id: 2,
        type: "cinema",
        name: {
            fa: "فیلم سینمایی دوم",
            en: "Second Movie",
        },
        genre: {
            fa: "کمدی",
            en: "Comedy",
        },
        imageUrl: "/images/loghanteh-cafe.jpg",
        startAt: "20:30",
        remainingCapacity: 12,
    },
    {
        id: 3,
        type: "theater",
        name: {
            fa: "نمایش اول",
            en: "First Theater",
        },
        imageUrl: "/images/loghanteh-cafe.jpg",
        startAt: "17:30",
        remainingCapacity: 28,
    },
    {
        id: 4,
        type: "theater",
        name: {
            fa: "نمایش دوم",
            en: "Second Theater",
        },
        imageUrl: "/images/loghanteh-cafe.jpg",
        startAt: "21:00",
        remainingCapacity: 7,
    },
]

export function getCinemaAndTheaterTickets(
    type: CinemaAndTheaterType,
    date: string,
) {
    const day = Number(date.split("-")[2])

    const tickets = mockTickets.filter((ticket) => {
        if (ticket.type !== type) {
            return false
        }

        if (day % 3 === 0) {
            return ticket.id === 1 || ticket.id === 3
        }

        if (day % 3 === 1) {
            return ticket.id === 2 || ticket.id === 4
        }

        return true
    })

    return tickets
}