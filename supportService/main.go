package main

import (
	"disagn_bureau/shared/initializers"
	"disagn_bureau/supportService/routes"

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
		AllowOrigins: []string{"https://dbbp.ru"},
		AllowMethods: []string{"GET"},
		AllowHeaders: []string{"Origin", "ContentLength", "ContentType", "Content-Disposition",
			"Content-Transfer-Encoding", "Content-Description"},
	}))

	routes.SetupRouter(r)

	logrus.Info("Starting support service")

	if err := r.Run(":8081"); err != nil {
		logrus.Fatal("error with service: ", err)
		panic(err)
	}

}
