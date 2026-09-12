import FadeIn from '@/components/animations/FadeIn'
import FadeUp from '@/components/animations/FadeUp'
import AppImage from '@/components/ui/AppImage'
import AppLink from '@/components/ui/AppLink'
import Button from '@/components/ui/Button'
import { verySlowTransitionOut } from '@/lib/animations/transitions'
import { cn } from '@/lib/utils/cn'

interface ILoghantehSectionBox {
    sectionName: string
    title: string
    description: string
    reverse?: boolean;
    href: string;
    textButton: string,
}

function LoghantehSectionBox({
    sectionName,
    title,
    description,
    reverse = false,
    href,
    textButton,
}: ILoghantehSectionBox) {
    return (
        <div className={cn(
            "min-h-150 md:w-full sm:w-4/5 mx-auto",
            "xl:px-20 md:px-5 ",
            " shadow-[0_0_60px_rgba(0,0,0,0.35)]",
            "fcc",
            "rounded-2xl"
        )}>
            <div className={cn(
                " w-full",
                "md:flex md:flex-row fcol items-center",
                reverse && "md:flex-row-reverse",
            )}>
                {/* Image */}
                <div className={cn(
                    "w-full h-113",
                    "flex items-center",
                    "justify-end0",
                    reverse && "justify-end"
                )}>
                    {/* <AppImage
                    width={500}
                    height={500}
                    alt='shop image'
                    src={"/images/"}
                /> */}
                    <FadeIn className={cn(
                        "lg:w-[450px] md:w-[350px] w-full",
                        " lg:h-full md:h-3/4 h-full"
                    )}>
                        <div className={cn(
                            "w-full",
                            "h-full",
                            "bg-crimson ",
                            "rounded-lg",
                        )}>

                        </div>
                    </FadeIn>
                </div>
                {/* COntent */}
                <div className={cn(
                    "w-full",
                    "xl:px-14 md:px-7 px-10 py-10",
                    "fcol xl:gap-12 md:gap-8 gap-7",
                )}>
                    <FadeIn
                        transition={verySlowTransitionOut}
                    >
                        <h2 className={cn(
                            "font-bold text-crimson text-lg",
                        )}>
                            {sectionName}
                        </h2>
                    </FadeIn>
                    <FadeUp>
                        <h4 className={cn(
                            "xl:text-5xl lg:text-4xl md:text-3xl text-4xl",
                            "font-wulkan",
                        )}>
                            {title}
                        </h4>
                    </FadeUp>
                    <FadeUp
                        transition={verySlowTransitionOut}
                    >
                        <h6 className={cn(
                            "xl:text-lg md:text-sm",
                            "text-black-light-utility",
                            "leading-8",
                        )}>
                            {description}
                        </h6>
                    </FadeUp>
                    <FadeIn
                        transition={verySlowTransitionOut}
                    >
                        <AppLink
                            href={href}
                        >
                            <Button className={cn(
                                "xl:text-md",
                                "py-2",
                                "hover:opacity-90",
                                "bg-crimson",
                                "cliclk-scale",
                            )}>
                                {textButton}
                            </Button>
                        </AppLink>
                    </FadeIn>
                </div>
            </div>
        </div >
    )
}

export default LoghantehSectionBox