package models

import (
	"time"

	"github.com/shopspring/decimal"
)

type Product struct {
	ProductID       uint             `gorm:"column:productid;primaryKey"`
	CategoryID      uint             `gorm:"column:categoryid;not null"`
	MuseumID        uint             `gorm:"column:museumid;not null"`
	Origin          string           `gorm:"column:origin;size:255"`
	Material        string           `gorm:"column:material;size:255"`
	Weight          *decimal.Decimal `gorm:"column:weight;type:numeric(10,2)"`
	Length          *decimal.Decimal `gorm:"column:length;type:numeric(10,2)"`
	Width           *decimal.Decimal `gorm:"column:width;type:numeric(10,2)"`
	Height          *decimal.Decimal `gorm:"column:height;type:numeric(10,2)"`
	Era             string           `gorm:"column:era;size:255"`
	DiscountPercent decimal.Decimal  `gorm:"column:discountpercent;type:numeric(5,2)"`
	CreatedAt       time.Time        `gorm:"column:createdat"`
	IsActive        bool             `gorm:"column:isactive"`
}

func (Product) TableName() string { return "products" }

type ProductCategory struct {
	CategoryID uint   `gorm:"column:categoryid;primaryKey"`
	Code       string `gorm:"column:code;size:50;not null"`
	IsActive   bool   `gorm:"column:isactive"`
}

func (ProductCategory) TableName() string { return "productcategories" }

type ProductCategoryTranslation struct {
	CategoryID  uint   `gorm:"column:categoryid;primaryKey"`
	LanguageID  uint   `gorm:"column:languageid;primaryKey"`
	Name        string `gorm:"column:name;size:100;not null"`
	Description string `gorm:"column:description;type:text"`
}

func (ProductCategoryTranslation) TableName() string {
	return "productcategorytranslations"
}

type ProductVariant struct {
	ProductVariantID uint            `gorm:"column:productvariantid;primaryKey"`
	ProductID        uint            `gorm:"column:productid;not null"`
	Color            string          `gorm:"column:color;size:100"`
	SKU              string          `gorm:"column:sku;size:100"`
	Price            decimal.Decimal `gorm:"column:price;type:numeric(12,2);not null"`
	StockQuantity    int             `gorm:"column:stockquantity;not null"`
	IsActive         bool            `gorm:"column:isactive"`
}

func (ProductVariant) TableName() string { return "productvariants" }

type ProductTranslation struct {
	ProductID   uint   `gorm:"column:productid;primaryKey"`
	LanguageID  uint   `gorm:"column:languageid;primaryKey"`
	Name        string `gorm:"column:name;size:255;not null"`
	Description string `gorm:"column:description;type:text"`
}

func (ProductTranslation) TableName() string { return "producttranslations" }

type ProductImage struct {
	ProductImageID   uint   `gorm:"column:productimageid;primaryKey"`
	ProductID        uint   `gorm:"column:productid;not null"`
	ProductVariantID *uint  `gorm:"column:productvariantid"`
	ImageURL         string `gorm:"column:imageurl;size:1000;not null"`
	DisplayOrder     int    `gorm:"column:displayorder;not null"`
	IsPrimary        bool   `gorm:"column:isprimary;not null"`
}

func (ProductImage) TableName() string { return "productimages" }
