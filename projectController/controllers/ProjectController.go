package controllers

import ( 
	"disagn_bureau/shared/initializers"
	"disagn_bureau/shared/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
)
type ProjectInput struct {
	Name     string             `json:"project_name" binding:"required"`
	Type     models.ProjectType `json:"project_type" binding:"required"`
	
}

// only for admins
// func CreateProject(c *gin.Context) {
// 	var input ProjectInput

// 	if err := c.Bind(&input); err != nil {
// 		logrus.WithFields(logrus.Fields{
// 			"error": err.Error(),
// 		}).Error("Failed to bind")
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	imagePath := ""
// 	if input.Image != nil {
// 		imagePath = filepath.Join("uploads", input.Image.Filename)
// 		if err := c.SaveUploadedFile(input.Image, imagePath); err != nil {
// 			logrus.WithFields(logrus.Fields{
// 				"error": err.Error(),
// 			}).Error("Failed to save image")
// 			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
// 			return
// 		}
// 	}
// 	date := datatypes.Date(time.Now())

// 	projectRequest := models.Project{
// 		name:        input.Name,
// 		projectType: input.Type,
// 		date:        date,
// 		image: input.Image,
// 	}

// 	if err := initializers.DB.Create(&projectRequest); err != nil {
// 		logrus.WithFields(logrus.Fields{
// 			"error": err.Error(),
// 		}).Error("Failed to create project request")
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
// 		return
// 	}

// 	logrus.WithFields(logrus.Fields{
// 		"project_name": input.Name,
// 		"project_type": input.Type,
// 		"date":         date,
// 	}).Info("Project is created successfully")

// 	c.JSON(http.StatusOK, projectRequest)

// }
// func DeleteProject(c *gin.Context) {
// 	project, _ := c.Get("project")

// 	initializers.DB.Delete(&project)

// 	logrus.Info(
// 		"Project is deleted successfully")

// 	c.JSON(http.StatusOK, gin.H{"data": true})
// }


// func GetCompletedProjectsController(c *gin.Context) {
// 	var projects []models.Project
// 	if err := initializers.DB.Where("project_type = ", models.projectModel.ProjectType.Completed).Find(&projects); err != nil {
// 		logrus.WithFields(logrus.Fields{
// 			"err": err.Error(),
// 		}).Error("Failed to retrieve completed projects")
// 		c.JSON(http.StatusInternalServerError, gin.H{err: err.Error()})
// 	}

// 	c.JSON(http.StatusOK, projects)
// }

// func GetInitialProjectsController(c *gin.Context) {
// 	var projects []models.Project
// 	if err := initializers.DB.Where("project_type = ", models.projectModel.ProjectType.Initial); err != nil {}.Find(&projects); err != nil {
// 		logrus.WithFields(logrus.Fields{
// 			"err": err.Error(),
// 		}).Error("Failed to retrieve initial projects")
// 		c.JSON(http.StatusInternalServerError, gin.H{err: err.Error()})
// 	}

// 	c.JSON(http.StatusOK, projects)
// }

// func GetFutureProjectsController(c *gin.Context) {
// 	var projects []models.Project
// 	if err := initializers.DB.Where("project_type = ?", models.projectModel.ProjectType.Future).Find(&projects); err != nil {
// 		logrus.WithFields(logrus.Fields{
// 			"err": err.Error(),
// 		}).Error("Failed to retrieve future projects")
// 		c.JSON(http.StatusInternalServerError, gin.H{err: err.Error()})
// 	}

// 	c.JSON(http.StatusOK, projects)
// }

func GetProjectByIDController(c *gin.Context) {
	var project models.Project
	projectID := c.Param("id")

	if err := initializers.DB.Where("id = ?", projectID).First(&project).Error; err != nil {
		logrus.WithFields(logrus.Fields{
			"project_id": projectID,
			"err":        err.Error(),
		}).Error("Project is not found")
		c.JSON(http.StatusNotFound, gin.H{"error": "Project not found"})
		return
	}

	c.JSON(http.StatusOK, project)
}

func GetAllProjectsController(c *gin.Context) {
	var projects []models.Project
	if err := initializers.DB.Find(&projects).Error; err != nil {
		logrus.WithFields(logrus.Fields{
			"err": err.Error(),
		}).Error("Failed to fetch projects")
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch projects"})
		return
	}

	c.JSON(http.StatusOK, projects)
}
