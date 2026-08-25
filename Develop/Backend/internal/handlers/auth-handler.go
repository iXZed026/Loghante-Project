package handlers

import (
	"context"
	"log/slog"
	"net/http"

	"loghanteh-project/internal/dto"
	"loghanteh-project/internal/response"
	"loghanteh-project/internal/services"
	"loghanteh-project/internal/validator"

	"github.com/gin-gonic/gin"
)

type AuthHandler struct {
	authService *services.AuthService
	logger      *slog.Logger
}

func NewAuthHandler(
	authService *services.AuthService,
	logger *slog.Logger,
) *AuthHandler {
	return &AuthHandler{
		authService: authService,
		logger:      logger,
	}
}

func (h *AuthHandler) Register(c *gin.Context) {
	var req dto.RegisterRequest

	lang := c.GetHeader("Accept-Language")

	if lang == "" {
		lang = "en"
	}

	// Bind and validate request body.
	if err := c.ShouldBindJSON(&req); err != nil {
		h.logger.Error(
			"failed to get register request",
			"error", err,
		)

		message := validator.TranslateErrors(err, lang)

		c.JSON(
			http.StatusBadRequest,
			gin.H{
				"message": message,
			},
		)

		// response.HandleError(
		// 	c,
		// 	err,
		// 	h.logger,
		// )
		return
	}

	err := h.authService.Register(
		context.Background(),
		req.FullName,
		req.PhoneNumber,
		req.Email,
		req.Password,
		req.RepeatPassword,
	)

	if err != nil {
		h.logger.Error(
			"failed to reguster user",
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
		"user registered successfully",
		nil,
	)
}

func (h *AuthHandler) FindAll(c *gin.Context) {

	ctx := c.Request.Context()
	users, err :=
		h.authService.FindAll(ctx)

	if err != nil {
		h.logger.Error(
			"failed to get all users",
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
		"get all users successfuly",
		users,
	)
}
