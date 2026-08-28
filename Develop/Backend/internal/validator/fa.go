package validator

var faMessages = map[string]map[string]string{
	"FullName": {
		"required": "نام و نام خانوادگی نباید خالی باشد.",
	},

	"PhoneNumber": {
		"required": "شماره تلفن نباید خالی باشد.",
	},

	"Email": {
		"required": "ایمیل نباید خالی باشد.",
		"email":    "ایمیل وارد شده معتبر نیست.",
	},

	"Password": {
		"required": "رمز عبور نباید خالی باشد.",
		"min":      "رمز عبور باید حداقل ۸ کاراکتر باشد.",
	},

	"RepeatPassword": {
		"required": "تکرار رمز عبور نباید خالی باشد.",
	},

	//Login
	"EmailOrPhone": {
		"required": "ایمیل یا تلفن نباید خالی باشد",
		"max":      "ایمیل یا شماره تلفن نباید بیشتر از ۲۵۴ کاراکتر باشد",
	},
}
