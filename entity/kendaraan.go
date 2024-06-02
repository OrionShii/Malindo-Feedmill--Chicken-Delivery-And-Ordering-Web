package entity

import "github.com/jinzhu/gorm"

type Kendaraan struct {
	gorm.Model
	IdKendaraan string `gorm:"type:varchar(100)"`
	NoPlat      string `gorm:"type:varchar(100)"`
	Brand       string `gorm:"type:varchar(100)"`
	Kapasitas   string `gorm:"type:varchar(100)"`
}
