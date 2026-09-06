package routes

import (
	"log/slog"
	"loghanteh-project/internal/auth"
	"loghanteh-project/internal/handlers"
	"loghanteh-project/internal/middleware"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func SetupRoutes(
	r *gin.Engine,
	logger *slog.Logger,
	authHandler *handlers.AuthHandler,
	jwtService *auth.JWTService,
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

		//auth
		auth := api.Group("auth")
		auth.POST("/register", authHandler.Register)
		auth.POST("/login", authHandler.Login)
		auth.POST("/login/verify", authHandler.VerifyLogin)
		auth.POST("/register/verify", authHandler.VerifyRegister)
		auth.POST("/refresh", authHandler.Refresh)
		auth.GET("/logout", authHandler.Logout)
		auth.POST("/login/forget-password", authHandler.ForgetPassword)
		auth.POST("/login/forget-password/verify", authHandler.ForgetPassword)

		api.GET(
			"/profile",
			middleware.AuthMiddleware(jwtService),
			authHandler.Profile,
		)
	}

}
