interface IEventsAndCoursesTab {
    id: number;
    name: {
        en: string
        fa: string
    }
}

export const EventsAndCoursesTabs: IEventsAndCoursesTab[] = [
    {
        id: 1,
        name: {
            en: "Events",
            fa: "رویداد ها",
        }
    },
    {
        id: 2,
        name: {
            en: "Courses",
            fa: "دوره ها",
        }
    },
]