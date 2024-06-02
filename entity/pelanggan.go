package entity

import "github.com/jinzhu/gorm"

type Pelanggan struct {
	gorm.Model
	Nama    string `gorm:"type:varchar(100)"`
	Email   string `gorm:"type:varchar(100)"`
	Phone   string `gorm:"type:varchar(100)"`
	Address string `gorm:"type:varchar(100)"`
	UserId  int    `gorm:"type:int(100)"`
}
