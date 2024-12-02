package routes

import (
	"disagn_bureau/projectController/controllers"
	"github.com/gin-gonic/gin"
)

func SetupRouter(route *gin.Engine) {

		route.GET("/projects", controllers.GetAllProjectsController)
		route.GET("/projects/:id", controllers.GetProjectByIDController)
		// public.DELETE("/:id/delete", controllers.DeleteProject)
		// public.POST("/create", controllers.CreateProjectController)
}
