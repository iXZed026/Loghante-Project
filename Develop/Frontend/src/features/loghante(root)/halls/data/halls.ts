interface IHallsData {
    id: number;

    hallName: {
        en: string;
        fa: string;
    };

    seats: {
        seatNum: number;
        row: number;
    }[];
}

export const halls: IHallsData[] = [
    {
        id: 1,

        hallName: {
            en: "Farokhi Yazdi",
            fa: "فرخی یزدی",
        },

        seats: [
            // Row 1 - 8 seats
            { seatNum: 1, row: 1 },
            { seatNum: 2, row: 1 },
            { seatNum: 3, row: 1 },
            { seatNum: 4, row: 1 },
            { seatNum: 5, row: 1 },
            { seatNum: 6, row: 1 },
            { seatNum: 7, row: 1 },
            { seatNum: 8, row: 1 },

            // Row 2 - 8 seats
            { seatNum: 9, row: 2 },
            { seatNum: 10, row: 2 },
            { seatNum: 11, row: 2 },
            { seatNum: 12, row: 2 },
            { seatNum: 13, row: 2 },
            { seatNum: 14, row: 2 },
            { seatNum: 15, row: 2 },
            { seatNum: 16, row: 2 },

            // Row 3 - 5 seats
            { seatNum: 17, row: 3 },
            { seatNum: 18, row: 3 },
            { seatNum: 19, row: 3 },
            { seatNum: 20, row: 3 },
            { seatNum: 21, row: 3 },

            // Row 4 - 6 seats
            { seatNum: 22, row: 4 },
            { seatNum: 23, row: 4 },
            { seatNum: 24, row: 4 },
            { seatNum: 25, row: 4 },
            { seatNum: 26, row: 4 },
            { seatNum: 27, row: 4 },

            // Row 5 - 8 seats
            { seatNum: 28, row: 5 },
            { seatNum: 29, row: 5 },
            { seatNum: 30, row: 5 },
            { seatNum: 31, row: 5 },
            { seatNum: 32, row: 5 },
            { seatNum: 33, row: 5 },
            { seatNum: 34, row: 5 },
            { seatNum: 35, row: 5 },

            // Row 6 - 5 seats
            { seatNum: 36, row: 6 },
            { seatNum: 37, row: 6 },
            { seatNum: 38, row: 6 },
            { seatNum: 39, row: 6 },
            { seatNum: 40, row: 6 },

            // Row 7 - 7 seats
            { seatNum: 41, row: 7 },
            { seatNum: 42, row: 7 },
            { seatNum: 43, row: 7 },
            { seatNum: 44, row: 7 },
            { seatNum: 45, row: 7 },
            { seatNum: 46, row: 7 },
            { seatNum: 47, row: 7 },

            // Row 8 - 8 seats
            { seatNum: 48, row: 8 },
            { seatNum: 49, row: 8 },
            { seatNum: 50, row: 8 },
            { seatNum: 51, row: 8 },
            { seatNum: 52, row: 8 },
            { seatNum: 53, row: 8 },
            { seatNum: 54, row: 8 },
            { seatNum: 55, row: 8 },

            // Row 9 - 6 seats
            { seatNum: 56, row: 9 },
            { seatNum: 57, row: 9 },
            { seatNum: 58, row: 9 },
            { seatNum: 59, row: 9 },
            { seatNum: 60, row: 9 },
            { seatNum: 61, row: 9 },

            // Row 10 - 5 seats
            { seatNum: 62, row: 10 },
            { seatNum: 63, row: 10 },
            { seatNum: 64, row: 10 },
            { seatNum: 65, row: 10 },
            { seatNum: 66, row: 10 },

            // Row 11 - 8 seats
            { seatNum: 67, row: 11 },
            { seatNum: 68, row: 11 },
            { seatNum: 69, row: 11 },
            { seatNum: 70, row: 11 },
            { seatNum: 71, row: 11 },
            { seatNum: 72, row: 11 },
            { seatNum: 73, row: 11 },
            { seatNum: 74, row: 11 },

            // Row 12 - 7 seats
            { seatNum: 75, row: 12 },
            { seatNum: 76, row: 12 },
            { seatNum: 77, row: 12 },
            { seatNum: 78, row: 12 },
            { seatNum: 79, row: 12 },
            { seatNum: 80, row: 12 },
            { seatNum: 81, row: 12 },
        ],
    },
];