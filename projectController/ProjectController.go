package projectController
import (
	"net/http"
	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
	"models"
	"shared/initializers"
)


func getAllProjectsController(c *gin.Context) {
	var projects [] models.Project
	if err := initializers.DB.Find(&projects).Error; err != nil {
		logrus.WithFields(logrus.Fields{
			"err" : err.Error(),
		}).Error("Projects are not found")
		c.JSON(http.StatusInternalServerError, gin.H{err: err.Error()})
	}

	c.JSON(http.StatusOK, projects)

}
func getCompletedProjectsController(c *gin.Context) {
	var projects [] models.Project
	if err := initializers.DB.Where("project_type = ", models.ProjectType.Completed).Find(&projects); err != nil {
		logrus.WithFields(logrus.Fields {
			"err" : err.Error(),
		}).Error("Failed to retrieve completed projects")
		c.JSON(http.StatusInternalServerError, gin.H{err: err.Error()})
	}

	c.JSON(http.StatusOK, projects)
}

func getInitialProjectsController(c *gin.Context) {
	var projects [] models.Project
	if err := initializers.DB.Where("project_type = ", models.ProjectType.Initial).Find(&projects); err != nil {
		logrus.WithFields(logrus.Fields {
			"err" : err.Error(),
		}).Error("Failed to retrieve initial projects")
		c.JSON(http.StatusInternalServerError, gin.H{err: err.Error()})
	}

	c.JSON(http.StatusOK, projects)
}

func getFutureProjectsController(c *gin.Context) {
	var projects [] models.Project
	if err := initializers.DB.Where("project_type = ?", models.ProjectType.Future).Find(&projects); err != nil {
		logrus.WithFields(logrus.Fields {
			"err" : err.Error(),
		}).Error("Failed to retrieve future projects")
		c.JSON(http.StatusInternalServerError, gin.H{err: err.Error()})
	}

	c.JSON(http.StatusOK, projects)
}

func getProjectByIDController(c *gin.Context) {
	var project models.Project
	project, _ = c.Get("project")

	if err := initializers.DB.Where("id = ?", project.ID).Find(&project).Error; err != nil {
		logrus.WithFields(logrus.Fields{
			"project_id": project.ID,
			"err" : err.Error(),
		}).Error("Project is not found")
		c.JSON(http.StatusNotFound, gin.H{err: err.Error()})
	}

	c.JSON(http.StatusOK, project)
}