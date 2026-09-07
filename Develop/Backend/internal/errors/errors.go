package errors

import "net/http"

var (
	// Global Errors

	ErrEmptyValue = &AppError{
		Code:    http.StatusBadRequest,
		Message: "value must not be empty",
	}

	ErrInternalServer = &AppError{
		Code:    http.StatusInternalServerError,
		Message: "internal server error",
	}

	ErrInvalidInput = &AppError{
		Code:    http.StatusBadRequest,
		Message: "invalid input",
	}

	ErrUserAlreadyVerified = &AppError{
		Code:    http.StatusConflict,
		Message: "user already verified",
	}

	ErrVerificationTokenExpired = &AppError{
		Code:    http.StatusGone,
		Message: "verification token has expired",
	}

	ErrInvalidVerificationCode = &AppError{
		Code:    http.StatusBadRequest,
		Message: "invalid verification code",
	}

	ErrPasswordMismatch = &AppError{
		Code:    http.StatusBadRequest,
		Message: "passwords do not match",
	}

	ErrTooManyRequests = &AppError{
		Code:    http.StatusTooManyRequests,
		Message: "too many requests",
	}

	ErrEmailAlreadyExists = &AppError{
		Code:    http.StatusConflict,
		Message: "email already exists",
	}

	ErrPhoneAlreadyExists = &AppError{
		Code:    http.StatusConflict,
		Message: "phone number already exists",
	}

	ErrInvalidCredentials = &AppError{
		Code:    http.StatusUnauthorized,
		Message: "invalid email/phone or password",
	}

	ErrInvalidPassword = &AppError{
		Code:    http.StatusBadRequest,
		Message: "invalid password",
	}

	ErrUserNotFound = &AppError{
		Code:    http.StatusNotFound,
		Message: "user not found",
	}
)
