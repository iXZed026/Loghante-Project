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

// events / courses

type EventSessionListResponse struct {
	SessionID uint `json:"sessionId"`
	EventID   uint `json:"eventId"`

	Name   string               `json:"name"`
	Images []EventImageResponse `json:"images"`

	StartAt time.Time `json:"startAt"`
	Price   *float64  `json:"price"`
}

type EventImageResponse struct {
	ImageURL     string `json:"imageUrl"`
	DisplayOrder int    `json:"displayOrder"`
}

type EventQuery struct {
	Date string `form:"date" binding:"required"`
}

type CourseQuery struct {
	Date string `form:"date" binding:"required"`
}

type EventSessionDetailResponse struct {
	SessionID   uint                 `json:"sessionId"`
	EventID     uint                 `json:"eventId"`
	HallID      uint                 `json:"hallId"`
	Name        string               `json:"name"`
	Description string               `json:"description"`
	Images      []EventImageResponse `json:"images"`
	StartAt     time.Time            `json:"startAt"`
	Duration    int                  `json:"duration"`
	Price       *float64             `json:"price"`
}
