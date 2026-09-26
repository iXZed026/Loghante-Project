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

// --------------------------------------------------
// Language
// --------------------------------------------------

func getLanguage(c *gin.Context) string {
	language := c.GetHeader("Accept-Language")

	if len(language) >= 2 {
		language = language[:2]
	}

	if language == "" {
		language = "en"
	}

	return language
}

// --------------------------------------------------
// Cinema
// --------------------------------------------------

func (h *TicketHandler) GetCinema(c *gin.Context) {
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
		response.HandleError(
			c,
			appErrors.ErrInvalidInput,
			h.logger,
		)
		return
	}

	sessions, err := h.ticketService.GetCinemaSessions(
		c.Request.Context(),
		date,
		getLanguage(c),
	)

	if err != nil {
		h.logger.Error(
			"failed to get cinema sessions",
			"date", dateString,
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
		"cinema sessions fetched successfully",
		sessions,
	)
}

func (h *TicketHandler) GetCinemaSessionDetail(c *gin.Context) {
	sessionID, err := strconv.ParseUint(
		c.Param("sessionId"),
		10,
		32,
	)

	if err != nil {
		response.HandleError(
			c,
			appErrors.ErrInvalidInput,
			h.logger,
		)
		return
	}

	session, err := h.ticketService.GetCinemaSessionDetail(
		c.Request.Context(),
		uint(sessionID),
		getLanguage(c),
	)

	if err != nil {
		h.logger.Error(
			"failed to get cinema session detail",
			"sessionId", sessionID,
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
		"cinema session fetched successfully",
		session,
	)
}

// --------------------------------------------------
// Theater
// --------------------------------------------------

func (h *TicketHandler) GetTheater(c *gin.Context) {
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
		response.HandleError(
			c,
			appErrors.ErrInvalidInput,
			h.logger,
		)
		return
	}

	sessions, err := h.ticketService.GetTheaterSessions(
		c.Request.Context(),
		date,
		getLanguage(c),
	)

	if err != nil {
		h.logger.Error(
			"failed to get theater sessions",
			"date", dateString,
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
		"theater sessions fetched successfully",
		sessions,
	)
}

func (h *TicketHandler) GetTheaterSessionDetail(c *gin.Context) {
	sessionID, err := strconv.ParseUint(
		c.Param("sessionId"),
		10,
		32,
	)

	if err != nil {
		response.HandleError(
			c,
			appErrors.ErrInvalidInput,
			h.logger,
		)
		return
	}

	session, err := h.ticketService.GetTheaterSessionDetail(
		c.Request.Context(),
		uint(sessionID),
		getLanguage(c),
	)

	if err != nil {
		h.logger.Error(
			"failed to get theater session detail",
			"sessionId", sessionID,
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
		"theater session fetched successfully",
		session,
	)
}