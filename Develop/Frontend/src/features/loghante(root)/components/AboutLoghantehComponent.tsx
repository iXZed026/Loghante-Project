import FadeUp from '@/components/animations/FadeUp'
// import AppImage from '@/components/ui/AppImage'
import {
    slowTransitionOut,
    verySlowTransitionOut
} from '@/lib/animations/transitions'
import { cn } from '@/lib/utils/cn'
import { TranslationFunction } from '@/types/translations'

interface IAboutLoghantehComponent {
    reverse: boolean;
    title: string;
    description: string;
}

function AboutLoghantehComponent({
    reverse,
    title,
    description,
}: IAboutLoghantehComponent) {
    return (
        <div className='overflow-hidden'>

            <div className={cn(
                "fbs",
                reverse && "flex-row-reverse"
            )}>
                {/* Image */}
                <FadeUp
                    transition={verySlowTransitionOut}
                    y={100}
                >
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
                </FadeUp>
                {/* Content */}
                <div className={cn(
                    "w-[500px]",
                )}>
                    <FadeUp
                        transition={slowTransitionOut}
                        y={40}
                        amount={0.6}
                    >
                        <h2 className={cn(
                            "font-wulkan",
                            "loghante-section-title",
                            "mb-8"
                        )}>
                            {title}
                        </h2>
                    </FadeUp >
                    <FadeUp
                        transition={slowTransitionOut}
                        y={60}
                    >
                        <h4 className={cn(
                            "leading-7",
                            "text-black-light-utility",
                        )}>
                            {description}
                        </h4>
                    </FadeUp>
                </div>
            </div >
        </div >
    )
}

export default AboutLoghantehComponent