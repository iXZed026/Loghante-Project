package services

import (
	"context"
	"time"

	"loghanteh-project/internal/dto"
	appErrors "loghanteh-project/internal/errors"
	"loghanteh-project/internal/models"
	"loghanteh-project/internal/repositories"

	"github.com/shopspring/decimal"
	"gorm.io/gorm"
)

const (
	CinemaEventTypeID  uint = 4
	TheaterEventTypeID uint = 5
)

type TicketService struct {
	db                 *gorm.DB
	ticketRepository   *repositories.TicketRepository
	languageRepository *repositories.LanguageRepository
	bookingRepository  *repositories.BookingRepository
}

func NewTicketService(
	db *gorm.DB,
	ticketRepository *repositories.TicketRepository,
	languageRepository *repositories.LanguageRepository,
	bookingRepository *repositories.BookingRepository,
) *TicketService {
	return &TicketService{
		db:                 db,
		ticketRepository:   ticketRepository,
		languageRepository: languageRepository,
		bookingRepository:  bookingRepository,
	}
}

// --------------------------------------------------
// Museum
// --------------------------------------------------

func (s *TicketService) GetMuseumTourSessions(
	ctx context.Context,
	date time.Time,
	languageCode string,
) ([]dto.MuseumTourSessionResponse, error) {

	languageID, err := s.languageRepository.GetIDByCode(
		ctx,
		languageCode,
	)
	if err != nil {
		return nil, err
	}

	eventTypeID, err := s.ticketRepository.GetEventTypeIDByName(
		ctx,
		"museum-tour",
	)
	if err != nil {
		return nil, err
	}

	return s.ticketRepository.GetMuseumTourSessions(
		ctx,
		date,
		eventTypeID,
		languageID,
	)
}

// --------------------------------------------------
// Events
// --------------------------------------------------

func (s *TicketService) GetEventSessions(
	ctx context.Context,
	date time.Time,
	languageCode string,
) ([]dto.EventSessionListResponse, error) {

	return s.getSessionsByType(
		ctx,
		date,
		languageCode,
		"events",
		s.ticketRepository.GetEventSessions,
	)
}

// --------------------------------------------------
// Courses
// --------------------------------------------------

func (s *TicketService) GetCourseSessions(
	ctx context.Context,
	date time.Time,
	languageCode string,
) ([]dto.EventSessionListResponse, error) {

	return s.getSessionsByType(
		ctx,
		date,
		languageCode,
		"courses",
		s.ticketRepository.GetCourseSessions,
	)
}

// --------------------------------------------------
// Cinema
// --------------------------------------------------

func (s *TicketService) GetCinemaSessions(
	ctx context.Context,
	date time.Time,
	languageCode string,
) ([]dto.CinemaSessionListResponse, error) {

	languageID, err := s.languageRepository.GetIDByCode(
		ctx,
		languageCode,
	)
	if err != nil {
		return nil, err
	}

	return s.ticketRepository.GetCinemaSessions(
		ctx,
		date,
		CinemaEventTypeID,
		languageID,
	)
}

// --------------------------------------------------
// Theater
// --------------------------------------------------

func (s *TicketService) GetTheaterSessions(
	ctx context.Context,
	date time.Time,
	languageCode string,
) ([]dto.TheaterSessionListResponse, error) {

	languageID, err := s.languageRepository.GetIDByCode(
		ctx,
		languageCode,
	)
	if err != nil {
		return nil, err
	}

	return s.ticketRepository.GetTheaterSessions(
		ctx,
		date,
		TheaterEventTypeID,
		languageID,
	)
}

// --------------------------------------------------
// Generic session list helper
// --------------------------------------------------

type sessionListFunc func(
	context.Context,
	time.Time,
	uint,
	uint,
) ([]dto.EventSessionListResponse, error)

func (s *TicketService) getSessionsByType(
	ctx context.Context,
	date time.Time,
	languageCode string,
	eventTypeName string,
	getSessions sessionListFunc,
) ([]dto.EventSessionListResponse, error) {

	languageID, err := s.languageRepository.GetIDByCode(
		ctx,
		languageCode,
	)
	if err != nil {
		return nil, err
	}

	eventTypeID, err := s.ticketRepository.GetEventTypeIDByName(
		ctx,
		eventTypeName,
	)
	if err != nil {
		return nil, err
	}

	return getSessions(
		ctx,
		date,
		eventTypeID,
		languageID,
	)
}

// --------------------------------------------------
// Event detail
// --------------------------------------------------

