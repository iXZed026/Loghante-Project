package services

import (
	"context"
	"strconv"
	"time"

	appAuth "loghanteh-project/internal/auth"
	"loghanteh-project/internal/dto"
	appErrors "loghanteh-project/internal/errors"
	"loghanteh-project/internal/models"
	"loghanteh-project/internal/repositories"

	"golang.org/x/crypto/bcrypt"
)

type AuthService struct {
	userRepository         *repositories.UserRepository
	refreshTokenRepository *repositories.RefreshTokenRepository
	jwtService             *appAuth.JWTService
}

func NewAuthService(
	userRepository *repositories.UserRepository,
	refreshTokenRepository *repositories.RefreshTokenRepository,
	jwtService *appAuth.JWTService,
) *AuthService {
	return &AuthService{
		userRepository:         userRepository,
		refreshTokenRepository: refreshTokenRepository,
		jwtService:             jwtService,
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

func (s *AuthService) Login(
	ctx context.Context,
	emailOrPhone string,
	password string,
) (*dto.LoginResponse, error) {

	user, err := s.userRepository.FindByEmailOrPhone(
		ctx,
		emailOrPhone,
	)

	if err != nil {
		return nil, err
	}

	err = bcrypt.CompareHashAndPassword(
		[]byte(user.PasswordHash),
		[]byte(password),
	)

	if err != nil {
		return nil, appErrors.ErrInvalidCredentials
	}

	accessToken, err := s.jwtService.GenerateAccessToken(
		strconv.FormatUint(uint64(user.UserID), 10),
		// user.Role,
	)

	if err != nil {
		return nil, appErrors.ErrInternalServer
	}

	refreshToken, err := appAuth.GenerateRefreshToken()

	if err != nil {
		return nil, appErrors.ErrInternalServer
	}

	refreshTokenModel := &models.RefreshToken{
		UserID:    uint(user.UserID),
		Token:     refreshToken,
		ExpiresAt: time.Now().Add(30 * 24 * time.Hour),
		Revoked:   false,
		CreatedAt: time.Now(),
	}

	err = s.refreshTokenRepository.Create(
		ctx,
		refreshTokenModel,
	)

	if err != nil {
		return nil, appErrors.ErrInternalServer
	}

	return &dto.LoginResponse{
		UserID:       uint(user.UserID),
		FullName:     user.FullName,
		Email:        user.Email,
		PhoneNumber:  user.PhoneNumber,
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	}, nil
}

func (s *AuthService) RefreshAccessToken(
	ctx context.Context,
	refreshToken string,
) (string, error) {

	token, err := s.refreshTokenRepository.FindValidToken(
		ctx,
		refreshToken,
	)

	if err != nil {
		return "", err
	}

	accessToken, err := s.jwtService.GenerateAccessToken(
		strconv.FormatUint(uint64(token.UserID), 10),
		// "",
	)

	if err != nil {
		return "", appErrors.ErrInternalServer
	}

	return accessToken, nil
}

func (s *AuthService) GetProfile(
	ctx context.Context,
	userID uint,
) (*models.User, error) {

	user, err := s.userRepository.FindByID(
		ctx,
		userID,
	)

	if err != nil {
		return nil, appErrors.ErrInternalServer
	}

	return user, nil
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
