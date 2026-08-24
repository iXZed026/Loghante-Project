package routes

import (
	"fmt"
	"log/slog"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(
	r *gin.Engine,
	logger *slog.Logger,
) {

	// r.Use(
	// 	middleware.LoggerMiddleware(logger),
	// 	middleware.RequestIDMiddleware(),
	// 	middleware.RecoveryMiddleware(logger),
	// )

	api := r.Group("api")
	{
		api.GET("/", func(c *gin.Context) {
			fmt.Print("test api/")
		})
	}

}