func (s *TicketService) GetEventSessionDetail(
	ctx context.Context,
	sessionID uint,
	languageCode string,
) (*dto.EventSessionDetailResponse, error) {

	return s.getEventDetail(
		ctx,
		sessionID,
		languageCode,
		"events",
		s.ticketRepository.GetEventSessionDetail,
	)
}

// --------------------------------------------------
// Course detail
// --------------------------------------------------

func (s *TicketService) GetCourseSessionDetail(
	ctx context.Context,
	sessionID uint,
	languageCode string,
) (*dto.EventSessionDetailResponse, error) {

	return s.getEventDetail(
		ctx,
		sessionID,
		languageCode,
		"courses",
		s.ticketRepository.GetCourseSessionDetail,
	)
}

// --------------------------------------------------
// Generic event detail helper
// --------------------------------------------------

type sessionDetailFunc func(
	context.Context,
	uint,
	uint,
	uint,
) (*dto.EventSessionDetailResponse, error)

func (s *TicketService) getEventDetail(
	ctx context.Context,
	sessionID uint,
	languageCode string,
	eventTypeName string,
	getDetail sessionDetailFunc,
) (*dto.EventSessionDetailResponse, error) {

	languageID, err := s.languageRepository.GetIDByCode(
		ctx,
		languageCode,
	)
	if err != nil {
		return nil, err
	}

	eventTypeID, err := s.ticketRepository.GetEventTypeIDByName(
		ctx,
		eventTypeName,
	)
	if err != nil {
		return nil, err
	}

	return getDetail(
		ctx,
		sessionID,
		eventTypeID,
		languageID,
	)
}

// --------------------------------------------------
// Booking
// --------------------------------------------------

func (s *TicketService) CreateBooking(
	ctx context.Context,
	userID uint,
	req dto.CreateBookingRequest,
) (*dto.CreateBookingResponse, error) {

	if len(req.SeatIDs) == 0 {
		return nil, appErrors.ErrInvalidInput
	}

	seatSet := make(map[uint]struct{}, len(req.SeatIDs))

	for _, seatID := range req.SeatIDs {

		if seatID == 0 {
			return nil, appErrors.ErrInvalidInput
		}

		if _, exists := seatSet[seatID]; exists {
			return nil, appErrors.ErrInvalidInput
		}

		seatSet[seatID] = struct{}{}
	}

	quantity := len(req.SeatIDs)

	var booking models.Booking

	err := s.db.Transaction(func(tx *gorm.DB) error {

		session, err := s.bookingRepository.GetSessionForBooking(
			tx,
			ctx,
			req.SessionID,
		)

		if err != nil {

			if err == gorm.ErrRecordNotFound {
				return appErrors.ErrNotFound
			}

			return err
		}

		if quantity > session.Capacity {
			return appErrors.ErrInsufficientCapacity
		}

		valid, err := s.bookingRepository.ValidateSeatsForSession(
			tx,
			ctx,
			req.SessionID,
			req.SeatIDs,
		)

		if err != nil {
			return err
		}

		if !valid {
			return appErrors.ErrInvalidInput
		}

		var totalPrice decimal.Decimal

		if session.Price != nil {
			totalPrice = session.Price.Mul(
				decimal.NewFromInt(
					int64(quantity),
				),
			)
		}

		booking = models.Booking{
			UserID:     userID,
			SessionID:  req.SessionID,
			Quantity:   quantity,
			TotalPrice: totalPrice,
		}

		if err := s.bookingRepository.Create(
			tx,
			ctx,
			&booking,
		); err != nil {
			return err
		}

		if err := s.bookingRepository.CreateBookingSeats(
			tx,
			ctx,
			booking.BookingID,
			req.SessionID,
			req.SeatIDs,
		); err != nil {
			return err
		}

		if err := s.bookingRepository.DecreaseSessionCapacity(
			tx,
			ctx,
			req.SessionID,
			quantity,
		); err != nil {
			return err
		}

		return nil
	})

	if err != nil {
		return nil, err
	}

	return &dto.CreateBookingResponse{
		BookingID:   booking.BookingID,
		SessionID:   booking.SessionID,
		Quantity:    booking.Quantity,
		SeatIDs:     req.SeatIDs,
		TotalPrice:  booking.TotalPrice,
		PurchasedAt: booking.PurchasedAt,
	}, nil
}

// --------------------------------------------------
// User bookings
// --------------------------------------------------

func (s *TicketService) GetUserBookings(
	ctx context.Context,
	userID uint,
	languageCode string,
) ([]dto.UserBookingResponse, error) {

	languageID, err := s.languageRepository.GetIDByCode(
		ctx,
		languageCode,
	)
	if err != nil {
		return nil, err
	}

	return s.bookingRepository.GetUserBookings(
		ctx,
		userID,
		languageID,
	)
}
