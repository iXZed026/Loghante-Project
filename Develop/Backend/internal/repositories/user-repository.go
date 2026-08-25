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
