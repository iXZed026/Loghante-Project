package response

import (
	"errors"
	"log/slog"
	"net/http"

	appErr "museum_ticket/internal/errors"

	"github.com/gin-gonic/gin"
)

func HandleError(
	c *gin.Context,
	err error,
	logger *slog.Logger,
) {

	logger.Error(
		err.Error(),
	)

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

	c.JSON(
		http.StatusInternalServerError,
		gin.H{
			"success": false,
			"message": "internal server error",
		},
	)
}
