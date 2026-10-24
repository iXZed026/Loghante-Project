import React from 'react'
import ProductDetailsHeaderImages from './ProductDetailsHeaderImages'
import { cn } from '@/lib/utils/cn'
import ProductDetailsHeaderDetails from './ProductDetailsHeaderDetails'

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
      <ProductDetailsHeaderDetails />

    </div>
  )
}

export default ProductDetailsHeader
