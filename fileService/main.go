package fileService

import (
	"fileService/controllers"
	"fileService/routes"
	"shared/initializers"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
	"net/http"
	"time"
)

func init(){
	initializers.connectToDB()
	initializers.loadEnvVariables()
	initializers.migrateDatabase()
}

func main() {

	router := gin.Default()

	routes.SetupRouter(r)

	logrus.Info("Starting management service")

	certFile := ""

	keyFile := ""

	if err := router.RunTSL(":443", certFile, keyFile); err != nil {
		logrus.Fatal("Failed to start project service", err)
		panic(err)
	}
}