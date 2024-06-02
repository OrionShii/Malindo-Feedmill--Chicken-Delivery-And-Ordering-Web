package db

import (
	"fmt"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)

func InitDB() *gorm.DB {
	// Connect to the SQLite database
	db, err := gorm.Open("sqlite3", "test.db")
	if err != nil {
		fmt.Println(err.Error())
		panic("Failed to connect to database")
	}
	err = db.DB().Ping()
	if err != nil {
		panic("Failed to ping to the database")
	}
	return db
}
