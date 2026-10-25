import React from 'react'

function ProductMoreDetails() {
    return (
        <div className='fcol gap-y-15 md:px-10'>

            {/* Title */}
            <div>
                <h6 className='text-2xl font-semibold'>
                    Product details
                </h6>
            </div>

            {/* Details */}

            <div className='md:text-base text-sm text-black-light-utility fcol gap-y-5'>
                <div className='fbc'>
                    <span>
                        Material
                    </span>
                    <span>
                        Glass, Gold plated
                    </span>
                </div>
                <div className='fbc'>
                    <span>
                        Dimensions
                    </span>
                    <span>
                        12 cm X 5 cm
                    </span>
                </div>
                <div className='fbc'>
                    <span>
                        Weight
                    </span>
                    <span>
                        250g
                    </span>
                </div>
                <div className='fbc'>
                    <span>
                        year/era
                    </span>
                    <span>
                        Qajar dynasty (19th century)
                    </span>
                </div>
                <div className='fbc'>
                    <span>
                        origin
                    </span>
                    <span>
                        Iran
                    </span>
                </div>
                <div className='fbc'>
                    <span>
                        SkU
                    </span>
                    <span>
                        LP-PRF-001
                    </span>
                </div>
                <div className='fbc'>
                    <span>
                        Availability
                    </span>
                    <span>
                        In Stock
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ProductMoreDetails
