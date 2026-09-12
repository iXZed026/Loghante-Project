package validator

import (
	"strings"

	"github.com/go-playground/validator/v10"
)

func TranslateErrors(
	err error,
	lang string,
) string {
	messages := enMessages

	if lang == "fa" {
		messages = faMessages
	}

	errors, ok := err.(validator.ValidationErrors)

	if !ok {
		return err.Error()
	}

	var result []string

	for _, e := range errors {
		msg, ok := messages[e.Tag()]
		if ok {
			result = append(result, msg)

			continue
		}

		result = append(result, e.Error())

	}

	return strings.Join(result, ", ")

}
