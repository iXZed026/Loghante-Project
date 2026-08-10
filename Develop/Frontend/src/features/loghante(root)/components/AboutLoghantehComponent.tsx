import AppImage from '@/components/ui/AppImage'
import { cn } from '@/lib/utils/cn'
import { TranslationFunction } from '@/types/translations'
import React from 'react'

interface IAboutLoghantehComponent {
    t: TranslationFunction
    reverse: boolean;
    title: string;
    description: string;
}

function AboutLoghantehComponent({
    t,
    reverse,
    title,
    description,
}: IAboutLoghantehComponent) {
    return (
        <div className={cn(
            "fbs",
            reverse && "flex-row-reverse"
        )}>
            {/* Image */}
            <div className='h-160'>
                {/* <AppImage
                    width={500}
                    height={750}
                    alt='about museum'
                    // src="/images/"
                /> */}
                {/* Box */}
                <div className='w-[500px] h-full bg-crimson rounded-2xl'>

                </div>
            </div>
            {/* Content */}
            <div className={cn(
                "w-[500px]",
            )}>
                <h2 className={cn(
                    "font-wulkan",
                    "font-bold text-5xl",
                    "mb-8"
                )}>
                    {title}
                </h2>
                <h4 className={cn(
                    "leading-7",
                    "text-black-light-utility",
                )}>
                    {description}
                </h4>
            </div>
        </div>
    )
}

export default AboutLoghantehComponent