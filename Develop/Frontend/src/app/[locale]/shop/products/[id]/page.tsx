
import ProductDetailsContent from "@/features/shop/products/componenets/product-details/ProductDetailsContent"

async function ProductDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params

    return <ProductDetailsContent productId={id} />
}

export default ProductDetailsPage
