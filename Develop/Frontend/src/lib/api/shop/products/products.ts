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

export interface ProductListData {
	items: ProductResponseData[]
	page: number
	pageSize: number
	total: number
	totalPages: number
}

export interface ProductListResponse {
	data: ProductListData
	message: string
	success: boolean
}

export interface ProductListFilters {
	museumIds?: Array<string | number>
	categoryIds?: Array<string | number>
	minPrice?: string | number
	maxPrice?: string | number
	sortBy?: string
	page?: number
	pageSize?: number
}

export interface ProductImageResponse {
	productImageId: number
	productVariantId?: number
	imageUrl: string
	displayOrder: number
	isPrimary: boolean
}

export interface ProductVariantResponse {
	productVariantId: number
	color: string
	sku: string
	price: string
	stockQuantity: number
	isActive: boolean
}

export interface ProductDetailData extends ProductResponseData {
	description: string
	categoryId: number
	museumId: number
	origin: string
	material: string
	weight?: string | null
	length?: string | null
	width?: string | null
	height?: string | null
	era: string
	availability: boolean
	images: ProductImageResponse[]
	variants: ProductVariantResponse[]
	related: ProductResponseData[]
}

export interface ProductDetailResponse {
	data: ProductDetailData
	message: string
	success: boolean
}

export async function getProducts(
	filters: ProductListFilters,
	locale: string,
): Promise<ProductListResponse> {
	const params = new URLSearchParams()
	const setList = (key: string, values?: Array<string | number>) => {
		if (values?.length) params.set(key, values.join(","))
	}

	setList("museum", filters.museumIds)
	setList("category", filters.categoryIds)

	if (filters.minPrice !== undefined) params.set("minPrice", String(filters.minPrice))
	if (filters.maxPrice !== undefined) params.set("maxPrice", String(filters.maxPrice))
	if (filters.sortBy) params.set("sortBy", filters.sortBy)
	params.set("page", String(filters.page ?? 1))
	params.set("pageSize", String(filters.pageSize ?? 9))

	return fetcher<ProductListResponse>(
		`/products?${params.toString()}`,
		{
			method: "GET",
		},
		locale,
	)
}

export async function getProductDetail(
	productId: number | string,
	locale: string,
): Promise<ProductDetailResponse> {
	return fetcher<ProductDetailResponse>(
		`/products/${productId}`,
		{
			method: "GET",
		},
		locale,
	)
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
