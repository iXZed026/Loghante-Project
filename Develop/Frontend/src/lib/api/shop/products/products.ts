import { fetcher } from "../../fetcher"

export interface ProductResponseData {
	productId: number
	name: string
	museumName: string
	price: string
	discountPercent?: string
	imageUrl: string
}

export interface ProductsResponse {
	data: ProductResponseData[]
	message: string
	success: boolean
}

export async function getDiscountedProducts(
	locale: string,
): Promise<ProductsResponse> {
	return fetcher<ProductsResponse>(
		"/products/discounted",
		{
			method: "GET",
		},
		locale,
	)
}

export async function getNewestProducts(
	locale: string,
): Promise<ProductsResponse> {
	return fetcher<ProductsResponse>(
		"/products/newest",
		{
			method: "GET",
		},
		locale,
	)
}

export async function getProductsByMuseum(
	locale: string,
	museumId?: number,
): Promise<ProductsResponse> {
	const endpoint = museumId === undefined
		? "/products/by-museum"
		: `/products/by-museum?${new URLSearchParams({ museumId: String(museumId) })}`

	return fetcher<ProductsResponse>(
		endpoint,
		{
			method: "GET",
		},
		locale,
	)
}
