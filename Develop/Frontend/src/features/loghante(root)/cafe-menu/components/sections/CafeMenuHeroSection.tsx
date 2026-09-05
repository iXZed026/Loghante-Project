import Container from '@/components/shared/Container'
import { cn } from '@/lib/utils/cn'
import React from 'react'

function CafeMenuHero() {
    return (
        <section id="hero" className='relative h-screen select-none'>
            {/* Video */}
            <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
            >
                <source
                    src="/videos/loghanteh/cafe-menu-hero/final.mp4"
                    type="video/mp4"
                />
            </video>
            {/* Content */}
            <div className={cn(
                "w-full",
                "py-12",
                "absolute bottom-0 left-0",
                "gradient-shadow",
            )}>
                <Container>
                    <div className="text-white-utility">
                        <h1 className="font-wulkan mb-7 text-3xl font-bold md:text-5xl">
                            Loghanteh Museum Cafe Bar
                        </h1>
                    </div>
                </Container>
            </div>
        </section>
    )
}

export default CafeMenuHero