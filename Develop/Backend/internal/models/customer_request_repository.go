package models

type CustomerRequest struct {
	RequestID    int    `gorm:"column:requestId:primarykey"`
	FullName     string `gorm:"column:fullname"`
	CompanyName  string `gorm:"column:companyname"`
	Email        string `gorm:"column:email"`
	PhomeNumber  string `gorm:"column:phonenumber"`
	RequestTitle string `gorm:"column:requesttitle"`
	Description  string `gorm:"column:description"`
}

func (CustomerRequest) TabaleName() string {
	return "customerrequests"
}
