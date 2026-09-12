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

	ErrInvalidPrice = &AppError{
		Code:    http.StatusBadRequest,
		Message: "invalid price",
	}

	ErrFileRequired = &AppError{
		Code:    http.StatusBadRequest,
		Message: "file is required",
	}

	ErrUserNotFound = &AppError{
		Code:    http.StatusNotFound,
		Message: "user not found",
	}

	ErrTicketNotFound = &AppError{
		Code:    http.StatusNotFound,
		Message: "ticket not found",
	}

	ErrTicketNotInserted = &AppError{
		Code:    http.StatusInternalServerError,
		Message: "ticket not inserted",
	}

	ErrQueueUnavailable = &AppError{
		Code:    http.StatusServiceUnavailable,
		Message: "queue unavailable",
	}

	ErrToManyReguest = &AppError{
		Code:    http.StatusTooManyRequests,
		Message: "to many reguests",
	}
)
