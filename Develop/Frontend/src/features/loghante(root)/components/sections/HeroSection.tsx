import Container from '@/components/shared/Container'
import { useTranslations } from 'next-intl'
import React from 'react'

function HeroSection() {

    const t = useTranslations("hero")

    return (
        <section id="hero" className='relative h-screen'>
            {/* Video */}
            <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
            >
                <source
                    src="/videos/loghanteh/hero/loghante-hero-video.mp4"
                    type="video/mp4"
                />
            </video>

            {/* Dark Overlay */}
            {/* <div className="absolute inset-0 bg-black/100" /> */}

            {/* Content */}
            <div className={cn(
                "absolute bottom-0 left-0 w-full py-12 bg-gradient-to-b from-[#0a0a0a0f] to-[#000000]",
            )}>
                <Container>
                    <div className="font-wulkan text-white-utility">
                        <h1 className="text-4xl font-bold md:text-5xl">
                            {t("video-title")}
                        </h1>

                        <p className="mt-4 text-lg font-semibold md:text-xl">
                            {t("video-description")}
                        </p>
                    </div>
                </Container>
            </div>
        </section>
    )
}

export default HeroSection