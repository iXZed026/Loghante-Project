import ShopDiscoverComponenet from '@/features/shop/componenets/ui/ShopDiscoverComponenet'
import React from 'react'

function ProductDetailsWorkshop() {
    return (
        <div className='rounded-lg'>
            <ShopDiscoverComponenet
                title={"Loghanteh Workshop"}
                description={"Discover Loghanteh — a historical and cultural complex bringing together museums, cafés, exhibitions, cultural spaces and unique experiences."}
                button='Explore Our  Workshops'
                href={"/workshops-and-studios"}
            />
        </div>
    )
}

export default ProductDetailsWorkshop
