import { IMuseumParts, museumParts } from "./museumParts";

export interface INavLinks {
    id: number;
    name: string;
    path: string;
    museumParts?: IMuseumParts[]
}

export const navLinks:
    INavLinks[] = [
        {
            id: 1,
            name: "Home Page",
            path: "#hero",
        },
        {
            id: 2,
            name: "Shop",
            path: "#shop",
        },
        {
            id: 3,
            name: "About Museum",
            path: "#about",
        },
        {
            id: 4,
            name: "Events",
            path: "#events",
        },
        {
            id: 5,
            name: "Museum Parts",
            path: "#meuseum-parts",
            museumParts: museumParts,
        },
        {
            id: 6,
            name: "Cinema & Theaters",
            path: "#cinema_and_theaters",
        },
        {
            id: 7,
            name: "Virtual Tour",
            path: "#virtual-tour",
        },
        {
            id: 8,
            name: "Contact Us",
            path: "#contact",
        },
    ]