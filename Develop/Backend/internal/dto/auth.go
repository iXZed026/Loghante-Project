package dto

type RegisterRequest struct {
	FullName       string `json:"fullName" binding:"required,max=150"`
	PhoneNumber    string `json:"phoneNumber" binding:"required,max=20"`
	Email          string `json:"email" binding:"required,email,max=254"`
	Password       string `json:"password" binding:"required,min=8"`
	RepeatPassword string `json:"repeatPassword" binding:"required"`
}

type LoginRequest struct {
	Email    string `json:"email" binding:"required,email,max=254"`
	Password string `json:"password" binding:"required"`
}
