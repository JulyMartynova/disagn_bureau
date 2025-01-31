package initializers

import (
	"log"

	"github.com/sirupsen/logrus"

	"github.com/joho/godotenv"
)

func LoadEnvVariables() {
	err := godotenv.Load("./config/.env")
	if err != nil {
		log.Fatal("Error loading environment variables")
	}
	logrus.Info("Loaded environment variables successfully")
}
