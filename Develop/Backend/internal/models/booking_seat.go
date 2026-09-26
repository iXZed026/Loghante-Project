package models

type BookingSeat struct {
	BookingID uint `gorm:"column:bookingid;primaryKey"`
	SessionID uint `gorm:"column:sessionid;primaryKey"`
	SeatID    uint `gorm:"column:seatid;primaryKey"`

	Booking Booking      `gorm:"foreignKey:BookingID"`
	Session EventSession `gorm:"foreignKey:SessionID"`
	Seat    Seat         `gorm:"foreignKey:SeatID"`
}

func (BookingSeat) TableName() string {
	return "bookingseats"
}