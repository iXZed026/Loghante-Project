package repositories

import (
	"context"

	"loghanteh-project/internal/dto"
	"loghanteh-project/internal/models"

	"gorm.io/gorm"
)

type DiscountCodeRepository struct {
	db *gorm.DB
}

func NewDiscountCodeRepository(db *gorm.DB) *DiscountCodeRepository {
	return &DiscountCodeRepository{
		db: db,
	}
}

// --------------------------------------------------
// Get Discount Code By Code
// --------------------------------------------------

func (r *DiscountCodeRepository) GetByCode(
	ctx context.Context,
	code string,
) (*dto.DiscountCodeResponse, error) {

	var discountCode models.DiscountCode

	err := r.db.
		WithContext(ctx).
		Where("code = ?", code).
		First(&discountCode).
		Error

	if err != nil {
		return nil, err
	}

	return &dto.DiscountCodeResponse{
		DiscountCodeID:    discountCode.DiscountCodeID,
		Code:              discountCode.Code,
		DiscountPercent:   discountCode.DiscountPercent,
		MaxDiscountAmount: discountCode.MaxDiscountAmount,
		UsageLimit:        discountCode.UsageLimit,
		UsedCount:         discountCode.UsedCount,
		StartAt:           discountCode.StartAt,
		ExpiresAt:         discountCode.ExpiresAt,
		IsActive:          discountCode.IsActive,
		CreatedAt:         discountCode.CreatedAt,
	}, nil
}
