package main

import (
	"disagn_bureau/projectController/routes"
	"disagn_bureau/shared/initializers"
	"net/http"

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

// Middleware для проверки Origin
func checkOrigin() gin.HandlerFunc {
	return func(c *gin.Context) {
		allowedOrigin := "https://dbbp.ru"
		origin := c.Request.Header.Get("Origin")

		if origin != allowedOrigin {
			c.AbortWithStatusJSON(http.StatusForbidden, gin.H{
				"error": "Access denied",
			})
			return
		}

		c.Next()
	}
}

func main() {
	r := gin.Default()

	// Настройка CORS
	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{"https://dbbp.ru"},
		AllowMethods: []string{"GET", "POST", "DELETE"},
		AllowHeaders: []string{"Origin", "ContentLength", "ContentType"},
	}))

	// Применение middleware для проверки Origin
	r.Use(checkOrigin())

	routes.SetupRouter(r)
	logrus.Info("Starting project service")

	if err := r.Run(":8083"); err != nil {
		logrus.Fatal("error with service: ", err)
		panic(err)
	}
}