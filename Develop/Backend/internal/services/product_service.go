package services

import (
	"context"
	"errors"
	"strconv"
	"strings"

	"loghanteh-project/internal/dto"
	appErrors "loghanteh-project/internal/errors"
	"loghanteh-project/internal/repositories"

	"github.com/shopspring/decimal"
	"gorm.io/gorm"
)

const productPageSize = 9

type ProductService struct {
	productRepository  *repositories.ProductRepository
	languageRepository *repositories.LanguageRepository
}

func NewProductService(
	productRepository *repositories.ProductRepository,
	languageRepository *repositories.LanguageRepository,
) *ProductService {
	return &ProductService{
		productRepository:  productRepository,
		languageRepository: languageRepository,
	}
}

func (s *ProductService) GetDiscounted(ctx context.Context, language string) ([]dto.ProductCard, error) {
	languageID, err := s.languageID(ctx, language)
	if err != nil {
		return nil, err
	}
	return s.productRepository.GetDiscounted(ctx, languageID)
}

func (s *ProductService) GetNewest(ctx context.Context, language string) ([]dto.ProductCard, error) {
	languageID, err := s.languageID(ctx, language)
	if err != nil {
		return nil, err
	}
	return s.productRepository.GetNewest(ctx, languageID)
}

func (s *ProductService) GetOnePerMuseum(ctx context.Context, language string) ([]dto.ProductCard, error) {
	languageID, err := s.languageID(ctx, language)
	if err != nil {
		return nil, err
	}
	return s.productRepository.GetOnePerMuseum(ctx, languageID)
}

func (s *ProductService) List(
	ctx context.Context,
	language string,
	museums string,
	categories string,
	minPrice string,
	maxPrice string,
	pageValue string,
	sortBy string,
) (*dto.ProductListResponse, error) {
	languageID, err := s.languageID(ctx, language)
	if err != nil {
		return nil, err
	}
	museumIDs, err := parseIDList(museums)
	if err != nil {
		return nil, err
	}
	categoryIDs, err := parseIDList(categories)
	if err != nil {
		return nil, err
	}
	min, err := parsePrice(minPrice)
	if err != nil {
		return nil, err
	}
	max, err := parsePrice(maxPrice)
	if err != nil {
		return nil, err
	}
	if min != nil && max != nil && min.GreaterThan(*max) {
		return nil, appErrors.ErrInvalidInput
	}

	page := 1
	if strings.TrimSpace(pageValue) != "" {
		page, err = strconv.Atoi(pageValue)
		if err != nil || page < 1 || page > 10000 {
			return nil, appErrors.ErrInvalidInput
		}
	}
	if sortBy == "" {
		sortBy = "newest"
	}
	switch sortBy {
	case "newest", "oldest", "price_asc", "price_desc", "popular", "discount_desc":
	default:
		return nil, appErrors.ErrInvalidInput
	}

	var minValue, maxValue *string
	if min != nil {
		value := min.String()
		minValue = &value
	}
	if max != nil {
		value := max.String()
		maxValue = &value
	}
	return s.productRepository.List(
		ctx, languageID, museumIDs, categoryIDs, minValue, maxValue,
		sortBy, page, productPageSize,
	)
}

func (s *ProductService) GetDetail(ctx context.Context, language, productIDValue string) (*dto.ProductDetailResponse, error) {
	productID, err := strconv.ParseUint(productIDValue, 10, 64)
	if err != nil || productID == 0 {
		return nil, appErrors.ErrInvalidInput
	}
	languageID, err := s.languageID(ctx, language)
	if err != nil {
		return nil, err
	}
	detail, err := s.productRepository.GetDetail(ctx, languageID, uint(productID))
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, appErrors.ErrNotFound
	}
	return detail, err
}

func (s *ProductService) GetRelated(ctx context.Context, language, productIDValue string) ([]dto.ProductCard, error) {
	productID, err := strconv.ParseUint(productIDValue, 10, 64)
	if err != nil || productID == 0 {
		return nil, appErrors.ErrInvalidInput
	}
	languageID, err := s.languageID(ctx, language)
	if err != nil {
		return nil, err
	}
	products, err := s.productRepository.GetRelatedByProduct(ctx, languageID, uint(productID))
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, appErrors.ErrNotFound
	}
	return products, err
}

func (s *ProductService) languageID(ctx context.Context, language string) (uint, error) {
	language = strings.TrimSpace(strings.ToLower(language))
	if language == "" {
		language = "en"
	}
	if separator := strings.IndexAny(language, ",;-_"); separator >= 0 {
		language = language[:separator]
	}
	return s.languageRepository.GetIDByCode(ctx, language)
}

func parseIDList(value string) ([]uint, error) {
	if strings.TrimSpace(value) == "" {
		return nil, nil
	}
	parts := strings.Split(value, ",")
	if len(parts) > 100 {
		return nil, appErrors.ErrInvalidInput
	}
	ids := make([]uint, 0, len(parts))
	seen := make(map[uint]struct{}, len(parts))
	for _, part := range parts {
		id, err := strconv.ParseUint(strings.TrimSpace(part), 10, 32)
		if err != nil || id == 0 {
			return nil, appErrors.ErrInvalidInput
		}
		parsed := uint(id)
		if _, ok := seen[parsed]; !ok {
			ids = append(ids, parsed)
			seen[parsed] = struct{}{}
		}
	}
	return ids, nil
}

func parsePrice(value string) (*decimal.Decimal, error) {
	if strings.TrimSpace(value) == "" {
		return nil, nil
	}
	price, err := decimal.NewFromString(strings.TrimSpace(value))
	if err != nil || price.IsNegative() {
		return nil, appErrors.ErrInvalidInput
	}
	return &price, nil
}
