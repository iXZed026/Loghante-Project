package models

import "time"

type RefreshToken struct {
	ID        uint      `gorm:"primaryKey;column:refresh_token_id" json:"-"`
	UserID    uint      `gorm:"column:user_id;not null;index" json:"-"`
	Token     string    `gorm:"column:token;unique;not null" json:"-"`
	ExpiresAt time.Time `gorm:"column:expires_at;not null" json:"-"`
	Revoked   bool      `gorm:"column:revoked;not null;default:false" json:"-"`
	CreatedAt time.Time `gorm:"column:created_at;not null" json:"-"`
}
