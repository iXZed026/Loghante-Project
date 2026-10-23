'use client'

import { useEffect, useState } from 'react'
import { useLocale } from 'next-intl'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils/cn'

const MIN_LIMIT = 10
const MAX_LIMIT = 50000
const STEP = 10

function parsePrice(value: string | null, fallback: number) {
    if (value === null || value.trim() === '') return fallback

    const parsedValue = Number(value)

    if (!Number.isFinite(parsedValue)) return fallback

    return Math.min(MAX_LIMIT, Math.max(MIN_LIMIT, parsedValue))
}

function PriceRange() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const locale = useLocale()

    const minPriceParam = searchParams.get('minPrice')
    const maxPriceParam = searchParams.get('maxPrice')

    const getPrices = () => {
        const min = parsePrice(minPriceParam, MIN_LIMIT)
        const max = parsePrice(maxPriceParam, MAX_LIMIT)

        return min < max
            ? { minPrice: min, maxPrice: max }
            : { minPrice: MIN_LIMIT, maxPrice: MAX_LIMIT }
    }

    const [minPrice, setMinPrice] = useState(() => getPrices().minPrice)
    const [maxPrice, setMaxPrice] = useState(() => getPrices().maxPrice)

    useEffect(() => {
        const prices = getPrices()

        setMinPrice(prices.minPrice)
        setMaxPrice(prices.maxPrice)
    }, [minPriceParam, maxPriceParam])

    const applyPriceFilter = () => {
        const params = new URLSearchParams(searchParams.toString())

        if (minPrice <= MIN_LIMIT) {
            params.delete('minPrice')
        } else {
            params.set('minPrice', String(minPrice))
        }

        if (maxPrice >= MAX_LIMIT) {
            params.delete('maxPrice')
        } else {
            params.set('maxPrice', String(maxPrice))
        }

        const query = params.toString()

        router.replace(query ? `${pathname}?${query}` : pathname, {
            scroll: false,
        })
    }

    const formatPrice = (value: number) =>
        new Intl.NumberFormat(locale === 'fa' ? 'fa-IR' : 'en-US').format(value)

    const minPercent =
        ((minPrice - MIN_LIMIT) / (MAX_LIMIT - MIN_LIMIT)) * 100

    const maxPercent =
        ((maxPrice - MIN_LIMIT) / (MAX_LIMIT - MIN_LIMIT)) * 100

    const sliderClasses = cn(
        'pointer-events-none absolute inset-0 h-5 w-full',
        'appearance-none bg-transparent',
        '[&::-webkit-slider-runnable-track]:h-1',
        '[&::-webkit-slider-runnable-track]:bg-transparent',
        '[&::-moz-range-track]:h-1',
        '[&::-moz-range-track]:bg-transparent',
        '[&::-webkit-slider-thumb]:pointer-events-auto',
        '[&::-webkit-slider-thumb]:mt-[-6px]',
        '[&::-webkit-slider-thumb]:size-4',
        '[&::-webkit-slider-thumb]:appearance-none',
        '[&::-webkit-slider-thumb]:rounded-full',
        '[&::-webkit-slider-thumb]:border-2',
        '[&::-webkit-slider-thumb]:border-white',
        '[&::-webkit-slider-thumb]:bg-[var(--blue-color)]',
        '[&::-webkit-slider-thumb]:shadow-sm',
        '[&::-webkit-slider-thumb]:cursor-pointer',
        '[&::-moz-range-thumb]:pointer-events-auto',
        '[&::-moz-range-thumb]:size-4',
        '[&::-moz-range-thumb]:rounded-full',
        '[&::-moz-range-thumb]:border-2',
        '[&::-moz-range-thumb]:border-white',
        '[&::-moz-range-thumb]:bg-[var(--blue-color)]',
        '[&::-moz-range-thumb]:shadow-sm',
        '[&::-moz-range-thumb]:cursor-pointer',
    )

    return (
        <section className="fcol gap-y-8 px-3 py-5">
            <h3 className="font-wulkan text-2xl font-bold text-black-utility">
                Price Range
            </h3>

            <div className="fbc gap-3 text-sm font-600 text-black-utility">
                <span>{formatPrice(minPrice)} $</span>
                <span>{formatPrice(maxPrice)} $</span>
            </div>

            <div className="relative mx-2 h-5" dir="ltr">
                <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-[var(--black-color)]/30" />

                <div
                    className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-[var(--blue-color)]"
                    style={{
                        left: `${minPercent}%`,
                        width: `${maxPercent - minPercent}%`,
                    }}
                />

                <input
                    aria-label="Minimum price"
                    type="range"
                    min={MIN_LIMIT}
                    max={MAX_LIMIT}
                    step={STEP}
                    value={minPrice}
                    onChange={(event) => {
                        const value = Number(event.target.value)
                        setMinPrice(Math.min(value, maxPrice - STEP))
                    }}
                    className={sliderClasses}
                />

                <input
                    aria-label="Maximum price"
                    type="range"
                    min={MIN_LIMIT}
                    max={MAX_LIMIT}
                    step={STEP}
                    value={maxPrice}
                    onChange={(event) => {
                        const value = Number(event.target.value)
                        setMaxPrice(Math.max(value, minPrice + STEP))
                    }}
                    className={sliderClasses}
                />
            </div>

            <Button
                onClick={applyPriceFilter}
                className={cn(
                    'w-full justify-center',
                    'bg-blue-utility text-white',
                    'transition-colors hover:bg-[var(--blue-hover-color)]',
                    'py-2.5'
                )}
            >
                Apply Price Filter
            </Button>
        </section>
    )
}

export default PriceRange
