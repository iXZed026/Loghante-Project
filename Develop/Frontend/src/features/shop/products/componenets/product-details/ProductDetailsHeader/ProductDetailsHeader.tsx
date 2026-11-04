import React from 'react'
import ProductDetailsHeaderImages from './ProductDetailsHeaderImages'
import { cn } from '@/lib/utils/cn'
import ProductDetailsHeaderDetails from './ProductDetailsHeaderDetails'
import type { ProductDetailData } from '@/lib/api/shop/products/products'

interface ProductDetailsHeaderProps {
  product: ProductDetailData
}

function ProductDetailsHeader({ product }: ProductDetailsHeaderProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-12 gap-5"
      )}
    >
      {/* Images */}
      <ProductDetailsHeaderImages product={product} />

      {/* Details */}
      <ProductDetailsHeaderDetails product={product} />

    </div>
  )
}

export default ProductDetailsHeader
