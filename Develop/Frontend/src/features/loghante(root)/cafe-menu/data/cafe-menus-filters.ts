interface ICafeMenusFilters {
    id: number;
    name: string;
    slug: string;
}

export const cafeMenusFilters: ICafeMenusFilters[] = [
    {
        id: 1,
        name: "Food",
        slug: "food",
    },
    {
        id: 2,
        name: "Hot drinks",
        slug: "hot-drinks",
    },
    {
        id: 3,
        name: "Cold drinks",
        slug: "cold-drinks",
    },
    {
        id: 4,
        name: "Cake & Dessert",
        slug: "cake-dessert",
    },
]