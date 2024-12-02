package main

import (
	"disagn_bureau/shared/initializers"
	"disagn_bureau/projectController/routes"
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"
	"github.com/sirupsen/logrus"
)

func init(){
	initializers.LoadEnvVariables()
	initializers.ConnectToDB()
	initializers.MigrateModels()
}

func main() {

	r := gin.Default()

	r.Use(cors.New(cors.Config{
			AllowOrigins: []string{"http://localhost"},
			AllowMethods: []string{"GET", "POST", "DELETE"},
			AllowHeaders: []string{"Origin","ContentLength", "ContentType"},
		}))

	routes.SetupRouter(r)
	logrus.Info("Starting project service")
	
	if err := r.Run(":8080"); err != nil {
		logrus.Fatal("error with service: ", err)
		panic(err)	
	}

	

}