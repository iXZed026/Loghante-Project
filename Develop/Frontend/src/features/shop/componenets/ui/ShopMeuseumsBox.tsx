import Image from 'next/image'
import { ArrowUpLeft } from 'lucide-react'
import AppImage from '@/components/ui/AppImage'

interface IShopMeuseumsBox {
    title: string
    imageURL: string
}

function ShopMeuseumsBox({
    title,
    imageURL,
}: IShopMeuseumsBox) {
    return (
        <article className="group relative col-span-6 min-w-0 overflow-hidden rounded-2xl border border-black/5 bg-[#f5f2ed] shadow-sm transition-shadow duration-300 hover:shadow md:col-span-4  xl:col-span-2">
            {/* Image */}
            <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[4/4.5]">
                <AppImage
                    src={imageURL}
                    alt={title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/5 transition-opacity duration-300 group-hover:from-black/90" />


                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 lg:p-7">
                    <div className="mb-3 h-px w-10 bg-[var(--gold-color)] transition-all duration-300 group-hover:w-16" />

                    <div className="flex items-end justify-between gap-3">
                        <div className="min-w-0">
                            <h3 className="text-lg font-semibold leading-snug text-white transition-colors duration-300 group-hover:text-[var(--gold-color)] sm:text-base">
                                {title}
                            </h3>

                        </div>

                    </div>
                </div>

                {/* Hover border */}
                <div className="pointer-events-none absolute inset-3 rounded-xl border-2 border-[var(--white-color)]/0 transition-colors duration-300 group-hover:border-[var(--white-color)]/25 sm:inset-4" />
            </div>
        </article>
    )
}

export default ShopMeuseumsBox