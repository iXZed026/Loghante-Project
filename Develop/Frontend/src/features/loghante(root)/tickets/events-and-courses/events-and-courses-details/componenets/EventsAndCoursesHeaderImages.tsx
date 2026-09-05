import FadeUp from '@/components/animations/FadeUp'
import AppImage from '@/components/ui/AppImage'
import { verySlowTransitionOut } from '@/lib/animations/transitions'
import { cn } from '@/lib/utils/cn'
import { useState } from 'react'

function EventsAndCoursesHeaderImages() {

    const [imageSrc, setImageSrc] =
        useState<string>("/images/loghanteh-cafe.jpg")

    function changeImageHandler(
        src: string
    ): void {
        setImageSrc(src)
    }

    return (
        <div className={cn(
            "lg:col-span-7 col-span-12",
            "fcol gap-y-5",
            "rounded-xl",
        )}>
            <div className='w-full overflow-hidden'>
                {/* Main Image */}
                <FadeUp
                    y={350}
                    key={imageSrc}
                    once={true}
                    transition={verySlowTransitionOut}
                >
                    <AppImage
                        width={1920}
                        height={1080}
                        src={imageSrc}
                        alt='event image'
                        priority
                        className='rounded-xl'
                    />
                </FadeUp>
            </div>
            {/* Selevet Image */}
            <div className='w-full rounded-lg fcc gap-3'>
                <AppImage
                    width={100}
                    height={45}
                    src={"/images/loghanteh-cafe.jpg"}
                    alt='event image'
                    className='cursor-pointer click-scale'
                    onClick={() => changeImageHandler("/images/loghanteh-cafe.jpg")}
                />
                <AppImage
                    width={100}
                    height={45}
                    src={"/images/loghanteh-cafe-2.jpg"}
                    alt='event image'
                    className='cursor-pointer click-scale'
                    onClick={() => changeImageHandler("/images/loghanteh-cafe-2.jpg")}
                />
                <AppImage
                    width={100}
                    height={45}
                    src={"/images/loghanteh-cafe.jpg"}
                    alt='event image'
                    className='cursor-pointer click-scale'
                    onClick={() => changeImageHandler("/images/loghanteh-cafe.jpg")}
                />
            </div>
        </div>
    )
}

export default EventsAndCoursesHeaderImages