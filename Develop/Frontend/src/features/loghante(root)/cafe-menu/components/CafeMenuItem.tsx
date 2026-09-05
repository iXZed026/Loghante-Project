import AppImage from '@/components/ui/AppImage'
import { cn } from '@/lib/utils/cn'
import React from 'react'

interface ICafeMenuItem {
    name: string;
    price: number;
    image: string;
}

function CafeMenuItem({
    name,
    price,
    image,
}: ICafeMenuItem) {
    return (
        <div className={cn(
            "lg:col-span-3 md:col-span-6 ",
            "border border-black-opacity shadow-lg overflow-hidden",
            "rounded-lg",
        )}>
            <div>
                {/* Image */}
                <div className='w-full h-45'>
                    <AppImage
                        src={image}
                        width={500}
                        height={300}
                        alt={name}
                        className='w-full h-full object-cover'
                    />
                </div>
                <div>
                    <div
                        className='fbc px-5 py-4'
                    >
                        <span className='font-bold text-sm'>
                            {name}
                        </span>
                        <span className='text-crimson font-semibold text-sm'>
                            {price}$
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CafeMenuItem