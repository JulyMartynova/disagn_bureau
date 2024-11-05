package routes

import (
	"controllers"

	"github.com/gin-gonic/gin"
)

func SetupRouter(route *gin.Engine) {
	public := route.Group("/projects")
	public.GET("/", controllers.GetAllProjectsController)
	public.GET("/:id", controllers.GetProjectByIDController)
	public.DELETE("/:id/delete", controllers.DeleteProject)
	public.POST("/create", controllers.CreateProjectController)
}
