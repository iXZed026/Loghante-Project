package models

import "time"

type User struct {
	UserID       int        `json:"userId" db:"UserId"`
	FullName     string     `json:"fullName" db:"FullName"`
	Email        string     `json:"email" db:"Email"`
	PhoneNumber  string     `json:"phoneNumber" db:"PhoneNumber"`
	DOB          *time.Time `json:"dob,omitempty" db:"DOB"`
	PasswordHash string     `json:"-" db:"PasswordHash"`
}
