package entity

import "github.com/jinzhu/gorm"

func Init(db *gorm.DB) {
	db.AutoMigrate(&User{})
	db.AutoMigrate(&Deliverystatus{})
	db.AutoMigrate(&Kendaraan{})
	db.AutoMigrate(&Driver{})
	db.AutoMigrate(&Pelanggan{})
	db.AutoMigrate(&Package{})
}
