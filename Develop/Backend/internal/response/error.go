package response

import (
	"errors"
	"log/slog"
	"net/http"

	appErr "loghanteh-project/internal/errors"
	appValidator "loghanteh-project/internal/validator"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

func HandleError(
	c *gin.Context,
	err error,
	logger *slog.Logger,
) {

	logger.Error(
		err.Error(),
	)

	// Handle validation errors
	var validationErrors validator.ValidationErrors

	if errors.As(err, &validationErrors) {

		lang := c.GetHeader("Accept-Language")

		message :=
			appValidator.TranslateErrors(
				validationErrors,
				lang,
			)

		c.JSON(
			http.StatusBadRequest,
			gin.H{
				"success": false,
				"message": message,
			},
		)

		return
	}

	// Handle application errors
	var e *appErr.AppError

	if errors.As(err, &e) {

		c.JSON(
			e.Code,
			gin.H{
				"success": false,
				"message": e.Message,
			},
		)

		return
	}

	// Unknown errors
	c.JSON(
		http.StatusInternalServerError,
		gin.H{
			"success": false,
			"message": "internal server error",
		},
	)
}
