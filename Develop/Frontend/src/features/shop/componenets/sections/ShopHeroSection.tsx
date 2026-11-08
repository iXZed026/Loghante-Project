import Button from '@/components/ui/Button'
import Container from '@/components/shared/Container'
import React from 'react'
import { cn } from '@/lib/utils/cn'
import { useTranslations } from 'next-intl'
import AppLink from '@/components/ui/AppLink'

function ShopHero() {

  const T = useTranslations("shopHero")

  return (
    <section className="relative mt-[80px] min-h-[calc(100vh-80px)] overflow-hidden text-white-utility">

      {/* Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 z-0 h-full w-full object-cover"
      >
        <source
          // src="https://74aex8lzr0js8tkj.public.blob.vercel-storage.com/loghante-hero-video.mp4"
          type="video/mp4"
        />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 z-[1] bg-black/40" />

      {/* Content */}
      <div className="relative z-10 flex min-h-[calc(100vh-80px)] md:items-center items-end">
        <Container>
          <div className="md:py-0 py-10 fcol md:justify-start justify-center md:items-start items-center md:gap-y-10 gap-y-5 xl:w-1/2 md:w-2/3 w-full">
            <div>
              <h1 className="font-wulkan md:text-5xl text-3xl font-bold">
                {T("title")}
              </h1>
            </div>

            <div>
              <h4 className='leading-7 md:text-base text-sm md:text-start text-center'>
                {T("description")}
              </h4>
            </div>

            <div className="flex flex-wrap gap-4 tsm:ext-sm text-xs font-semibold transition-colors">
              <AppLink
                href='/shop/products'
              >
                <Button
                  className={cn(
                    "bg-blue-utility py-3 sm:px-5 px-3",
                    "hover:bg-[var(--blue-hover-color)]/80",
                  )}
                >
                  {T("explore-shop-button")}
                </Button>
              </AppLink>

              <AppLink
                href='/'
              >
                <Button
                  className={cn(
                    "border-2",
                    "py-3 sm:px-5 px-3",
                    "hover:bg-[var(--white-light-color)]/80",
                  )}
                >
                  {T("explore-loghanteh-button")}
                </Button>
              </AppLink>
            </div>
          </div>
        </Container>
      </div>

    </section>
  )
}

export default ShopHero