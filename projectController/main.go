package main

import (
	"controllers"
	"shared/initializers"
	"routes"
)

func init(){
	initializers.loadEnvVariables()
	initializers.connectToDB()
	initializers.migrateDatabase()
}

func main() {

	r = gin.Default()

	r.Use(
		cors.New(cors.Config{
			AllowOrigin: []string{"https://dbbp.ru"}
			AllowMethods: []string{"GET", "POST", "DELETE"}
			AllowHeaders: []string{"Origin","ContentLength", "ContentType"}
		})

	)

	routes.Setup(r)
	logrus.Info("Starting project service")
	

}