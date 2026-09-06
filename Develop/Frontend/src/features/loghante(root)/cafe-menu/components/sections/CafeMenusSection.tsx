"use client"

import CafeMenusFilters from '../CafeMenusFilters'
import CafeMenuItem from '../CafeMenuItem'
import { cn } from '@/lib/utils/cn'
import { useSearchParams } from 'next/navigation'
import StaggerWrapper from '@/components/animations/StaggerWrapper'
import { cafeMenusContainerVariant, MuseumCardVariant, MuseumsCardContainerVariant } from '@/features/loghante(root)/animations/loghante.variants'

export interface ICafeMenu {
    id: number;
    name: string;
    price: number;
    category: string;
    image: string;
}

function CafeMenusSections() {

    const searchParams = useSearchParams()

    const activeFilter =
        searchParams.get("filter") || "food"

    const cafeMenus: ICafeMenu[] = [
        {
            id: 1,
            name: "Classic Burger",
            price: 12,
            category: "food",
            image: "/images/loghanteh-cafe.jpg",
        },
        {
            id: 2,
            name: "Chicken Sandwich",
            price: 10,
            category: "food",
            image: "/images/loghanteh-cafe.jpg",
        },
        {
            id: 3,
            name: "Iced Latte",
            price: 8,
            category: "cold-drinks",
            image: "/images/loghanteh-cafe.jpg",
        },
        {
            id: 4,
            name: "Americano",
            price: 6,
            category: "hot-drinks",
            image: "/images/loghanteh-cafe.jpg",
        },
        {
            id: 5,
            name: "Cappuccino",
            price: 7,
            category: "hot-drinks",
            image: "/images/loghanteh-cafe.jpg",
        },
        {
            id: 6,
            name: "Chocolate Cake",
            price: 9,
            category: "cake-dessert",
            image: "/images/loghanteh-cafe.jpg",
        },
        {
            id: 7,
            name: "Cheesecake",
            price: 10,
            category: "cake-dessert",
            image: "/images/loghanteh-cafe.jpg",
        },
    ]

    const filteredMenus =
        cafeMenus.filter(
            menu => menu.category === activeFilter
        )

    return (
        <div className='min-h-screen'>
            {/* Tile */}
            <div className='py-10 text-center'>
                <h5 className='font-wulkan md:text-5xl text-3xl font-bold mb-5'>
                    Explore Our Menu
                </h5>
            </div>

            {/* Filters */}
            <CafeMenusFilters />

            {/* Menus items */}
            <StaggerWrapper
                key={activeFilter}
                variants={cafeMenusContainerVariant}
                once
                className={cn(
                    "grid grid-cols-12 lg:gap-10 gap-5",
                )}
            >
                {filteredMenus.map(menu => (
                    <CafeMenuItem
                        key={menu.id}
                        name={menu.name}
                        price={menu.price}
                        image={menu.image}
                    />
                ))}
            </StaggerWrapper>
        </div>
    )
}

export default CafeMenusSections