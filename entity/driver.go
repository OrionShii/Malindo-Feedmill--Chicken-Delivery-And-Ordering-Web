package entity

import "github.com/jinzhu/gorm"

type Driver struct {
	gorm.Model
	DriverName     string `gorm:"type:varchar(100)"`
	DriverID       string `gorm:"type:varchar(100)"`
	DriverCarPlat  string `gorm:"type:varchar(100)"`
	DriverCarBrand string `gorm:"type:varchar(100)"`
	Capacity       int    `gorm:"type:int(100)"`
}
