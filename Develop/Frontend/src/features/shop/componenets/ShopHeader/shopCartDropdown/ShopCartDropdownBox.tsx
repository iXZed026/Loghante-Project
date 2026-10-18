import Button from '@/components/ui/Button'
import React from 'react'
import { IoClose } from 'react-icons/io5'

function ShopCartDropdownBox() {
    return (
        <div className='flex justify-between'>
            <div className='flex items-center gap-4'>
                <div className='w-22 h-22 bg-blue-utility rounded-md'>

                </div>

                <div className='fcol gap-y-2'>
                    <div>
                        <span className='font-semibold'>
                            Merchant's ledger
                        </span>
                    </div>
                    <div>
                        <span className='text-xs text-black-light-utility'>
                            Merchant's ledger
                        </span>
                    </div>
                </div>
            </div>


            <div className='flex  items-start justify-end'>
                <Button>
                    <IoClose
                        className='text-black-utility'
                        size={15}
                    // onClick={ }
                    />
                </Button>
            </div>
        </div>
    )
}

export default ShopCartDropdownBox
