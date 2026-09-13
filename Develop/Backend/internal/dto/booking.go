package dto

import (
	"time"

	"github.com/shopspring/decimal"
)

type CreateBookingRequest struct {
	SessionID uint `json:"sessionId" binding:"required"`
	Quantity  int  `json:"quantity" binding:"required,min=1"`
}

type CreateBookingResponse struct {
	BookingID   uint            `json:"bookingId"`
	SessionID   uint            `json:"sessionId"`
	Quantity    int             `json:"quantity"`
	TotalPrice  decimal.Decimal `json:"totalPrice"`
	PurchasedAt time.Time       `json:"purchasedAt"`
}
