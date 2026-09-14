package handlers

import (
	"log/slog"
	"strconv"
	"time"

	"loghanteh-project/internal/dto"
	appErrors "loghanteh-project/internal/errors"
	"loghanteh-project/internal/response"
	"loghanteh-project/internal/services"

	"github.com/gin-gonic/gin"
)

type TicketHandler struct {
	ticketService *services.TicketService
	logger        *slog.Logger
}

func NewTicketHandler(
	ticketService *services.TicketService,
	logger *slog.Logger,
) *TicketHandler {
	return &TicketHandler{
		ticketService: ticketService,
		logger:        logger,
	}
}

func (h *TicketHandler) GetMuseumTour(
	c *gin.Context,
) {

	dateString := c.Query("date")

	if dateString == "" {

		response.HandleError(
			c,
			appErrors.ErrInvalidInput,
			h.logger,
		)

		return
	}

	date, err := time.Parse(
		"2006-01-02",
		dateString,
	)

	if err != nil {

		h.logger.Error(
			"failed to parse museum tour date",
			"date", dateString,
			"error", err,
		)

		response.HandleError(
			c,
			appErrors.ErrInvalidInput,
			h.logger,
		)

		return
	}

	language := c.GetHeader(
		"Accept-Language",
	)

	if len(language) >= 2 {
		language = language[:2]
	}

	if language == "" {
		language = "en"
	}

	sessions, err :=
		h.ticketService.GetMuseumTourSessions(
			c.Request.Context(),
			date,
			language,
		)

	if err != nil {

		h.logger.Error(
			"failed to get museum tour sessions",
			"date", dateString,
			"language", language,
			"error", err,
		)

		response.HandleError(
			c,
			err,
			h.logger,
		)

		return
	}

	response.Success(
		c,
		"museum tour sessions fetched successfully",
		sessions,
	)
}

func (h *TicketHandler) CreateBooking(
	c *gin.Context,
) {

	var req dto.CreateBookingRequest

	if err := c.ShouldBindJSON(&req); err != nil {

		response.HandleError(
			c,
			appErrors.ErrInvalidInput,
			h.logger,
		)

		return
	}

	userIDValue, exists := c.Get("user_id")

	if !exists {

		response.HandleError(
			c,
			appErrors.ErrUnauthorized,
			h.logger,
		)

		return
	}

	userIDString, ok := userIDValue.(string)

	if !ok {

		response.HandleError(
			c,
			appErrors.ErrUnauthorized,
			h.logger,
		)

		return
	}

	userID64, err := strconv.ParseUint(
		userIDString,
		10,
		64,
	)

	if err != nil {

		response.HandleError(
			c,
			appErrors.ErrUnauthorized,
			h.logger,
		)

		return
	}

	booking, err :=
		h.ticketService.CreateBooking(
			c.Request.Context(),
			uint(userID64),
			req,
		)

	if err != nil {

		response.HandleError(
			c,
			err,
			h.logger,
		)

		return
	}

	response.Success(
		c,
		"booking_created_successfully",
		booking,
	)
}

// events-and-courses
func (h *TicketHandler) GetEventAndCourses(
	c *gin.Context,
) {

	dateString := c.Query("date")

	if dateString == "" {

		response.HandleError(
			c,
			appErrors.ErrInvalidInput,
			h.logger,
		)

		return
	}

	date, err := time.Parse(
		"2006-01-02",
		dateString,
	)

	if err != nil {

		h.logger.Error(
			"failed to parse events and courses date",
			"date", dateString,
			"error", err,
		)

		response.HandleError(
			c,
			appErrors.ErrInvalidInput,
			h.logger,
		)

		return
	}

	language := c.GetHeader(
		"Accept-Language",
	)

	if len(language) >= 2 {
		language = language[:2]
	}

	if language == "" {
		language = "en"
	}

	sessions, err :=
		h.ticketService.GetEventAndCourseSessions(
			c.Request.Context(),
			date,
			language,
		)

	if err != nil {

		h.logger.Error(
			"failed to get events and courses sessions",
			"date", dateString,
			"language", language,
			"error", err,
		)

		response.HandleError(
			c,
			err,
			h.logger,
		)

		return
	}

	response.Success(
		c,
		"events_and_courses_sessions_fetched_successfully",
		sessions,
	)
}
