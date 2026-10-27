import { cn } from '@/lib/utils/cn'
import CartBox from './CartBox'

function CartItemWrraper() {



    return (
        <div
            className={cn(
                "lg:col-span-7 col-span-12",
                "fcol gap-y-5"
            )}
        >

            <div>
                <h3 className='font-semibold text-lg'>
                    Your shopping cart:
                </h3>
            </div>

            {/* Box Wrraper */}
            <div
                className={cn(
                    "fcol gap-y-1 h-115 overflow-y-scroll"
                )}
            >

                {/* Boxes */}
                <CartBox />
                <CartBox />
                <CartBox />

            </div>

        </div>
    )
}

export default CartItemWrraper
