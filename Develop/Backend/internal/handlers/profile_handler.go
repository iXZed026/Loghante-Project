package handlers

import (
	"log/slog"
	"strconv"

	"loghanteh-project/internal/dto"
	appErrors "loghanteh-project/internal/errors"
	"loghanteh-project/internal/response"
	"loghanteh-project/internal/services"

	"github.com/gin-gonic/gin"
)

type ProfileHandler struct {
	profileService *services.ProfileService
	logger         *slog.Logger
}

func NewProfileHandler(
	profileService *services.ProfileService,
	logger *slog.Logger,
) *ProfileHandler {
	return &ProfileHandler{
		profileService: profileService,
		logger:         logger,
	}
}

func (h *ProfileHandler) EditProfile(
	c *gin.Context,
) {

	userIDValue, exists := c.Get("user_id")

	if !exists {
		response.HandleError(
			c,
			appErrors.ErrInvalidCredentials,
			h.logger,
		)
		return
	}

	userIDString, ok := userIDValue.(string)

	if !ok {
		response.HandleError(
			c,
			appErrors.ErrInvalidCredentials,
			h.logger,
		)
		return
	}

	userID, err := strconv.ParseUint(
		userIDString,
		10,
		64,
	)

	if err != nil {
		response.HandleError(
			c,
			appErrors.ErrInvalidCredentials,
			h.logger,
		)
		return
	}

	var req dto.EditProfileRequest

	if err := c.ShouldBindJSON(&req); err != nil {

		h.logger.Error(
			"failed to bind edit profile request",
			"error", err,
		)

		response.HandleError(
			c,
			err,
			h.logger,
		)
		return
	}

	profile, err := h.profileService.EditProfile(
		c.Request.Context(),
		uint(userID),
		req,
	)

	if err != nil {

		h.logger.Error(
			"failed to edit profile",
			"error", err,
			"userID", userID,
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
		"profile updated successfully",
		profile,
	)
}
