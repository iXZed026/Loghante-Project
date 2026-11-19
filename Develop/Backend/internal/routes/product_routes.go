package routes

import (
	"log/slog"

	"loghanteh-project/internal/handlers"
	"loghanteh-project/internal/limiter"
	"loghanteh-project/internal/middleware"

	"github.com/gin-gonic/gin"
)

func SetupProductRoutes(
	api *gin.RouterGroup,
	logger *slog.Logger,
	productHandler *handlers.ProductHandler,
	rateLimiter limiter.RateLimiter,
) {
	products := api.Group("/products")
	products.GET("/discounted", middleware.RateLimiter(rateLimiter, 60, logger), productHandler.GetDiscounted)
	products.GET("/newest", middleware.RateLimiter(rateLimiter, 60, logger), productHandler.GetNewest)
	products.GET("/by-museum", middleware.RateLimiter(rateLimiter, 60, logger), productHandler.GetOnePerMuseum)
	products.GET("/search", middleware.RateLimiter(rateLimiter, 60, logger), productHandler.SearchSuggestions)
	products.GET("", middleware.RateLimiter(rateLimiter, 60, logger), productHandler.List)
	products.GET("/:id/related", middleware.RateLimiter(rateLimiter, 60, logger), productHandler.GetRelated)
	products.GET("/:id", middleware.RateLimiter(rateLimiter, 60, logger), productHandler.GetDetail)
}
