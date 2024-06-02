package entity

import (
	"github.com/jinzhu/gorm"
)

type Package struct {
	gorm.Model
	PackageName      string `gorm:"type:varchar(100)"`
	CustomerName     string `gorm:"type:varchar(100)"`
	CustomerAddress  string `gorm:"type:varchar(100)"`
	KotaTujuan       string `gorm:"type:varchar(100)"`
	TotalYangDibeli  int    `gorm:"type:int(100)"`
	TotalHarga       int    `gorm:"type:int(100)"`
	TanggalPembelian string `gorm:"type:varchar(100)"`
	Status           string `gorm:"type:varchar(100)"`
}
