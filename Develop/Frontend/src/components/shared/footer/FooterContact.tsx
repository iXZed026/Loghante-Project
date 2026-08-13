import { cn } from '@/lib/utils/cn'
import React from 'react'
import { BsFillTelephoneFill } from 'react-icons/bs'
import { FaLocationDot } from 'react-icons/fa6'
import { MdAccessTime } from 'react-icons/md'

function FooterContact() {
    return (
        <div
            className={cn(
                "xl:col-span-3 md:col-span-4 col-span-6",
                "fcol gap-10",
            )}
        >
            <div>
                <h4 className='font-semibold md:text-lg'>
                    Contact us and address
                </h4>
            </div>
            <div>
                <ul className='fcol gap-4 md:text-[16px] text-sm'>
                    <li className='flex items-center gap-2'>
                        <BsFillTelephoneFill className='size-5' />
                        <a href="phone:021-65555555">
                            021-65555555
                        </a>
                    </li>
                    <li className='flex items-center gap-2'>
                        <MdAccessTime className='size-5' />
                        <span>
                            From 8 Am To 4 Pm
                        </span>
                    </li>
                    <li className='flex items-center gap-2'>
                        <FaLocationDot className='size-5' />
                        <span>
                            Tehran - shahid ghodosy
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default FooterContact