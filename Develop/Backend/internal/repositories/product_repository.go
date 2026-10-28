package repositories

import (
	"context"
	"strings"

	"loghanteh-project/internal/dto"

	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type ProductRepository struct {
	db *gorm.DB
}

func NewProductRepository(db *gorm.DB) *ProductRepository {
	return &ProductRepository{db: db}
}

const productCardSelect = `
	p.productid AS "productId",
	COALESCE(pt.name, '') AS name,
	COALESCE(mt.name, '') AS "museumName",
	COALESCE((
		SELECT MIN(pv.price)
		FROM productvariants AS pv
		WHERE pv.productid = p.productid AND pv.isactive = TRUE
	), 0) AS price,
	p.discountpercent AS "discountPercent",
	COALESCE((
		SELECT pi.imageurl
		FROM productimages AS pi
		WHERE pi.productid = p.productid
		ORDER BY pi.isprimary DESC, pi.displayorder ASC, pi.productimageid ASC
		LIMIT 1
	), '') AS "imageUrl"
`

func (r *ProductRepository) productCards(ctx context.Context, languageID uint) *gorm.DB {
	return r.db.WithContext(ctx).
		Table("products AS p").
		Select(productCardSelect).
		Joins("LEFT JOIN producttranslations AS pt ON pt.productid = p.productid AND pt.languageid = ?", languageID).
		Joins("LEFT JOIN museumtranslations AS mt ON mt.museumid = p.museumid AND mt.languagesid = ?", languageID).
		Joins("INNER JOIN museums AS m ON m.museumid = p.museumid").
		Where("p.isactive = TRUE")
}

func (r *ProductRepository) GetDiscounted(
	ctx context.Context,
	languageID uint,
) ([]dto.ProductCard, error) {
	var products []dto.ProductCard
	err := r.productCards(ctx, languageID).
		Where("p.discountpercent > 0").
		Order("p.discountpercent DESC, p.createdat DESC, p.productid DESC").
		Limit(8).
		Scan(&products).Error
	return products, err
}

func (r *ProductRepository) GetNewest(
	ctx context.Context,
	languageID uint,
) ([]dto.ProductCard, error) {
	var products []dto.ProductCard
	err := r.productCards(ctx, languageID).
		Order("p.createdat DESC, p.productid DESC").
		Limit(8).
		Scan(&products).Error
	return products, err
}

func (r *ProductRepository) GetOnePerMuseum(
	ctx context.Context,
	languageID uint,
) ([]dto.ProductCard, error) {
	inner := r.productCards(ctx, languageID).
		Select(productCardSelect + `,
			p.createdat AS "createdAt",
			ROW_NUMBER() OVER (PARTITION BY p.museumid ORDER BY p.createdat DESC, p.productid DESC) AS row_num`).
		Where(`EXISTS (
			SELECT 1 FROM productvariants AS active_variant
			WHERE active_variant.productid = p.productid AND active_variant.isactive = TRUE
		)`)
	var products []dto.ProductCard
	err := r.db.WithContext(ctx).
		Table("(?) AS ranked", inner).
		Where("row_num = 1").
		Order("\"createdAt\" DESC").
		Limit(6).
		Scan(&products).Error
	return products, err
}

func (r *ProductRepository) List(
	ctx context.Context,
	languageID uint,
	museumIDs []uint,
	categoryIDs []uint,
	minPrice *string,
	maxPrice *string,
	sortBy string,
	page int,
	pageSize int,
) (*dto.ProductListResponse, error) {
	query := r.productCards(ctx, languageID)
	if len(museumIDs) > 0 {
		query = query.Where("p.museumid IN ?", museumIDs)
	}
	if len(categoryIDs) > 0 {
		query = query.Where("p.categoryid IN ?", categoryIDs)
	}
	if minPrice != nil || maxPrice != nil {
		conditions := []string{"pv.productid = p.productid", "pv.isactive = TRUE"}
		arguments := make([]any, 0, 2)
		if minPrice != nil {
			conditions = append(conditions, "pv.price >= ?")
			arguments = append(arguments, *minPrice)
		}
		if maxPrice != nil {
			conditions = append(conditions, "pv.price <= ?")
			arguments = append(arguments, *maxPrice)
		}
		query = query.Where("EXISTS (SELECT 1 FROM productvariants AS pv WHERE "+strings.Join(conditions, " AND ")+")", arguments...)
	}

	var total int64
	if err := query.Session(&gorm.Session{}).Count(&total).Error; err != nil {
		return nil, err
	}

	orders := map[string]string{
		"newest":        "p.createdat DESC, p.productid DESC",
		"oldest":        "p.createdat ASC, p.productid ASC",
		"price_asc":     "price ASC, p.productid ASC",
		"price_desc":    "price DESC, p.productid DESC",
		"popular":       "p.createdat DESC, p.productid DESC",
		"discount_desc": "p.discountpercent DESC, p.createdat DESC, p.productid DESC",
	}
	order := orders[sortBy]
	if order == "" {
		order = orders["newest"]
	}

	var products []dto.ProductCard
	err := query.
		Order(order).
		Offset((page - 1) * pageSize).
		Limit(pageSize).
		Scan(&products).Error
	if err != nil {
		return nil, err
	}
	if products == nil {
		products = []dto.ProductCard{}
	}

	return &dto.ProductListResponse{
		Items: products, Page: page, PageSize: pageSize, Total: total,
		TotalPages: (total + int64(pageSize) - 1) / int64(pageSize),
	}, nil
}

func (r *ProductRepository) GetDetail(
	ctx context.Context,
	languageID uint,
	productID uint,
) (*dto.ProductDetailResponse, error) {
	var detail dto.ProductDetailResponse
	err := r.productCards(ctx, languageID).
		Select(productCardSelect+`,
			p.categoryid AS "categoryId",
			p.museumid AS "museumId",
			COALESCE(pt.description, '') AS description,
			p.origin,
			p.material,
			p.weight,
			p.length,
			p.width,
			p.height,
			p.era`).
		Where("p.productid = ?", productID).
		Take(&detail).Error
	if err != nil {
		return nil, err
	}

	if err := r.db.WithContext(ctx).
		Table("productimages").
		Select(`productimageid AS "productImageId", productvariantid AS "productVariantId",
			imageurl AS "imageUrl", displayorder AS "displayOrder", isprimary AS "isPrimary"`).
		Where("productid = ?", productID).
		Order("isprimary DESC, displayorder ASC, productimageid ASC").
		Find(&detail.Images).Error; err != nil {
		return nil, err
	}

	if err := r.db.WithContext(ctx).
		Table("productvariants").
		Select(`productvariantid AS "productVariantId", color, sku, price,
			stockquantity AS "stockQuantity", isactive AS "isActive"`).
		Where("productid = ?", productID).
		Order("color ASC, productvariantid ASC").
		Scan(&detail.Variants).Error; err != nil {
		return nil, err
	}
	for _, variant := range detail.Variants {
		if variant.IsActive && variant.StockQuantity > 0 {
			detail.Availability = true
			break
		}
	}

	detail.Related, err = r.GetRelated(ctx, languageID, productID, detail.CategoryID, detail.MuseumID)
	if err != nil {
		return nil, err
	}
	return &detail, nil
}

func (r *ProductRepository) GetRelated(
	ctx context.Context,
	languageID uint,
	productID uint,
	categoryID uint,
	museumID uint,
) ([]dto.ProductCard, error) {
	var products []dto.ProductCard
	err := r.productCards(ctx, languageID).
		Where("p.productid <> ? AND (p.categoryid = ? OR p.museumid = ?)", productID, categoryID, museumID).
		Order(clause.Expr{
			SQL:  "CASE WHEN p.categoryid = ? THEN 0 ELSE 1 END, p.createdat DESC, p.productid DESC",
			Vars: []any{categoryID},
		}).
		Limit(8).
		Scan(&products).Error
	return products, err
}

func (r *ProductRepository) GetRelatedByProduct(
	ctx context.Context,
	languageID uint,
	productID uint,
) ([]dto.ProductCard, error) {
	var product struct {
		CategoryID uint `gorm:"column:categoryid"`
		MuseumID   uint `gorm:"column:museumid"`
	}
	err := r.db.WithContext(ctx).
		Table("products").
		Select("categoryid, museumid").
		Where("productid = ? AND isactive = TRUE", productID).
		Take(&product).Error
	if err != nil {
		return nil, err
	}
	return r.GetRelated(ctx, languageID, productID, product.CategoryID, product.MuseumID)
}
