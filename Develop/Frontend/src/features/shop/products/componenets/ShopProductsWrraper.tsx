import { cn } from '@/lib/utils/cn'
import React from 'react'
import ProductBox from '../../componenets/ui/ProductBox'
import ShopSearchDropdown from '../../componenets/ShopHeader/ShopSearchDropdown'
import ShopSortDrropDown from '../../componenets/ShopHeader/ShopSortDrropDown'
import ShopPagination from './ShopPagination'

function ShopProductsWrraper() {
    return (
        <div
            className='lg:col-span-8 col-span-12 fcol gap-y-10'
        >

            {/* Search & Sort */}
            <div className='fbc'>
                <div className='md:w-full w-4/6'>
                    <ShopSearchDropdown
                        variant="menu"
                    />
                </div>
                <div>
                    <ShopSortDrropDown />
                </div>
            </div>

            {/* Products */}
            <div
                className={cn(
                    "grid md:grid-cols-12 grid-cols-8",
                )}
            >
                <ProductBox />
                <ProductBox />
                <ProductBox />
                <ProductBox />
                <ProductBox />
                <ProductBox />
                <ProductBox />
                <ProductBox />
                <ProductBox />
            </div>

            {/* Pagination */}
            <div>
                <ShopPagination totalItems={100} itemsPerPage={10} />
            </div>
        </div>
    )
}

export default ShopProductsWrraper
