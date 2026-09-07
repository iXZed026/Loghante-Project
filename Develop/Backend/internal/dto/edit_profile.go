package dto

import "time"

type ProfileResponse struct {
	UserID      uint      `json:"userId"`
	FullName    string    `json:"fullName"`
	Email       string    `json:"email"`
	PhoneNumber string    `json:"phoneNumber"`
	DOB         time.Time `json:"dob"`
}

type EditProfileRequest struct {
	FullName        string `json:"fullName"`
	Email           string `json:"email"`
	PhoneNumber     string `json:"phoneNumber"`
	DOB             string `json:"dob"`
	CurrentPassword string `json:"currentPassword"`
	NewPassword     string `json:"newPassword"`
}

type EditProfileResponse struct {
	UserID      uint      `json:"userId"`
	FullName    string    `json:"fullName"`
	Email       string    `json:"email"`
	PhoneNumber string    `json:"phoneNumber"`
	DOB         time.Time `json:"dob"`
}
