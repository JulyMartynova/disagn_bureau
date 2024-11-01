package initializers

import (
	"github.com/sirupsen/logrus"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"os"
)

var DB *gorm.DB

func connectToDB() {
	var err error
	url := os.Getenv("DB") 
	DB, err = gorm.Open(postgres.Open(url), &gorm.Config{})

	if err != nil {
		panic("Failed to connect to database")
	}

	logrus.Info("Connected to database")
}