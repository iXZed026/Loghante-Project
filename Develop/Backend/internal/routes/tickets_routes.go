package routes

import (
	"log/slog"

	"loghanteh-project/internal/auth"
	"loghanteh-project/internal/handlers"
	"loghanteh-project/internal/limiter"
	"loghanteh-project/internal/middleware"

	"github.com/gin-gonic/gin"
)

func SetupTicketsRoutes(
	api *gin.RouterGroup,
	logger *slog.Logger,
	ticketHandler *handlers.TicketHandler,
	jwtService *auth.JWTService,
	rateLimiter limiter.RateLimiter,
) {
	tickets := api.Group("/tickets")
	{
		tickets.GET(
			"/museum-tour",
			middleware.RateLimiter(rateLimiter, 60, logger),
			ticketHandler.GetMuseumTour,
		)

		tickets.GET(
			"/events-and-courses",
			middleware.RateLimiter(rateLimiter, 60, logger),
			ticketHandler.GetEventAndCourses,
		)

		tickets.GET(
			"/bookings",
			middleware.AuthMiddleware(jwtService),
			middleware.RateLimiter(rateLimiter, 60, logger),
			ticketHandler.GetUserBookings,
		)

		tickets.POST(
			"/bookings",
			middleware.AuthMiddleware(jwtService),
			middleware.RateLimiter(rateLimiter, 10, logger),
			ticketHandler.CreateBooking,
		)
	}
}
