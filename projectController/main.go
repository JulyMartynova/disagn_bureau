package main

import (
	"disagn_bureau/projectController/routes"
	"disagn_bureau/shared/initializers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDB()
	initializers.MigrateModels()
}

func main() {

	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:8000"},
		AllowMethods: []string{"GET", "POST", "DELETE"},
		AllowHeaders: []string{"Origin", "ContentLength", "ContentType"},
	}))

	routes.SetupRouter(r)
	logrus.Info("Starting project service")

	if err := r.Run(":8081"); err != nil {
		logrus.Fatal("error with service: ", err)
		panic(err)
	}

}
