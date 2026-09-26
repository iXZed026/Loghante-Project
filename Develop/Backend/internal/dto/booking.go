package dto

import (
	"time"

	"github.com/shopspring/decimal"
)


// Booking

type CreateBookingRequest struct {
	SessionID uint   `json:"sessionId" binding:"required"`
	SeatIDs   []uint `json:"seatIds" binding:"required,min=1"`
}

type CreateBookingResponse struct {
	BookingID   uint        `json:"bookingId"`
	SessionID   uint        `json:"sessionId"`
	Quantity    int         `json:"quantity"`
	SeatIDs     []uint      `json:"seatIds"`
	TotalPrice  interface{} `json:"totalPrice"`
	PurchasedAt time.Time   `json:"purchasedAt"`
}

type UserBookingResponse struct {
	BookingID     uint            `json:"bookingId"`
	EventTypeID   uint            `json:"eventTypeId"`
	EventTypeName string          `json:"eventTypeName"`
	EventID       uint            `json:"eventId"`
	SessionID     uint            `json:"sessionId"`
	Name          string          `json:"name"`
	Description   string          `json:"description"`
	StartAt       time.Time       `json:"startAt"`
	Duration      int             `json:"duration"`
	Quantity      int             `json:"quantity"`
	TotalPrice    decimal.Decimal `json:"totalPrice"`
	PurchasedAt   time.Time       `json:"purchasedAt"`
}

