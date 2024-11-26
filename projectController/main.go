package main

import (
	"projectControllers/test"
	"disagn_bureau/shared/initializers"
	"projectControllers/routes"
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
			AllowOrigin: []string{"http:/localhost"}
			AllowMethods: []string{"GET", "POST", "DELETE"}
			AllowHeaders: []string{"Origin","ContentLength", "ContentType"}
		})

	)

	routes.Setup(r)
	logrus.Info("Starting project service")
	
	if err := r.Run(":8080"); err != nil {
		logrus.Fatal("error with service: ", err)
		panic(err)	
	}

	

}