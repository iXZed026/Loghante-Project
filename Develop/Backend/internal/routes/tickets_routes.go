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
		//Meuseum Tour
		tickets.GET(
			"/museum-tour",
			middleware.RateLimiter(
				rateLimiter,
				60,
				logger,
			),
			ticketHandler.GetMuseumTour,
		)

		//Events
		tickets.GET(
			"/events",
			middleware.RateLimiter(
				rateLimiter,
				60,
				logger,
			),
			ticketHandler.GetEvent,
		)

		tickets.GET(
			"/events/sessions/:sessionId",
			ticketHandler.GetEventSessionDetail,
		)

		//Courses
		tickets.GET(
			"/courses",
			middleware.RateLimiter(
				rateLimiter,
				60,
				logger,
			),
			ticketHandler.GetCourses,
		)

		tickets.GET(
			"/courses/sessions/:sessionId",
			ticketHandler.GetCourseSessionDetail,
		)

		//Bookings
		tickets.GET(
			"/bookings",
			middleware.AuthMiddleware(
				jwtService,
				logger,
			),
			middleware.RateLimiter(
				rateLimiter,
				60,
				logger,
			),
			ticketHandler.GetUserBookings,
		)

		tickets.POST(
			"/bookings",
			middleware.AuthMiddleware(
				jwtService,
				logger,
			),
			middleware.RateLimiter(
				rateLimiter,
				10,
				logger,
			),
			ticketHandler.CreateBooking,
		)
	}
}
