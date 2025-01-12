package routes

import (
	"disagn_bureau/supportService/controllers"

	"github.com/gin-gonic/gin"
)

func SetupRouter(route *gin.Engine) {
	route.GET("/support", controllers.GetProjectsController)
	route.GET("/support/:id", controllers.GetDocumentationAndSoftwareByProjectID)
	route.GET("/download/documentation/:id", controllers.DownloadDocumentationController)
	route.GET("/download/software/:id", controllers.DownloadSoftwareController)
}
