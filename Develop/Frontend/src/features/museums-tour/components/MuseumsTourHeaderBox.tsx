import { cn } from '@/lib/utils/cn'
import React from 'react'

function MuseumsTourHeaderBox() {
  return (
    <div
      className={cn(
        "w-full",
        "bg-crimson",
        "rounded-xl",
        "md:py-7 py-15 xl:px-15 px-10",
        "text-white-utility",
        "grid grid-cols-12 md:gap-3 gap-y-8",
      )}
    >
      {/* Images */}
      <div
        className={cn(
          "md:col-span-6 col-span-12",
          "fec",
          "order-1 md:order-2",
        )}
      >
        <div
          className={cn(
            "md:w-100 md:h-100 h-60 w-full",
            "bg-white-utility",
            "rounded-xl",
          )}
        />
      </div>

      {/* Content */}
      <div
        className={cn(
          "md:col-span-6 col-span-12",
          "fcol justify-center gap-7.5",
          "md:px-0 px-7",
          "order-2 md:order-1",
        )}
      >
        <h2 className="font-wulkan md:text-4xl text-2xl font-bold ">
          Loghanteh tour Museum
        </h2>

        <p className="text-base  leading-relaxed">
          At Loghanteh Store, you can purchase cultural products,
          collectible models, books, and special souvenirs from the
          collection. At Loghanteh Store, you can purchase cultural
          products, collectible models, books, and special souvenirs
          from the collection.
        </p>
      </div>
    </div>
  )
}

export default MuseumsTourHeaderBox