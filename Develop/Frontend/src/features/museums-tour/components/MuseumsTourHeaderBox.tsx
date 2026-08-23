import { cn } from '@/lib/utils/cn'
import React from 'react'

function MuseumsTourHeaderBox() {
  return (
    <div className={cn(
      "w-full",
      "bg-crimson",
      "rounded-xl",
      "py-7 px-15 ",
      "text-white-utility",
      "grid grid-cols-12",
    )}>
      {/* Content */}
      <div className={cn(
        "col-span-6",
        "fcol justify-center gap-7.5"
      )}>
        <h2 className='font-wulkan text-4xl font-bold'>
          Loghanteh tour Museum
        </h2>
        <p>
          At Loghanteh Store, you can purchase cultural products, collectible models, books, and special souvenirs from the collection.At Loghanteh Store, you can purchase cultural products, collectible models, books, and special souvenirs from the collection.
        </p>
      </div>
      {/* Images */}
      <div className={cn(
        "col-span-6",
        "fec",
      )}>
        <div
          className={cn(
            "w-100 h-100",
            "bg-white-utility",
            "rounded-xl",
          )}
        />
      </div>
    </div>
  )
}

export default MuseumsTourHeaderBox