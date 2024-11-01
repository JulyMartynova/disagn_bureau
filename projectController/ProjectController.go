package projectController

import (
	"models"
	"net/http"
	"shared/initializers"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
	"gorm.io/datatypes"
)

type ProjectInput struct {
	Name     string             `json:"project_name" binding:"required"`
	Type     models.ProjectType `json:"project_type" binding:"required"`
	Partners []string           `json:"partners" binding:"required"`
}

// only for admins
func CreateProject(c *gin.Context) {
	var input ProjectInput

	if err := c.Bind(&input); err != nil {
		logrus.WithFields(logrus.Fields{
			"error": err.Error(),
		}).Error("Failed to bind")
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	date := datatypes.Date(time.Now())

	var partners []models.Partner
	for _, p := range input.Partners {
		var partner models.Partner
		if err := initializers.DB.Where("name=?", p).Find(&partner); err != nil {
			logrus.WithFields(logrus.Fields{
				"error": err.Error(),
			}).Error("Failed to find partner")
			c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
			return
		}
		partners.append(partner)
	}
	projectRequest := models.Project{
		name:        input.Name,
		projectType: input.Type,
		partners:    partners,
		date:        date,
	}

	if err := initializers.DB.Create(&projectRequest); err != nil {
		logrus.WithFields(logrus.Fields{
			"error": err.Error(),
		}).Error("Failed to create project request")
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	logrus.WithFields(logrus.Fields{
		"project_name": input.Name,
		"project_type": input.Type,
		"partners":     partners,
		"date":         date,
	}).Info("Project is created successfully")

	c.JSON(http.StatusOK, projectRequest)

}
func DeleteProject(c *gin.Context) {
	project, _ := c.Get("project")

	initializers.DB.Delete(&project)

	logrus.Info(
		"Project is deleted successfully")

	c.JSON(http.StatusOK, gin.H{"data": true})
}

// func UpdateProject(c *gin.Context) {

// }

func getAllProjectsController(c *gin.Context) {
	var projects []models.Project
	if err := initializers.DB.Find(&projects).Error; err != nil {
		logrus.WithFields(logrus.Fields{
			"err": err.Error(),
		}).Error("Projects are not found")
		c.JSON(http.StatusInternalServerError, gin.H{err: err.Error()})
	}
	c.JSON(http.StatusOK, projects)
}
func getCompletedProjectsController(c *gin.Context) {
	var projects []models.Project
	if err := initializers.DB.Where("project_type = ", models.projectType.Completed).Find(&projects); err != nil {
		logrus.WithFields(logrus.Fields{
			"err": err.Error(),
		}).Error("Failed to retrieve completed projects")
		c.JSON(http.StatusInternalServerError, gin.H{err: err.Error()})
	}

	c.JSON(http.StatusOK, projects)
}

func getInitialProjectsController(c *gin.Context) {
	var projects []models.Project
	if err := initializers.DB.Where("project_type = ", models.projectType.Initial).Find(&projects); err != nil {
		logrus.WithFields(logrus.Fields{
			"err": err.Error(),
		}).Error("Failed to retrieve initial projects")
		c.JSON(http.StatusInternalServerError, gin.H{err: err.Error()})
	}

	c.JSON(http.StatusOK, projects)
}

func getFutureProjectsController(c *gin.Context) {
	var projects []models.Project
	if err := initializers.DB.Where("project_type = ?", models.projectType.Future).Find(&projects); err != nil {
		logrus.WithFields(logrus.Fields{
			"err": err.Error(),
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
			"err":        err.Error(),
		}).Error("Project is not found")
		c.JSON(http.StatusNotFound, gin.H{err: err.Error()})
	}
	c.JSON(http.StatusOK, project)
}
