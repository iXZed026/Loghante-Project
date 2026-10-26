
import Container from '@/components/shared/Container'
import LazySection from '@/components/ui/LazySection'
import ProductDetailsHeader from '@/features/shop/products/componenets/product-details/ProductDetailsHeader/ProductDetailsHeader'
import ProductDetailsSuggestionLike from '@/features/shop/products/componenets/product-details/ProductDetailsSuggestionLike'
import ProductDetailsWorkshop from '@/features/shop/products/componenets/product-details/ProductDetailsWorkshop'
import ProductMoreDetails from '@/features/shop/products/componenets/product-details/ProductMoreDetails'


function ProductDetailsPage() {
    return (
        <div
            className='py-32'
        >

            <div className='fcol gap-y-15'>
                <Container>
                    <div className='fcol gap-y-15'>
                        {/* Header */}
                        <ProductDetailsHeader />

                        {/* More Details */}
                        <ProductMoreDetails />
                    </div>
                </Container>

                {/* Workshps */}
                <ProductDetailsWorkshop />


                {/* Like Suggestion */}

                <Container>

                    <LazySection
                        rootMargin="300px 0px"
                        placeholderClassName="rounded-none"
                    >
                        <ProductDetailsSuggestionLike />
                    </LazySection>
                </Container>

            </div>


        </div>
    )
}

export default ProductDetailsPage
