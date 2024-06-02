package entity

import (
	"github.com/jinzhu/gorm"
)

// No Resi
// Nama Penerima
// Alamat Penerima
// Ho HP Penerima
// Kota Tujuan
// Driver
// Kendaraan Driver
// Ho HP Driver
// Tanggal Pengiriman
// Update Status Pengiriman
// Actions
type Deliverystatus struct {
	gorm.Model
	NoResi           string `gorm:"type:varchar(100)"`
	AlamatPenerima   string `gorm:"type:varchar(100)"`
	NamaPenerima     string `gorm:"type:varchar(100)"`
	NoHPPenerima     string `gorm:"type:varchar(100)"`
	KotaTujuan       string `gorm:"type:varchar(100)"`
	NamaKurir        string `gorm:"type:varchar(100)"`
	KendaraanKurir   string `gorm:"type:varchar(100)"`
	NoHPKurir        string `gorm:"type:varchar(100)"`
	TanggalPembelian string `gorm:"type:varchar(100)"`
	TanggalSampai    string `gorm:"type:varchar(100)"`
	Status           string `gorm:"type:varchar(100)"`
}
