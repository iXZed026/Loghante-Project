export interface IMuseumParts {
    id: number;
    musesumName: string;
    description: string;
    href: string;
    imageURL: string;
}

export const museumParts: IMuseumParts[] = [
    {
        id: 1,
        musesumName: "Chocolate Coffee",
        description: "this is a test description",
        href: "/chocolate-coffee",
        imageURL: "/",
    },
    {
        id: 2,
        musesumName: "Tehran Alef",
        description: "this is a test description",
        href: "/tehran-alef",
        imageURL: "/",
    },
    {
        id: 3,
        musesumName: "Loghante Palace",
        description: "this is a test description",
        href: "/palace",
        imageURL: "/",
    },
    {
        id: 4,
        musesumName: "Loghante cafe",
        description: "this is a test description",
        href: "/cafe",
        imageURL: "/",
    },
    {
        id: 5,
        musesumName: "National Museum of Iranian Trade Houses",
        description: "this is a test description",
        href: "/trade-houses",
        imageURL: "/",
    },
    {
        id: 6,
        musesumName: "National Museum of Entrepreneurs",
        description: "this is a test description",
        href: "/Entrepreneurs",
        imageURL: "/",
    },
] 