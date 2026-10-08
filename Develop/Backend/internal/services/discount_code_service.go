package services

import (
	"context"

	"loghanteh-project/internal/dto"
	"loghanteh-project/internal/repositories"
)

type DiscountCodeService struct {
	discountCodeRepository *repositories.DiscountCodeRepository
}

func NewDiscountCodeService(
	discountCodeRepository *repositories.DiscountCodeRepository,
) *DiscountCodeService {
	return &DiscountCodeService{
		discountCodeRepository: discountCodeRepository,
	}
}

// --------------------------------------------------
// Get Discount Code
// --------------------------------------------------

func (s *DiscountCodeService) GetByCode(
	ctx context.Context,
	code string,
) (*dto.DiscountCodeResponse, error) {
	return s.discountCodeRepository.GetByCode(ctx, code)
}
