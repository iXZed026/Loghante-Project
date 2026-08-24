package repositories

import (
	"context"
	"loghanteh-project/internal/models"

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
	return r.db.WithContext(ctx).Create(user).Error
}
