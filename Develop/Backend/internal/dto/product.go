package dto

import "github.com/shopspring/decimal"

type ProductCard struct {
	ProductID       uint            `json:"productId"`
	Name            string          `json:"name"`
	MuseumName      string          `json:"museumName"`
	Price           decimal.Decimal `json:"price"`
	DiscountPercent decimal.Decimal `json:"discountPercent"`
	ImageURL        string          `json:"imageUrl"`
}

type ProductListResponse struct {
	Items      []ProductCard `json:"items"`
	Page       int           `json:"page"`
	PageSize   int           `json:"pageSize"`
	Total      int64         `json:"total"`
	TotalPages int64         `json:"totalPages"`
}

type ProductImageResponse struct {
	ProductImageID   uint   `json:"productImageId"`
	ProductVariantID *uint  `json:"productVariantId,omitempty"`
	ImageURL         string `json:"imageUrl"`
	DisplayOrder     int    `json:"displayOrder"`
	IsPrimary        bool   `json:"isPrimary"`
}

type ProductVariantResponse struct {
	ProductVariantID uint            `json:"productVariantId"`
	Color            string          `json:"color"`
	SKU              string          `json:"sku"`
	Price            decimal.Decimal `json:"price"`
	StockQuantity    int             `json:"stockQuantity"`
	IsActive         bool            `json:"isActive"`
}

type ProductDetailResponse struct {
	ProductCard
	Description  string                   `json:"description"`
	CategoryID   uint                     `json:"categoryId"`
	MuseumID     uint                     `json:"museumId"`
	Origin       string                   `json:"origin"`
	Material     string                   `json:"material"`
	Weight       *decimal.Decimal         `json:"weight,omitempty"`
	Length       *decimal.Decimal         `json:"length,omitempty"`
	Width        *decimal.Decimal         `json:"width,omitempty"`
	Height       *decimal.Decimal         `json:"height,omitempty"`
	Era          string                   `json:"era"`
	Availability bool                     `json:"availability"`
	Images       []ProductImageResponse   `json:"images"`
	Variants     []ProductVariantResponse `json:"variants"`
}
