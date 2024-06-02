package entity

import (
	"time"

	"github.com/jinzhu/gorm"
)

type User struct {
	gorm.Model
	Name      string    `gorm:"type:varchar(100)"`
	Email     string    `gorm:"type:varchar(100)"`
	Password  string    `gorm:"type:varchar(100)"`
	UniqId    string    `gorm:"type:varchar(100)"`
	Phone     string    `gorm:"type:varchar(100)"`
	Gender    string    `gorm:"type:varchar(100)"`
	Role      string    `gorm:"type:varchar(100)"`
	BirthDate time.Time `gorm:"type:date"`
}
