import { cn } from '@/lib/utils/cn'

interface IWorkshopsAndStudiosDetailCompBox {
    reverse?: boolean;
}

function WorkshopsAndStudiosDetailCompBox({
    reverse = true
}: IWorkshopsAndStudiosDetailCompBox) {
    return (
        <div
            className={cn(
                "md:flex-row flex flex-col gap-5",
                reverse && "md:flex-row-reverse",
                "lg:px-10 px-5 py-5"
            )}
        >

            {/* Image */}
            <div className='fcc w-full'>
                <div className='bg-crimson lg:w-4/5 w-full lg:h-110 h-90 rounded-xl'>

                </div>
            </div>

            {/* Content */}
            <div className='w-full fcol items-start justify-start'>

                <div className='md:py-15 py-7 font-bold'>
                    <h5 className='font-wulkan lg:text-5xl md:text-4xl text-3xl leading-13'>
                        A Warm space Inside Loghanteh
                    </h5>
                </div>

                <div>
                    <p className='md:text-sm text-xs'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in reprehenderit
                        in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint.
                    </p>
                </div>

            </div>

        </div>
    )
}

export default WorkshopsAndStudiosDetailCompBox

