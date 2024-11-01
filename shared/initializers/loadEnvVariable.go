package initializers
import (
	"log"
	"os"

	"github.com/sirupsen/logrus"

	"github.com/joho/godotenv"
)

func LoadEnvVariables(){
	err := godotenv.LoadEnv(".env")
	if err != nil {
		log.Fatal("Error loading environment variables")
	}
	logrus.Info("Loaded environment variables successfully")
}