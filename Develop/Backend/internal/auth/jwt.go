package auth

import (
	"errors"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

type JWTService struct {
	secret        string
	accessTokenTTL time.Duration
}

func NewJWTService(secret string) *JWTService {
	ttl := 15 * time.Minute
	if v := os.Getenv("ACCESS_TOKEN_TTL_MINUTES"); v != "" {
		if minutes, err := time.ParseDuration(v + "m"); err == nil {
			ttl = minutes
		}
	}
	return &JWTService{
		secret:         secret,
		accessTokenTTL: ttl,
	}
}

func (j *JWTService) GenerateAccessToken(
	userID string,
	// role string,
) (string, error) {

	now := time.Now()

	claims := jwt.MapClaims{
		"user_id": userID,
		// "role":    role,
		"iat": now.Unix(),
		"exp": now.Add(j.accessTokenTTL).Unix(),
	}

	token := jwt.NewWithClaims(
		jwt.SigningMethodHS256,
		claims,
	)

	return token.SignedString(
		[]byte(j.secret),
	)
}

func (j *JWTService) ValidateToken(
	tokenString string,
) (*jwt.Token, error) {

	token, err := jwt.Parse(
		tokenString,
		func(token *jwt.Token) (interface{}, error) {

			if token.Method != jwt.SigningMethodHS256 {
				return nil, errors.New("invalid signing method")
			}

			return []byte(j.secret), nil
		},
	)

	if err != nil {
		return nil, err
	}

	if !token.Valid {
		return nil, errors.New("invalid token")
	}

	return token, nil
}
