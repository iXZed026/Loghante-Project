package errors

import "net/http"

var (
	ErrInternalServer = &AppError{
		Code:    http.StatusInternalServerError,
		Message: "internal server error",
	}

	ErrInvalidInput = &AppError{
		Code:    http.StatusBadRequest,
		Message: "invalid input",
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
)
