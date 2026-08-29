package handlers

import (
	"log/slog"
	"net/http"
	"strconv"

	"loghanteh-project/internal/dto"
	appErrors "loghanteh-project/internal/errors"
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
			"failed to bind register request",
			"error", err,
		)

		response.HandleError(
			c,
			err,
			h.logger,
		)

		return
	}

	user, err := h.authService.Register(
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
		"verification required",
		user,
	)
}

func (h *AuthHandler) Login(c *gin.Context) {

	var req dto.LoginRequest

	if err := c.ShouldBindJSON(&req); err != nil {

		h.logger.Error(
			"user login bad request",
			"error", err,
		)

		response.HandleError(
			c,
			err,
			h.logger,
		)

		return
	}

	user, err :=
		h.authService.Login(
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
		"login is successful",
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

func (h *AuthHandler) GetAllRefreshTokens(c *gin.Context) {

	ctx := c.Request.Context()

	tokens, err :=
		h.authService.GetAllRefreshTokens(ctx)

	if err != nil {

		h.logger.Error(
			"failed to get all tokens",
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
		"get all tokens successfully",
		tokens,
	)
}

func (h *AuthHandler) Refresh(c *gin.Context) {

	refreshToken, err := c.Cookie(
		"refresh_token",
	)

	if err != nil {

		response.HandleError(
			c,
			appErrors.ErrInvalidCredentials,
			h.logger,
		)

		return
	}

	accessToken, newRefreshToken, err :=
		h.authService.RefreshAccessToken(
			c.Request.Context(),
			refreshToken,
		)

	if err != nil {

		response.HandleError(
			c,
			err,
			h.logger,
		)

		return
	}

	c.SetSameSite(http.SameSiteLaxMode)

	c.SetCookie(
		"refresh_token",
		newRefreshToken,
		30*24*60*60,
		"/",
		"",
		true,
		true,
	)

	response.Success(
		c,
		"token refreshed successfully",
		gin.H{
			"accessToken": accessToken,
		},
	)
}

func (h *AuthHandler) Profile(c *gin.Context) {

	userID, exists := c.Get("user_id")

	if !exists {
		c.JSON(
			http.StatusUnauthorized,
			gin.H{
				"success": false,
				"message": "unauthorized",
			},
		)
		return
	}

	id, err := strconv.ParseUint(
		userID.(string),
		10,
		64,
	)

	if err != nil {
		c.JSON(
			http.StatusUnauthorized,
			gin.H{
				"success": false,
				"message": "invalid user id",
			},
		)
		return
	}

	user, err := h.authService.GetProfile(
		c.Request.Context(),
		uint(id),
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
		"profile fetched successfully",
		user,
	)
}

func (h *AuthHandler) Logout(c *gin.Context) {

	refreshToken, err := c.Cookie(
		"refresh_token",
	)

	if err == nil {

		err = h.authService.Logout(
			c.Request.Context(),
			refreshToken,
		)

		if err != nil {

			response.HandleError(
				c,
				err,
				h.logger,
			)

			return
		}
	}

	c.SetCookie(
		"refresh_token",
		"",
		-1,
		"/",
		"",
		true,
		true,
	)

	response.Success(
		c,
		"logged out successfully",
		nil,
	)
}

func (h *AuthHandler) VerifyLogin(c *gin.Context) {

	var req dto.VerifyLoginRequest

	if err := c.ShouldBindJSON(&req); err != nil {

		response.HandleError(
			c,
			err,
			h.logger,
		)

		return
	}

	user, refreshToken, err :=
		h.authService.VerifyLogin(
			c.Request.Context(),
			req.VerificationToken,
			req.Code,
		)

	if err != nil {

		h.logger.Error(
			"failed to verify login",
			"error", err,
		)

		response.HandleError(
			c,
			err,
			h.logger,
		)

		return
	}

	// Refresh Token → HttpOnly Cookie
	c.SetSameSite(http.SameSiteLaxMode)

	c.SetCookie(
		"refresh_token",
		refreshToken,
		30*24*60*60,
		"/",
		"",
		true,
		true,
	)

	response.Success(
		c,
		"user login verified successfully",
		user,
	)
}

func (h *AuthHandler) VerifyRegister(c *gin.Context) {

	var req dto.VerifyRegisterRequest

	if err := c.ShouldBindJSON(&req); err != nil {

		h.logger.Error(
			"failed to bind register verification request",
			"error", err,
		)

		response.HandleError(
			c,
			err,
			h.logger,
		)

		return
	}

	err := h.authService.VerifyRegister(
		c.Request.Context(),
		req.VerificationToken,
		req.Code,
	)

	if err != nil {

		h.logger.Error(
			"failed to verify register",
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
		"user registration verified successfully",
		nil,
	)
}
