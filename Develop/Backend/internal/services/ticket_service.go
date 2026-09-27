package services

import (
	"context"
	"time"

	"loghanteh-project/internal/dto"
	"loghanteh-project/internal/repositories"
	"loghanteh-project/internal/reservation"
)

const (
	CinemaEventTypeID  uint = 4
	TheaterEventTypeID uint = 5
)

type TicketService struct {
	ticketRepository     *repositories.TicketRepository
	languageRepository   *repositories.LanguageRepository
	bookingRepository    *repositories.BookingRepository
	reservationService   *reservation.Service
	seatResourceProvider reservation.ResourceProvider
}

func NewTicketService(
	ticketRepository *repositories.TicketRepository,
	languageRepository *repositories.LanguageRepository,
	bookingRepository *repositories.BookingRepository,
	reservationService *reservation.Service,
	seatResourceProvider reservation.ResourceProvider,
) *TicketService {
	return &TicketService{
		ticketRepository:     ticketRepository,
		languageRepository:   languageRepository,
		bookingRepository:    bookingRepository,
		reservationService:   reservationService,
		seatResourceProvider: seatResourceProvider,
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

	booking, err := s.reservationService.CreateBooking(
		ctx,
		userID,
		req.SessionID,
		req.Quantity,
		nil,
		nil,
	)
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

// --------------------------------------------------
// Seat
// --------------------------------------------------

func (s *TicketService) GetSessionSeats(
	ctx context.Context,
	sessionID uint,
) ([]dto.SessionSeatResponse, error) {
	return s.ticketRepository.GetSessionSeats(ctx, sessionID)
}

func (s *TicketService) CreateSeatBooking(
	ctx context.Context,
	userID uint,
	req dto.CreateSeatBookingRequest,
) (*dto.CreateBookingResponse, error) {
	quantity := len(req.SeatIDs)

	booking, err := s.reservationService.CreateBooking(
		ctx,
		userID,
		req.SessionID,
		quantity,
		s.seatResourceProvider,
		req.SeatIDs,
	)
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
