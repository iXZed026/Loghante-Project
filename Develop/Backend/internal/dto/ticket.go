package dto

import "time"

// museums-tour

type MuseumTourSessionResponse struct {
	SessionID            uint      `json:"sessionId"`
	EventID              uint      `json:"eventId"`
	Name                 string    `json:"name"`
	PrimaryDescription   string    `json:"primaryDescription"`
	SecondaryDescription string    `json:"secondaryDescription"`
	StartAt              time.Time `json:"startAt"`
	DurationM            int       `json:"durationM"`
	Capacity             int       `json:"capacity"`
	Price                *float64  `json:"price"`
}

type MuseumTourQuery struct {
	Date string `form:"date" binding:"required"`
}

// events-and-courses

type EventAndCourseSessionResponse struct {
	SessionID            uint      `json:"sessionId"`
	EventID              uint      `json:"eventId"`
	Name                 string    `json:"name"`
	PrimaryDescription   string    `json:"primaryDescription"`
	SecondaryDescription string    `json:"secondaryDescription"`
	StartAt              time.Time `json:"startAt"`
	DurationM            int       `json:"durationM"`
	Capacity             int       `json:"capacity"`
	Price                *float64  `json:"price"`
}

type EventAndCourseQuery struct {
	Date string `form:"date" binding:"required"`
}
