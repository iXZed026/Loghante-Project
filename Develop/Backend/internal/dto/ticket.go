package dto

import "time"

// Museum Tour

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

// Events / Courses / Cinema / Theater

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

type CinemaQuery struct {
	Date string `form:"date" binding:"required"`
}

type TheaterQuery struct {
	Date string `form:"date" binding:"required"`
}

// Event detail

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

// Cinema

type CinemaDetailResponse struct {
    EventID      uint     `json:"eventId"`
    ReleaseYear  *int     `json:"releaseYear"`
    Director     string   `json:"director"`
    Country      string   `json:"country"`
    FilmDuration int      `json:"filmDuration"`
    Genre        string   `json:"genre"`
    IMBDScore    *float64 `json:"imbdScore"`
}

type CinemaSessionDetailResponse struct {
	SessionID      uint                  `json:"sessionId"`
	EventID        uint                  `json:"eventId"`
	HallID         uint                  `json:"hallId"`
	Name           string                `json:"name"`
	Description    string                `json:"description"`
	Images         []EventImageResponse  `json:"images"`
	StartAt        time.Time             `json:"startAt"`
	Duration       int                   `json:"duration"`
	Price          *float64              `json:"price"`
	CinemaDetails  *CinemaDetailResponse `json:"cinemaDetails"`
}

// Theater

type TheaterDetailResponse struct {
	EventID  uint   `json:"eventId"`
	Director string `json:"director"`
	Writer   string `json:"writer"`
	Duration int    `json:"duration"`
}

type TheaterSessionDetailResponse struct {
	SessionID       uint                   `json:"sessionId"`
	EventID         uint                   `json:"eventId"`
	HallID          uint                   `json:"hallId"`
	Name            string                 `json:"name"`
	Description     string                 `json:"description"`
	Images          []EventImageResponse   `json:"images"`
	StartAt         time.Time              `json:"startAt"`
	Duration        int                    `json:"duration"`
	Price           *float64               `json:"price"`
	TheaterDetails  *TheaterDetailResponse `json:"theaterDetails"`
}

