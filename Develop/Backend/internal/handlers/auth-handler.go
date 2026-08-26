package handlers

import (
	"log/slog"

	"loghanteh-project/internal/dto"
	"loghanteh-project/internal/response"
	"loghanteh-project/internal/services"

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

	if err := c.ShouldBindJSON(&req); err != nil {

		h.logger.Error(
			"failed to get register request",
			"error", err,
		)

		response.HandleError(
			c,
			err,
			h.logger,
		)

		return
	}

	err := h.authService.Register(
		c.Request.Context(),
		req.FullName,
		req.PhoneNumber,
		req.Email,
		req.Password,
		req.RepeatPassword,
	)

	if err != nil {

		h.logger.Error(
			"failed to register user",
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

func (h *AuthHandler) Login(c *gin.Context) {

	var req dto.LoginRequest

	if err := c.ShouldBindJSON(&req); err != nil {

		h.logger.Error(
			"failed to get login request",
			"error", err,
		)

		response.HandleError(
			c,
			err,
			h.logger,
		)

		return
	}

	user, err := h.authService.Login(
		c.Request.Context(),
		req.EmailOrPhone,
		req.Password,
	)

	if err != nil {

		h.logger.Error(
			"failed to login user",
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
		"user logged in successfully",
		user,
	)
}

func (h *AuthHandler) FindAll(c *gin.Context) {

	ctx := c.Request.Context()

	users, err := h.authService.FindAll(ctx)

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
		"get all users successfully",
		users,
	)
}
