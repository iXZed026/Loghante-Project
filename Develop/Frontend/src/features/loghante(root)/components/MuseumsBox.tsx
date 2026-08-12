import AppLink from '@/components/ui/AppLink'
import { cn } from '@/lib/utils/cn'
import React from 'react'
import { IMuseumPart } from '../data/museumParts'
import { getLocalizedValue } from '@/lib/utils/getLocalizedValue'
import { useLocale } from 'next-intl'

type MuseumBox = IMuseumPart

function MuseumsBox(props: MuseumBox) {

    const { href, name } = props

    const locale = useLocale()

    return (
        <AppLink
            href={href}
        >
            <div className={cn(
                "h-93",
                "relative",
                "bg-crimson",
                "rounded-2xl",
                "text-white-utility"
            )}>
                {/* Image */}
                <div></div>
                {/* Content */}
                <div className='w-full gradient-shadow absolute bottom-0 px-3 py-5 fcol gap-3 rounded-2xl'>
                    <h3>{getLocalizedValue(name, locale)}</h3>
                </div>
            </div>
        </AppLink>
    )
}

export default MuseumsBox