package routes
import (
	"controllers"

	"github.com/gin-gonic/gin"
)

func SetupRouter(route *gin.Engine) {
	public := route.Group("/partners")

	public.GET("/", controllers.GetPartners)
	public.POST("/create", controllers.CreatePartners)
	public.DELETE("/:id/delete", controllers.DeletePartners)
	public.GET("/:id", controllers.GetParnerById)

}