'use client'

import Button from '@/components/ui/Button'
import { museumParts } from '@/features/loghante(root)/data/museumParts'
import { cn } from '@/lib/utils/cn'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import ShopFIltersDropdown from './ShopFIltersDropdown'
import { productCategories } from '../../data/productCategories'
import PriceRange from './ShopPriceRange'

type FilterKey = 'museum' | 'category'

function ShopFIltersWrraper() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const getSelectedIds = (key: FilterKey): string[] => {
        return (searchParams.get(key) ?? '')
            .split(',')
            .filter(Boolean)
    }

    const museumIds = getSelectedIds('museum')
    const categoryIds = getSelectedIds('category')

    const toggleFilter = (key: FilterKey, id: string | number) => {
        const params = new URLSearchParams(searchParams.toString())
        const selectedIds = getSelectedIds(key)
        const normalizedId = String(id)

        const updatedIds = selectedIds.includes(normalizedId)
            ? selectedIds.filter((selectedId) => selectedId !== normalizedId)
            : [...selectedIds, normalizedId]

        if (updatedIds.length > 0) {
            params.set(key, updatedIds.join(','))
        } else {
            params.delete(key)
        }

        const query = params.toString()
        router.replace(query ? `${pathname}?${query}` : pathname, {
            scroll: false,
        })
    }

    const resetFilters = () => {
        const params = new URLSearchParams(searchParams.toString())

        params.delete('museum')
        params.delete('category')
        params.delete('minPrice')
        params.delete('maxPrice')
        params.delete('sort')

        const query = params.toString()

        router.replace(query ? `${pathname}?${query}` : pathname, {
            scroll: false,
        })
    }

    return (
        <aside
            className={cn(
                'lg:col-span-4 col-span-12',
                'fcol gap-y-5',
                'rounded-lg border border-[var(--black-color)]/25',
                'py-5',
            )}
        >
            {/* Header */}
            <div className="fbc px-3 py-4">
                <h2 className="font-wulkan text-2xl font-bold">
                    Filters
                </h2>

                <Button
                    onClick={resetFilters}
                    className={cn(
                        'text-blue-utility',
                        'transition-colors',
                        'hover:text-[var(--blue-hover-color)]',
                    )}
                >
                    Reset All
                </Button>
            </div>

            {/* Filters */}
            <div className="fcol gap-y-5 px-3">
                <ShopFIltersDropdown
                    title="Museum"
                    items={museumParts}
                    selectedIds={museumIds}
                    onToggle={(id) => toggleFilter('museum', id)}
                />

                <ShopFIltersDropdown
                    title="Category"
                    items={productCategories}
                    selectedIds={categoryIds}
                    onToggle={(id) => toggleFilter('category', id)}
                />
            </div>

            {/* Price Range */}

            <PriceRange />
        </aside>
    )
}

export default ShopFIltersWrraper
