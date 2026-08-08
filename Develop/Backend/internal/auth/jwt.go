package auth

import (
	"errors"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

type JWTService struct {
	secret string
}

func NewJWTService(secret string) *JWTService {

	return &JWTService{
		secret: secret,
	}
}

func (j *JWTService) GenerateAccessToken(
	userID string,
	role string,
) (string, error) {

	claims := jwt.MapClaims{

		"user_id": userID,

		"role": role,

		"exp": time.Now().
			Add(15 * time.Minute).
			Unix(),
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

			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {

				return nil, errors.New(
					"invalid signing method",
				)
			}

			return []byte(j.secret), nil
		},
	)

	if err != nil {
		return nil, err
	}

	if !token.Valid {

		return nil, errors.New(
			"invalid token",
		)
	}

	return token, nil
}
