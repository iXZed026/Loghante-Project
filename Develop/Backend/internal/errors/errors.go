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
)
