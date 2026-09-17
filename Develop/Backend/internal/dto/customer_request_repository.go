package dto

type CustomerRequestReq struct {
	FullName           string `json:"fulName" binding:"required,max=150"`
	CompanyName        string `json:"companyName" binding:"required,max=255"`
	EmailOrPhomeNumber string `json:"emailOrPhone" binding:"required,max=255"`
	Description        string `json:"description" binding:"required,max=255"`
}
