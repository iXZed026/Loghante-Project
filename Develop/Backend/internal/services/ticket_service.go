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

func (s *TicketService) GetMuseumTourSessions(
	ctx context.Context,
	date time.Time,
	languageCode string,
) ([]dto.MuseumTourSessionResponse, error) {

	languageID, err :=
		s.languageRepository.GetIDByCode(
			ctx,
			languageCode,
		)

	if err != nil {
		return nil, err
	}

	eventTypeID, err :=
		s.ticketRepository.GetEventTypeIDByName(
			ctx,
			"museum-tour",
		)

	if err != nil {
		return nil, err
	}

	sessions, err :=
		s.ticketRepository.GetMuseumTourSessions(
			ctx,
			date,
			eventTypeID,
			languageID,
		)

	if err != nil {
		return nil, err
	}

	return sessions, nil
}

func (s *TicketService) CreateBooking(
	ctx context.Context,
	userID uint,
	req dto.CreateBookingRequest,
) (*dto.CreateBookingResponse, error) {

	var booking models.Booking

	err := s.db.Transaction(func(tx *gorm.DB) error {

		session, err :=
			s.bookingRepository.GetSessionForBooking(
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

		if req.Quantity > session.Capacity {
			return appErrors.ErrInsufficientCapacity
		}

		var totalPrice decimal.Decimal

		if session.Price != nil {
			totalPrice =
				session.Price.Mul(
					decimal.NewFromInt(
						int64(req.Quantity),
					),
				)
		}

		booking = models.Booking{
			UserID:     userID,
			SessionID:  req.SessionID,
			Quantity:   req.Quantity,
			TotalPrice: totalPrice,
		}

		if err :=
			s.bookingRepository.Create(
				tx,
				ctx,
				&booking,
			); err != nil {
			return err
		}

		if err :=
			s.bookingRepository.DecreaseSessionCapacity(
				tx,
				ctx,
				req.SessionID,
				req.Quantity,
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
		TotalPrice:  booking.TotalPrice,
		PurchasedAt: booking.PurchasedAt,
	}, nil
}

// events-and-courses

func (s *TicketService) GetEventAndCourseSessions(
	ctx context.Context,
	date time.Time,
	languageCode string,
) ([]dto.EventAndCourseSessionResponse, error) {

	languageID, err :=
		s.languageRepository.GetIDByCode(
			ctx,
			languageCode,
		)

	if err != nil {
		return nil, err
	}

	eventTypeID, err :=
		s.ticketRepository.GetEventTypeIDByName(
			ctx,
			"events-and-courses",
		)

	if err != nil {
		return nil, err
	}

	sessions, err :=
		s.ticketRepository.GetEventAndCourseSessions(
			ctx,
			date,
			eventTypeID,
			languageID,
		)

	if err != nil {
		return nil, err
	}

	return sessions, nil
}

func (s *TicketService) GetUserBookings(
	ctx context.Context,
	userID uint,
	languageCode string,
) ([]dto.UserBookingResponse, error) {

	languageID, err :=
		s.languageRepository.GetIDByCode(
			ctx,
			languageCode,
		)

	if err != nil {
		return nil, err
	}

	bookings, err :=
		s.bookingRepository.GetUserBookings(
			ctx,
			userID,
			languageID,
		)

	if err != nil {
		return nil, err
	}

	return bookings, nil
}
