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

// events-and-courses

type EventAndCourseSessionResponse struct {
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

type EventAndCourseQuery struct {
	Date string `form:"date" binding:"required"`
}
