package routes

import (
	"log/slog"
	"loghanteh-project/internal/handlers"
	"loghanteh-project/internal/middleware"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func SetupRoutes(
	r *gin.Engine,
	logger *slog.Logger,
	authHandler *handlers.AuthHandler,
) {

	r.Use(
		// middleware.LoggerMiddleware(logger),
		// middleware.RequestIDMiddleware(),
		middleware.RecoveryMiddleware(logger),
	)

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		AllowCredentials: true,
	}))

	api := r.Group("api")
	{
		api.GET("/users", authHandler.FindAll)
		api.POST("/register", authHandler.Register)
		api.POST("/login", authHandler.Login)
	}

}
