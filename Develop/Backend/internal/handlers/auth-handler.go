package handlers

import (
	"context"
	"errors"

	appErrors "loghanteh-project/internal/errors"
	"loghanteh-project/internal/services"

	"github.com/gin-gonic/gin"
)

type AuthHandler struct {
	authService *services.AuthService
}

func NewAuthHandler(
	authService *services.AuthService,
) *AuthHandler {
	return &AuthHandler{
		authService: authService,
	}
}

type RegisterRequest struct {
	FullName       string `json:"fullName" binding:"required,max=150"`
	PhoneNumber    string `json:"phoneNumber" binding:"required,max=20"`
	Email          string `json:"email" binding:"required,email,max=254"`
	Password       string `json:"password" binding:"required,min=8"`
	RepeatPassword string `json:"repeatPassword" binding:"required,eqfield=Password"`
}

func (h *AuthHandler) Register(c *gin.Context) {
	var req RegisterRequest

	// Bind and validate request body.
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(
			appErrors.ErrInvalidInput.Code,
			gin.H{
				"error": appErrors.ErrInvalidInput.Message,
			},
		)
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
		var appErr *appErrors.AppError

		if errors.As(err, &appErr) {
			c.JSON(
				appErr.Code,
				gin.H{
					"error": appErr.Message,
				},
			)
			return
		}

		c.JSON(
			appErrors.ErrInternalServer.Code,
			gin.H{
				"error": appErrors.ErrInternalServer.Message,
			},
		)
		return
	}

	c.JSON(
		201,
		gin.H{
			"message": "user registered successfully",
		},
	)
}
