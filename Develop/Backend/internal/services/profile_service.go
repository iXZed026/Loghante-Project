package services

import (
	"context"
	"time"

	"loghanteh-project/internal/dto"
	appErrors "loghanteh-project/internal/errors"
	"loghanteh-project/internal/models"
	"loghanteh-project/internal/repositories"
	"loghanteh-project/internal/security"
)

type ProfileService struct {
	userRepository *repositories.UserRepository
}

func NewProfileService(
	userRepository *repositories.UserRepository,
) *ProfileService {
	return &ProfileService{
		userRepository: userRepository,
	}
}

func (s *ProfileService) GetProfile(
	ctx context.Context,
	userID uint,
) (*models.User, error) {
	user, err := s.userRepository.FindByID(ctx, userID)
	if err != nil {
		return nil, appErrors.ErrInternalServer
	}

	return user, nil
}

func (s *ProfileService) EditProfile(
	ctx context.Context,
	userID uint,
	req dto.EditProfileRequest,
) (*dto.EditProfileResponse, error) {

	user, err := s.userRepository.FindByIDWithPassword(
		ctx,
		userID,
	)
	if err != nil {
		return nil, err
	}

	dob, err := time.Parse(
		"2006-01-02",
		req.DOB,
	)
	if err != nil {
		return nil, appErrors.ErrInvalidInput
	}

	var passwordHash *string

	if req.NewPassword != "" {

		if req.CurrentPassword == "" {
			return nil, appErrors.ErrInvalidInput
		}

		if !security.CheckPasswordHash(
			user.PasswordHash,
			req.CurrentPassword,
		) {
			return nil, appErrors.ErrInvalidPassword
		}

		hash, err := security.HashPassword(
			req.NewPassword,
		)
		if err != nil {
			return nil, appErrors.ErrInternalServer
		}

		passwordHash = &hash
	}

	err = s.userRepository.UpdateProfile(
		ctx,
		userID,
		req.FullName,
		req.Email,
		req.PhoneNumber,
		dob,
		passwordHash,
	)
	if err != nil {
		return nil, err
	}

	return &dto.EditProfileResponse{
		UserID:      userID,
		FullName:    req.FullName,
		Email:       req.Email,
		PhoneNumber: req.PhoneNumber,
		DOB:         dob,
	}, nil
}
