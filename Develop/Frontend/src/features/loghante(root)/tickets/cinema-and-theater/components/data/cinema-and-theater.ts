import type { CinemaAndTheaterType } from "./cinema-and-theater-tabs"

export interface CinemaAndTheaterTicket {
    id: number
    type: CinemaAndTheaterType
    name: {
        en: string
        fa: string
    }
    genre?: {
        en: string
        fa: string
    }
    imageUrl: string
    startAt: string
    duration: number
    remainingCapacity: number
}

const mockTickets: CinemaAndTheaterTicket[] = [
    // =========================
    // Cinema
    // =========================

    {
        id: 1,
        type: "cinema",
        name: {
            fa: "سایه‌های تهران",
            en: "Shadows of Tehran",
        },
        genre: {
            fa: "درام",
            en: "Drama",
        },
        imageUrl: "/images/loghanteh-cafe.jpg",
        startAt: "10:00",
        duration: 110,
        remainingCapacity: 42,
    },
    {
        id: 2,
        type: "cinema",
        name: {
            fa: "آخرین ایستگاه",
            en: "The Last Station",
        },
        genre: {
            fa: "هیجانی",
            en: "Thriller",
        },
        imageUrl: "/images/loghanteh-cafe.jpg",
        startAt: "12:30",
        duration: 125,
        remainingCapacity: 18,
    },
    {
        id: 3,
        type: "cinema",
        name: {
            fa: "یک روز معمولی",
            en: "An Ordinary Day",
        },
        genre: {
            fa: "کمدی",
            en: "Comedy",
        },
        imageUrl: "/images/loghanteh-cafe.jpg",
        startAt: "15:00",
        duration: 95,
        remainingCapacity: 7,
    },
    {
        id: 4,
        type: "cinema",
        name: {
            fa: "در جستجوی فردا",
            en: "Searching for Tomorrow",
        },
        genre: {
            fa: "علمی تخیلی",
            en: "Sci-Fi",
        },
        imageUrl: "/images/loghanteh-cafe.jpg",
        startAt: "17:30",
        duration: 130,
        remainingCapacity: 0,
    },
    {
        id: 5,
        type: "cinema",
        name: {
            fa: "خانه‌ای کنار دریا",
            en: "A House by the Sea",
        },
        genre: {
            fa: "عاشقانه",
            en: "Romance",
        },
        imageUrl: "/images/loghanteh-cafe.jpg",
        startAt: "20:00",
        duration: 105,
        remainingCapacity: 31,
    },
    {
        id: 6,
        type: "cinema",
        name: {
            fa: "شهر خاموش",
            en: "The Silent City",
        },
        genre: {
            fa: "جنایی",
            en: "Crime",
        },
        imageUrl: "/images/loghanteh-cafe.jpg",
        startAt: "22:30",
        duration: 115,
        remainingCapacity: 4,
    },

    // =========================
    // Theater
    // =========================

    {
        id: 7,
        type: "theater",
        name: {
            fa: "خانه عروسک",
            en: "A Doll's House",
        },
        imageUrl: "/images/loghanteh-cafe.jpg",
        startAt: "11:00",
        duration: 100,
        remainingCapacity: 28,
    },
    {
        id: 8,
        type: "theater",
        name: {
            fa: "آخرین شب",
            en: "The Last Night",
        },
        imageUrl: "/images/loghanteh-cafe.jpg",
        startAt: "13:30",
        duration: 90,
        remainingCapacity: 12,
    },
    {
        id: 9,
        type: "theater",
        name: {
            fa: "مهمان ناخوانده",
            en: "The Unexpected Guest",
        },
        imageUrl: "/images/loghanteh-cafe.jpg",
        startAt: "16:00",
        duration: 120,
        remainingCapacity: 5,
    },
    {
        id: 10,
        type: "theater",
        name: {
            fa: "رویای نیمه‌شب",
            en: "A Midnight Dream",
        },
        imageUrl: "/images/loghanteh-cafe.jpg",
        startAt: "18:30",
        duration: 105,
        remainingCapacity: 0,
    },
    {
        id: 11,
        type: "theater",
        name: {
            fa: "اتاق شماره هفت",
            en: "Room Number Seven",
        },
        imageUrl: "/images/loghanteh-cafe.jpg",
        startAt: "20:30",
        duration: 115,
        remainingCapacity: 21,
    },
    {
        id: 12,
        type: "theater",
        name: {
            fa: "قصه‌ای برای فردا",
            en: "A Story for Tomorrow",
        },
        imageUrl: "/images/loghanteh-cafe.jpg",
        startAt: "22:30",
        duration: 100,
        remainingCapacity: 3,
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
            return ticket.id % 3 === 1
        }

        if (day % 3 === 1) {
            return ticket.id % 3 === 2
        }

        return ticket.id % 3 === 0
    })

    return tickets
}