package middleware

import (
	"net/http"
	"strings"

	appAuth "loghanteh-project/internal/auth"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func AuthMiddleware(
	jwtService *appAuth.JWTService,
) gin.HandlerFunc {

	return func(c *gin.Context) {

		authHeader := c.GetHeader("Authorization")

		if authHeader == "" {
			c.AbortWithStatusJSON(
				http.StatusUnauthorized,
				gin.H{
					"success": false,
					"message": "authorization required",
				},
			)
			return
		}

		parts := strings.SplitN(
			authHeader,
			" ",
			2,
		)

		if len(parts) != 2 ||
			parts[0] != "Bearer" {

			c.AbortWithStatusJSON(
				http.StatusUnauthorized,
				gin.H{
					"success": false,
					"message": "invalid authorization header",
				},
			)

			return
		}

		token, err := jwtService.ValidateToken(parts[1])

		if err != nil {

			c.AbortWithStatusJSON(
				http.StatusUnauthorized,
				gin.H{
					"success": false,
					"message": "invalid or expired token",
				},
			)

			return
		}

		claims, ok := token.Claims.(jwt.MapClaims)

		if !ok {
			c.AbortWithStatusJSON(
				http.StatusUnauthorized,
				gin.H{
					"success": false,
					"message": "invalid token claims",
				},
			)

			return
		}

		userID, ok := claims["user_id"].(string)

		if !ok {
			c.AbortWithStatusJSON(
				http.StatusUnauthorized,
				gin.H{
					"success": false,
					"message": "invalid user id",
				},
			)

			return
		}

		c.Set("user_id", userID)

		// if role, ok := claims["role"].(string); ok {
		// 	c.Set("role", role)
		// }

		c.Next()
	}
}
