"use client"

import AppLink from '@/components/ui/AppLink'
import React from 'react'
import { cafeMenusFilters } from '../data/cafe-menus-filters'
import { cn } from '@/lib/utils/cn'
import { useSearchParams } from 'next/navigation'

function CafeMenusFilters() {

    const searchParams = useSearchParams()

    const activeFilter =
        searchParams.get("filter") || cafeMenusFilters[0].slug

    

    return (
        <div>
            <div className='fcc mb-10'>
                <ul className='fcc w-300 mx-auto text-center'>
                    {cafeMenusFilters.map(filter => (
                        <li
                            key={filter.id}
                            className='w-full py-7'>
                            <AppLink
                                className={cn(
                                    "text-lg",
                                    "px-3 py-2",
                                    "border-b-4",
                                    "rounded-md",
                                    "bg-opacity-crimson",
                                    "transition-colors",
                                    activeFilter === filter.slug
                                        ? "border-[var(--crimson-color)] text-crimson"
                                        : "border-transparent text-black"
                                )}
                                href={`/cafe-menu?filter=${filter.slug}`}
                                scroll={false}
                            >
                                {filter.name}
                            </AppLink>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default CafeMenusFilters