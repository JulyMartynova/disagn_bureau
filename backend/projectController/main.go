package main

import (
	"disagn_bureau/projectController/routes"
	"disagn_bureau/shared/initializers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
)

func init() {
	logrus.Info("Starting...")
	initializers.LoadEnvVariables()
	initializers.ConnectToDB()
	initializers.MigrateModels()
}

func main() {
	r := gin.Default()

	// Настройка CORS
	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{"GET", "POST", "DELETE"},
		AllowHeaders: []string{"Origin", "ContentLength", "ContentType"},
	}))

	// Применение middleware для проверки Origin

	routes.SetupRouter(r)
	logrus.Info("Starting project service")

	if err := r.Run(":8083"); err != nil {
		logrus.Fatal("error with service: ", err)
		panic(err)
	}
}
