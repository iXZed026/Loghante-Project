package dto

import "time"

// museums-tour

type MuseumTourSessionResponse struct {
	SessionID   uint      `json:"sessionId"`
	EventID     uint      `json:"eventId"`
	HallID      uint      `json:"hallId"`
	Name        string    `json:"name"`
	Description string    `json:"description"`
	StartAt     time.Time `json:"startAt"`
	Duration    int       `json:"duration"`
	Capacity    int       `json:"capacity"`
	Price       *float64  `json:"price"`
}

type MuseumTourQuery struct {
	Date string `form:"date" binding:"required"`
}

// events

type EventImageResponse struct {
	ImageURL     string `json:"imageUrl"`
	DisplayOrder int    `json:"displayOrder"`
}

type EventSeatResponse struct {
	SeatID     uint   `json:"seatId"`
	RowLabel   string `json:"rowLabel"`
	SeatNumber int    `json:"seatNumber"`
	IsBooked   bool   `json:"isBooked"`
}

type EventHallResponse struct {
	HallID      uint   `json:"hallId"`
	Name        string `json:"name"`
	Description string `json:"description"`
}

type EventSessionResponse struct {
	SessionID uint `json:"sessionId"`
	EventID   uint `json:"eventId"`

	Hall EventHallResponse `json:"hall"`

	StartAt  time.Time `json:"startAt"`
	Duration int       `json:"duration"`
	Capacity int       `json:"capacity"`
	Price    *float64  `json:"price"`

	Seats []EventSeatResponse `json:"seats"`
}

type EventResponse struct {
	EventID uint `json:"eventId"`

	Name        string `json:"name"`
	Description string `json:"description"`

	Images   []EventImageResponse   `json:"images"`
	Sessions []EventSessionResponse `json:"sessions"`
}

type EventQuery struct {
	Date string `form:"date" binding:"required"`
}
