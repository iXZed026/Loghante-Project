package dto

type RegisterRequest struct {
	FullName       string `json:"fullName" binding:"required,max=150"`
	PhoneNumber    string `json:"phoneNumber" binding:"required,max=20"`
	Email          string `json:"email" binding:"required,email,max=254"`
	Password       string `json:"password" binding:"required,min=8"`
	RepeatPassword string `json:"repeatPassword" binding:"required"`
}

type LoginRequest struct {
	EmailOrPhone string `json:"emailOrPhone" binding:"required"`
	Password     string `json:"password" binding:"required"`
}

type LoginResponse struct {
	UserID       uint   `json:"userId"`
	FullName     string `json:"fullName"`
	Email        string `json:"email"`
	PhoneNumber  string `json:"phoneNumber"`
	AccessToken  string `json:"accessToken"`
	RefreshToken string `json:"refreshToken"`
}

type RefreshRequest struct {
	RefreshToken string `json:"refreshToken" binding:"required"`
}

type RefreshResponse struct {
	AccessToken string `json:"accessToken"`
}
