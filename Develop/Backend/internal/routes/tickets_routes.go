package routes

import (
	"log/slog"

	"loghanteh-project/internal/auth"
	"loghanteh-project/internal/handlers"
	"loghanteh-project/internal/middleware"

	"github.com/gin-gonic/gin"
)

func SetupTicketsRoutes(
	api *gin.RouterGroup,
	logger *slog.Logger,
	ticketHandler *handlers.TicketHandler,
	jwtService *auth.JWTService,
) {

	tickets := api.Group("/tickets")
	{
		tickets.GET(
			"/museum-tour",
			ticketHandler.GetMuseumTour,
		)

		tickets.GET(
			"/events-and-courses",
			ticketHandler.GetEventAndCourses,
		)

		tickets.POST(
			"/bookings",
			middleware.AuthMiddleware(jwtService),
			ticketHandler.CreateBooking,
		)
	}
}
