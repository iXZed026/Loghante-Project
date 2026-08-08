package routes

import (
	"log/slog"
	"museum_ticket/internal/auth"
	"museum_ticket/internal/handlers"
	"museum_ticket/internal/limiter"
	"museum_ticket/internal/middleware"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(
	r *gin.Engine,
	ticketHandler *handlers.TicketHandler,
	logger *slog.Logger,
	authHandler *handlers.AuthHandler,
	jwtService *auth.JWTService,
	redisLimiter limiter.RateLimiter,
	uploadHandler *handlers.UploadHandler,
) {

	r.Use(
		middleware.LoggerMiddleware(logger),
		middleware.RequestIDMiddleware(),
		middleware.RecoveryMiddleware(logger),
	)

	r.POST(
		"/tickets",
		ticketHandler.CreateTicket, // route joda
	)

	//Setups
	SetupAuthRoutes(
		r,
		authHandler,
		logger,
		redisLimiter,
	)

	SetupUploadRoutes(
		r,
		uploadHandler,
		logger,
	)

	authMiddleware :=
		middleware.AuthMiddleware(
			jwtService,
		)

	admin :=
		r.Group("/admin")

	admin.Use(
		authMiddleware,
		middleware.RequireRole("admin"),
	)

	{

		admin.GET(
			"/museums",
			func(c *gin.Context) {

			},
		)

	}

}
