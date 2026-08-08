package middleware

import (
	"log/slog"
	appErr "museum_ticket/internal/errors"
	"museum_ticket/internal/limiter"
	"museum_ticket/internal/response"

	"github.com/gin-gonic/gin"
)

func RateLimiter(
	limiter limiter.RateLimiter,
	max int,
	logger *slog.Logger,
) gin.HandlerFunc {
	return func(c *gin.Context) {
		ip := c.ClientIP()

		allow, err := limiter.Allow(
			c.Request.Context(),
			ip,
			max,
		)

		if err != nil {
			logger.Error(
				"rate limiter error",
				"errror", err,
			)

			response.HandleError(
				c,
				err,
				logger,
			)

			c.Abort()

			return
		}

		if !allow {
			logger.Warn(
				"rate limit exceeded",
				"ip",
				ip,
			)

			response.HandleError(
				c,
				appErr.ErrToManyReguest,
				logger,
			)

			c.Abort()

			return
		}

		c.Next()

	}
}
