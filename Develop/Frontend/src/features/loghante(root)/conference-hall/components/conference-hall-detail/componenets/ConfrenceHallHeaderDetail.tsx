import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils/cn'
import React from 'react'
import { FiDownload } from 'react-icons/fi'
import { MdOutlineReduceCapacity } from 'react-icons/md'

function ConfrenceHallHeaderDetail() {
    return (
        <div
            className={cn(
                "col-span-6",
                "px-8",

            )}
        >
            <div className="fcol gap-10 py-5">
                <div>
                    <h6 className='text-xl font-bold'>
                        Farrokhi Yazdi Conference Hall
                    </h6>
                </div>
                <div className='text-black-light-utility'>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                    </p>
                </div>
                <div
                    className={cn(
                        "grid grid-cols-12 gap-5",
                        "text-sm font-semibold",
                        "text-crimson"
                    )}
                >
                    <div
                        className={cn(
                            "fcc gap-3",
                            "col-span-6",
                            "border-2  border-[var(--crimson-color)]",
                            "rounded-lg",
                            "py-2.5 px-3"
                        )}
                    >
                        <span>
                            <MdOutlineReduceCapacity className='size-6' />
                        </span>
                        <span>Capacity</span>
                        <span>150 people</span>
                    </div>
                    <div
                        className={cn(
                            "fcc gap-3",
                            "col-span-6",
                            "border-2 border-[var(--crimson-color)]",
                            "rounded-lg",
                            "py-2.5 px-3",
                        )}
                    >
                        <span>
                            <MdOutlineReduceCapacity className='size-6' />
                        </span>
                        <span>Capacity</span>
                        <span>150 people</span>
                    </div>
                    <div
                        className={cn(
                            "fcc gap-3",
                            "col-span-6",
                            "border-2 border-[var(--crimson-color)]",
                            "rounded-lg",
                            "py-2.5 px-3",
                        )}
                    >
                        <span>
                            <MdOutlineReduceCapacity className='size-6' />
                        </span>
                        <span>Capacity</span>
                        <span>150 people</span>
                    </div>
                </div>
                <div className='fcol gap-y-5 text-center'>
                    <Button
                        className={cn(
                            "w-full",
                            "bg-crimson",
                            "py-3",
                            "fcc gap-2",
                            "text-white-utility"
                        )}
                    >
                        <span>
                            Download forum information
                        </span>
                        <span>
                            <FiDownload />
                        </span>
                    </Button>
                    <a
                        className='font-semibold text-crimson'
                        href="tel:021-6555555"
                    >
                        Contact Customer Affairs: 021-6555555
                    </a>
                </div>
            </div>
        </div>
    )
}

export default ConfrenceHallHeaderDetail