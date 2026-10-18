export interface IProductCategory {
    id: number;

    name: {
        en: string;
        fa: string;
    };

    description: {
        en: string;
        fa: string;
    };

    href: string;
    imageURL: string;
}

export const productCategories: IProductCategory[] = [
    {
        id: 1,
        name: {
            en: "Jewelry & Accessories",
            fa: "جواهرات و اکسسوری",
        },
        description: {
            en: "Discover jewelry and accessories.",
            fa: "انواع جواهرات و اکسسوری را کشف کنید.",
        },
        href: "/shop/jewelry-and-accessories",
        imageURL: "/images/loghanteh-cafe.jpg",
    },
    {
        id: 2,
        name: {
            en: "Fashion & Clothing",
            fa: "مد و پوشاک",
        },
        description: {
            en: "Explore fashion and clothing.",
            fa: "پوشاک و محصولات دنیای مد را مشاهده کنید.",
        },
        href: "/shop/fashion-and-clothing",
        imageURL: "/images/loghanteh-cafe.jpg",
    },
    {
        id: 3,
        name: {
            en: "Books",
            fa: "کتاب‌ها",
        },
        description: {
            en: "Explore books and publications.",
            fa: "کتاب‌ها و انتشارات را کشف کنید.",
        },
        href: "/shop/books",
        imageURL: "/images/loghanteh-cafe.jpg",
    },
    {
        id: 4,
        name: {
            en: "Home & Interior",
            fa: "خانه و دکوراسیون داخلی",
        },
        description: {
            en: "Discover home and interior products.",
            fa: "محصولات خانه و دکوراسیون داخلی را مشاهده کنید.",
        },
        href: "/shop/home-and-interior",
        imageURL: "/images/loghanteh-cafe.jpg",
    },
    {
        id: 5,
        name: {
            en: "Automotive & Classic Cars",
            fa: "خودرو و ماشین‌های کلاسیک",
        },
        description: {
            en: "Explore automotive and classic car collectibles.",
            fa: "محصولات و کلکسیون‌های مرتبط با خودرو و ماشین‌های کلاسیک را کشف کنید.",
        },
        href: "/shop/automotive-and-classic-cars",
        imageURL: "/images/loghanteh-cafe.jpg",
    },
    {
        id: 6,
        name: {
            en: "Coffee & Tea",
            fa: "قهوه و چای",
        },
        description: {
            en: "Discover coffee, tea, and related products.",
            fa: "قهوه، چای و محصولات مرتبط را مشاهده کنید.",
        },
        href: "/shop/coffee-and-tea",
        imageURL: "/images/loghanteh-cafe.jpg",
    },
    {
        id: 7,
        name: {
            en: "Chocolate & Confectionery",
            fa: "شکلات و شیرینی‌جات",
        },
        description: {
            en: "Explore chocolates and confectionery.",
            fa: "انواع شکلات و شیرینی‌جات را کشف کنید.",
        },
        href: "/shop/chocolate-and-confectionery",
        imageURL: "/images/loghanteh-cafe.jpg",
    },
    {
        id: 8,
        name: {
            en: "Food & Gourmet",
            fa: "مواد غذایی و خوراکی‌های خاص",
        },
        description: {
            en: "Discover gourmet foods and specialty products.",
            fa: "خوراکی‌های خاص و محصولات غذایی ویژه را مشاهده کنید.",
        },
        href: "/shop/food-and-gourmet",
        imageURL: "/images/loghanteh-cafe.jpg",
    },
    {
        id: 9,
        name: {
            en: "Perfumes & Fragrance",
            fa: "عطر و رایحه",
        },
        description: {
            en: "Explore perfumes and fragrances.",
            fa: "انواع عطر و رایحه را کشف کنید.",
        },
        href: "/shop/perfumes-and-fragrance",
        imageURL: "/images/loghanteh-cafe.jpg",
    },
    {
        id: 10,
        name: {
            en: "Historical & Decorative",
            fa: "اشیای تاریخی و تزئینی",
        },
        description: {
            en: "Discover historical and decorative objects.",
            fa: "اشیای تاریخی و محصولات تزئینی را مشاهده کنید.",
        },
        href: "/shop/historical-and-decorative",
        imageURL: "/images/loghanteh-cafe.jpg",
    },
    {
        id: 11,
        name: {
            en: "Tobacco & Smoking",
            fa: "تنباکو و لوازم دخانیات",
        },
        description: {
            en: "Explore tobacco-related products and accessories.",
            fa: "محصولات و لوازم مرتبط با دخانیات را مشاهده کنید.",
        },
        href: "/shop/tobacco-and-smoking",
        imageURL: "/images/loghanteh-cafe.jpg",
    },
    {
        id: 12,
        name: {
            en: "Art, Sculptures & Collectibles",
            fa: "هنر، مجسمه و اشیای کلکسیونی",
        },
        description: {
            en: "Discover art, sculptures, and collectibles.",
            fa: "آثار هنری، مجسمه‌ها و اشیای کلکسیونی را کشف کنید.",
        },
        href: "/shop/art-sculptures-and-collectibles",
        imageURL: "/images/loghanteh-cafe.jpg",
    },
];
