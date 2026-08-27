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
) (*dto.LoginResponse, string, error) {

	user, err := s.userRepository.FindByEmailOrPhone(
		ctx,
		emailOrPhone,
	)

	if err != nil {
		return nil, "", err
	}

	err = bcrypt.CompareHashAndPassword(
		[]byte(user.PasswordHash),
		[]byte(password),
	)

	if err != nil {
		return nil, "", appErrors.ErrInvalidCredentials
	}

	accessToken, err := s.jwtService.GenerateAccessToken(
		strconv.Itoa(user.UserID),
	)

	if err != nil {
		return nil, "", appErrors.ErrInternalServer
	}

	refreshToken, err := appAuth.GenerateRefreshToken()

	if err != nil {
		return nil, "", appErrors.ErrInternalServer
	}

	refreshTokenModel := &models.RefreshToken{
		UserID:    user.UserID,
		Token:     refreshToken,
		ExpiresAt: time.Now().Add(1 * time.Minute),
		// ExpiresAt: time.Now().Add(30 * 24 * time.Hour),
		Revoked: false,
	}

	err = s.refreshTokenRepository.Create(
		ctx,
		refreshTokenModel,
	)

	if err != nil {
		return nil, "", appErrors.ErrInternalServer
	}

	return &dto.LoginResponse{
		UserID:      uint(user.UserID),
		FullName:    user.FullName,
		Email:       user.Email,
		PhoneNumber: user.PhoneNumber,
		AccessToken: accessToken,
	}, refreshToken, nil
}

func (s *AuthService) RefreshAccessToken(
	ctx context.Context,
	oldRefreshToken string,
) (string, string, error) {

	token, err :=
		s.refreshTokenRepository.FindValidToken(
			ctx,
			oldRefreshToken,
		)

	if err != nil {
		return "", "", err
	}

	err = s.refreshTokenRepository.Revoke(
		ctx,
		oldRefreshToken,
	)

	if err != nil {
		return "", "", appErrors.ErrInternalServer
	}

	accessToken, err :=
		s.jwtService.GenerateAccessToken(
			strconv.Itoa(token.UserID),
		)

	if err != nil {
		return "", "", appErrors.ErrInternalServer
	}

	newRefreshToken, err :=
		appAuth.GenerateRefreshToken()

	if err != nil {
		return "", "", appErrors.ErrInternalServer
	}

	newRefreshTokenModel := &models.RefreshToken{
		UserID:    token.UserID,
		Token:     newRefreshToken,
		ExpiresAt: time.Now().Add(1 * time.Minute),
		// ExpiresAt: time.Now().Add(30 * 24 * time.Hour),
		Revoked: false,
	}

	err = s.refreshTokenRepository.Create(
		ctx,
		newRefreshTokenModel,
	)

	if err != nil {
		return "", "", appErrors.ErrInternalServer
	}

	return accessToken, newRefreshToken, nil
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

func (s *AuthService) GetAllRefreshTokens(
	ctx context.Context,
) ([]models.RefreshToken, error) {

	tokens, err :=
		s.refreshTokenRepository.GetAllRefreshTokens(ctx)
	if err != nil {
		return nil, appErrors.ErrInternalServer
	}

	return tokens, nil
}

func (s *AuthService) Logout(
	ctx context.Context,
	refreshToken string,
) error {

	err := s.refreshTokenRepository.Revoke(
		ctx,
		refreshToken,
	)

	if err != nil {
		return appErrors.ErrInternalServer
	}

	return nil
}
