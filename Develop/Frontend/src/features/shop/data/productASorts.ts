export const SORT_OPTIONS = [
    {
        value: "newest",
        label: {
            en: "Newest",
            fa: "جدیدترین",
        },
    },
    {
        value: "oldest",
        label: {
            en: "Oldest",
            fa: "قدیمی‌ترین",
        },
    },
    {
        value: "price_asc",
        label: {
            en: "Price: Low to High",
            fa: "قیمت: از کم به زیاد",
        },
    },
    {
        value: "price_desc",
        label: {
            en: "Price: High to Low",
            fa: "قیمت: از زیاد به کم",
        },
    },
    {
        value: "popular",
        label: {
            en: "Most Popular",
            fa: "محبوب‌ترین",
        },
    },
    {
        value: "discount_desc",
        label: {
            en: "Biggest Discount",
            fa: "بیشترین تخفیف",
        },
    },
] as const;

export type SortOption = (typeof SORT_OPTIONS)[number];

export type SortValue = SortOption["value"];

export type SortLocale = keyof SortOption["label"];