package repositories

import (
	"context"

	"loghanteh-project/internal/models"

	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type BookingRepository struct {
	db *gorm.DB
}

func NewBookingRepository(
	db *gorm.DB,
) *BookingRepository {
	return &BookingRepository{
		db: db,
	}
}

func (r *BookingRepository) GetSessionForBooking(
	tx *gorm.DB,
	ctx context.Context,
	sessionID uint,
) (*models.EventSession, error) {

	var session models.EventSession

	err := tx.
		WithContext(ctx).
		Clauses(clause.Locking{
			Strength: "UPDATE",
		}).
		Where("sessionid = ?", sessionID).
		First(&session).
		Error

	if err != nil {
		return nil, err
	}

	return &session, nil
}

func (r *BookingRepository) GetBookedQuantity(
	tx *gorm.DB,
	ctx context.Context,
	sessionID uint,
) (int, error) {

	var quantity int

	err := tx.
		WithContext(ctx).
		Model(&models.Booking{}).
		Where("sessionid = ?", sessionID).
		Select("COALESCE(SUM(quantity), 0)").
		Scan(&quantity).
		Error

	if err != nil {
		return 0, err
	}

	return quantity, nil
}

func (r *BookingRepository) Create(
	tx *gorm.DB,
	ctx context.Context,
	booking *models.Booking,
) error {

	return tx.
		WithContext(ctx).
		Create(booking).
		Error
}

func (r *BookingRepository) DecreaseSessionCapacity(
	tx *gorm.DB,
	ctx context.Context,
	sessionID uint,
	quantity int,
) error {

	return tx.
		WithContext(ctx).
		Model(&models.EventSession{}).
		Where("sessionid = ?", sessionID).
		UpdateColumn(
			"capacity",
			gorm.Expr("capacity - ?", quantity),
		).
		Error
}
