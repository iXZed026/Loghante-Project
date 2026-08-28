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
	userRepository              *repositories.UserRepository
	refreshTokenRepository      *repositories.RefreshTokenRepository
	jwtService                  *appAuth.JWTService
	loginVerificationRepository *repositories.LoginVerificationRepository
}

func NewAuthService(
	userRepository *repositories.UserRepository,
	refreshTokenRepository *repositories.RefreshTokenRepository,
	jwtService *appAuth.JWTService,
	loginVerificationRepository *repositories.LoginVerificationRepository,
) *AuthService {

	return &AuthService{
		userRepository:              userRepository,
		refreshTokenRepository:      refreshTokenRepository,
		jwtService:                  jwtService,
		loginVerificationRepository: loginVerificationRepository,
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

	// Find user
	user, err := s.userRepository.FindByEmailOrPhone(
		ctx,
		emailOrPhone,
	)

	if err != nil {
		return nil, err
	}

	// Check password
	err = bcrypt.CompareHashAndPassword(
		[]byte(user.PasswordHash),
		[]byte(password),
	)

	if err != nil {
		return nil, appErrors.ErrInvalidCredentials
	}

	// Generate temporary verification token
	verificationToken, err :=
		appAuth.GenerateVerificationToken()

	if err != nil {
		return nil, appErrors.ErrInternalServer
	}

	// Save verification session
	verification := &models.LoginVerification{
		UserID:    user.UserID,
		Token:     verificationToken,
		ExpiresAt: time.Now().Add(5 * time.Minute),
		Verified:  false,
	}

	err = s.loginVerificationRepository.Create(
		ctx,
		verification,
	)

	if err != nil {
		return nil, appErrors.ErrInternalServer
	}

	return &dto.LoginResponse{
		UserID:            user.UserID,
		FullName:          user.FullName,
		Email:             user.Email,
		PhoneNumber:       user.PhoneNumber,
		VerificationToken: verificationToken,
	}, nil
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

func (s *AuthService) VerifyLogin(
	ctx context.Context,
	verificationToken string,
	code string,
) (*dto.VerifyLoginResponse, string, error) {

	verification, err :=
		s.loginVerificationRepository.FindByToken(
			ctx,
			verificationToken,
		)

	if err != nil {
		return nil, "", err
	}

	// Already verified
	if verification.Verified {
		return nil, "", appErrors.ErrUserAlreadyVerified
	}

	// Token expired
	if time.Now().After(verification.ExpiresAt) {
		return nil, "", appErrors.ErrVerificationTokenExpired
	}

	// Temporary OTP
	// بعداً این قسمت را با OTP واقعی جایگزین می‌کنیم.
	if code != "123456" {
		return nil, "", appErrors.ErrInvalidVerificationCode
	}

	// Mark verification as verified
	err = s.loginVerificationRepository.MarkVerified(
		ctx,
		verification,
	)

	if err != nil {
		return nil, "", appErrors.ErrInternalServer
	}

	// Get user
	user, err :=
		s.userRepository.FindByID(
			ctx,
			uint(verification.UserID),
		)

	if err != nil {
		return nil, "", err
	}

	// Generate Access Token
	accessToken, err :=
		s.jwtService.GenerateAccessToken(
			strconv.Itoa(user.UserID),
		)

	if err != nil {
		return nil, "", appErrors.ErrInternalServer
	}

	// Generate Refresh Token
	refreshToken, err :=
		appAuth.GenerateRefreshToken()

	if err != nil {
		return nil, "", appErrors.ErrInternalServer
	}

	refreshTokenModel := &models.RefreshToken{
		UserID: verification.UserID,
		Token:  refreshToken,
		ExpiresAt: time.Now().Add(
			30 * 24 * time.Hour,
		),
		Revoked: false,
	}

	err = s.refreshTokenRepository.Create(
		ctx,
		refreshTokenModel,
	)

	if err != nil {
		return nil, "", appErrors.ErrInternalServer
	}

	return &dto.VerifyLoginResponse{
		UserID:      user.UserID,
		FullName:    user.FullName,
		Email:       user.Email,
		PhoneNumber: user.PhoneNumber,
		AccessToken: accessToken,
	}, refreshToken, nil
}
