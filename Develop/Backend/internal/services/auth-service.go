package services

import (
	"context"
	"loghanteh-project/internal/models"
	"loghanteh-project/internal/repositories"

	appErrors "loghanteh-project/internal/errors"

	"golang.org/x/crypto/bcrypt"
)

type AuthService struct {
	userRepository *repositories.UserRepository
}

func NewAuthService(
	userRepository *repositories.UserRepository,
) *AuthService {
	return &AuthService{
		userRepository: userRepository,
	}
}

func (s *AuthService) Register(
	ctx context.Context,
	fullName string,
	phoneNumber string,
	email string,
	password string,
	repeatPassword string,
) error {

	if password != repeatPassword {
		return appErrors.ErrPasswordMismatch
	}

	passwordHash, err := bcrypt.GenerateFromPassword(
		[]byte(password),
		bcrypt.DefaultCost,
	)
	if err != nil {
		return appErrors.ErrInternalServer
	}

	user := &models.User{
		FullName:     fullName,
		PhoneNumber:  phoneNumber,
		Email:        email,
		PasswordHash: string(passwordHash),
	}

	if err := s.userRepository.CreateUser(user, ctx); err != nil {
		return err
	}

	return nil
}

func (s *AuthService) FindAll(
	ctx context.Context,
) ([]models.User, error) {
	users, err := s.userRepository.FindAll(ctx)
	if err != nil {
		return nil, appErrors.ErrInternalServer
	}

	return users, nil
}
