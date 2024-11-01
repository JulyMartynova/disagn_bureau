package routes

import (
	"controllers"

	"github.com/gin-gonic/gin"
)

func SetupRouter(route *gin.Engine) {
	public := route.Group("/projects")
	public.GET("/projects", controllers.GetAllProjectsController)
	public.GET("projects/:id", controllers.GetProjectByIDController)
	public.DELETE("projects/:id/delete", controllers.DeleteProject)
	public.POST("/projects/create", controllers.CreateProjectController)
}
