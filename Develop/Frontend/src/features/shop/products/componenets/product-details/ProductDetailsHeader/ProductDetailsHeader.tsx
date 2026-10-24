import React from 'react'
import ProductDetailsHeaderImages from './ProductDetailsHeaderImages'
import { cn } from '@/lib/utils/cn'

function ProductDetailsHeader() {
  return (
    <div
      className={cn(
        "grid grid-cols-12 gap-5"
      )}
    >
      {/* Images */}
      <ProductDetailsHeaderImages />

      {/* Details */}
      <div className='col-span-7'>

      </div>
    </div>
  )
}

export default ProductDetailsHeader
