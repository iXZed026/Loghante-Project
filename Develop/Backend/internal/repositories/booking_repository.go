package repositories

import (
	"context"

	"loghanteh-project/internal/dto"
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
		Where(
			"sessionid = ? AND capacity >= ?",
			sessionID,
			quantity,
		).
		UpdateColumn(
			"capacity",
			gorm.Expr("capacity - ?", quantity),
		).
		Error
}

func (r *BookingRepository) GetUserBookings(
	ctx context.Context,
	userID uint,
	languageID uint,
) ([]dto.UserBookingResponse, error) {

	var bookings []dto.UserBookingResponse

	err := r.db.
		WithContext(ctx).
		Table("bookings AS b").
		Select(`
			b.bookingid AS "bookingId",
			et.eventtypeid AS "eventTypeId",
			COALESCE(ett.name, et.eventtypename) AS "eventTypeName",
			e.eventid AS "eventId",
			es.sessionid AS "sessionId",
			COALESCE(ets.name, '') AS "name",
			COALESCE(ets.description, '') AS "description",
			es.startat AS "startAt",
			es.duration AS "duration",
			b.quantity AS "quantity",
			b.totalprice AS "totalPrice",
			b.purchasedat AS "purchasedAt"
		`).
		Joins(`
			INNER JOIN eventsession AS es
				ON es.sessionid = b.sessionid
		`).
		Joins(`
			INNER JOIN events AS e
				ON e.eventid = es.eventid
		`).
		Joins(`
			INNER JOIN eventtypes AS et
				ON et.eventtypeid = e.eventtypeid
		`).
		Joins(`
			LEFT JOIN eventstranslations AS ets
				ON ets.eventid = e.eventid
				AND ets.languagesid = ?
		`, languageID).
		Joins(`
			LEFT JOIN eventtypetranslations AS ett
				ON ett.eventtypeid = et.eventtypeid
				AND ett.languagesid = ?
		`, languageID).
		Where(
			"b.userid = ?",
			userID,
		).
		Order(
			"b.purchasedat DESC",
		).
		Scan(&bookings).
		Error

	if err != nil {
		return nil, err
	}

	return bookings, nil
}
