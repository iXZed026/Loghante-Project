import ProductBox from '@/features/shop/componenets/ui/ProductBox'
import { cn } from '@/lib/utils/cn'
import { useTranslations } from 'next-intl'

function ProductDetailsSuggestionLike() {

    const t = 
        useTranslations("shopProductDetails.like-product")

    return (
        <div className='fcol gap-y-10'>
            <div>
                <h6 className='font-wulkan font-bold md:text-3xl text-2xl'>
                    {t("title")}
                </h6>
            </div>
            <div
                className={cn(
                    "grid lg:grid-cols-12 grid-cols-6 lg:gap-3"
                )}
            >
                <ProductBox
                    col={"3"}
                />
                <ProductBox
                    col={"3"}
                />
                <ProductBox
                    col={"3"}
                />
                <ProductBox
                    col={"3"}
                />
            </div>
        </div>
    )
}

export default ProductDetailsSuggestionLike
