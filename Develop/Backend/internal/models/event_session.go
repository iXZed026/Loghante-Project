package models

import "time"

type EventSession struct {
	SessionID uint `gorm:"column:sessionid;primaryKey"`
	EventID   uint `gorm:"column:eventid;not null"`

	StartAt   time.Time `gorm:"column:startat;not null"`
	DurationM int       `gorm:"column:durationm;not null"`
	Capacity  int       `gorm:"column:capacity;not null"`
	Price     *float64  `gorm:"column:price"`

	Event Event `gorm:"foreignKey:EventID"`
}

func (EventSession) TableName() string {
	return "eventsession"
}
