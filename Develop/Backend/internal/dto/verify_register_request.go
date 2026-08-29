package dto

type VerifyRegisterRequest struct {
	VerificationToken string `json:"verificationToken" binding:"required"`
	Code              string `json:"code" binding:"required"`
}
