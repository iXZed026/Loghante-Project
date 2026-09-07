package repositories

import (
	"context"
	"errors"

	appErrors "loghanteh-project/internal/errors"
	"loghanteh-project/internal/models"

	"github.com/jackc/pgx/v5/pgconn"
	"gorm.io/gorm"
)

type UserRepository struct {
	db *gorm.DB
}

func NewUserRepository(
	db *gorm.DB,
) *UserRepository {
	return &UserRepository{
		db: db,
	}
}

func (r *UserRepository) CreateUser(
	user *models.User,
	ctx context.Context,
) error {

	err := r.db.
		WithContext(ctx).
		Create(user).
		Error

	if err != nil {
		var pgErr *pgconn.PgError

		if errors.As(err, &pgErr) {
			if pgErr.Code == "23505" {
				switch pgErr.ConstraintName {
				case "users_email_key":
					return appErrors.ErrEmailAlreadyExists

				case "users_phonenumber_key":
					return appErrors.ErrPhoneAlreadyExists
				}
			}
		}

		return err
	}

	return nil
}

func (r *UserRepository) ExistsByEmail(
	ctx context.Context,
	email string,
) (bool, error) {

	var count int64

	result := r.db.
		WithContext(ctx).
		Model(&models.User{}).
		Where("email = ?", email).
		Count(&count)

	if result.Error != nil {
		return false, result.Error
	}

	return count > 0, nil
}

func (r *UserRepository) ExistsByPhone(
	ctx context.Context,
	phoneNumber string,
) (bool, error) {

	var count int64

	result := r.db.
		WithContext(ctx).
		Model(&models.User{}).
		Where("phonenumber = ?", phoneNumber).
		Count(&count)

	if result.Error != nil {
		return false, result.Error
	}

	return count > 0, nil
}

func (r *UserRepository) FindByEmailOrPhone(
	ctx context.Context,
	emailOrPhone string,
) (*models.User, error) {

	var user models.User

	result := r.db.
		WithContext(ctx).
		Where(
			"email = ? OR PhoneNumber = ?",
			emailOrPhone,
			emailOrPhone,
		).
		First(&user)

	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return nil, appErrors.ErrInvalidCredentials
		}

		return nil, result.Error
	}

	return &user, nil
}

func (r *UserRepository) FindAll(
	ctx context.Context,
) ([]models.User, error) {

	var users []models.User

	result := r.db.
		WithContext(ctx).
		Find(&users)

	if result.Error != nil {
		return nil, result.Error
	}

	return users, nil
}

func (r *UserRepository) FindByID(
	ctx context.Context,
	userID uint,
) (*models.User, error) {

	var user models.User

	err := r.db.
		WithContext(ctx).
		First(&user, userID).
		Error

	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, appErrors.ErrInvalidCredentials
		}

		return nil, err
	}

	return &user, nil
}

// Update
func (r *UserRepository) UpdatePassword(
	ctx context.Context,
	userID uint,
	passwordHash string,
) error {

	return r.db.
		WithContext(ctx).
		Model(&models.User{}).
		Where("userid = ?", userID).
		Update(
			"passwordhash",
			passwordHash,
		).
		Error
}
