package response

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func Success(
	c *gin.Context,
	message string,
	data any,
) {

	c.JSON(
		http.StatusOK,
		gin.H{
			"success": true,
			"message": message,
			"data":    data,
		},
	)
}
