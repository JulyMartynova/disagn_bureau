package controllers

import (
	"encoding/json"
	"io"
	"net/http"
	"shared/initializers"
	"shared/models"

	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"

	"projectController/controllers"
)
func GetProjectsController(c *gin.Context) {
	var projects[] models.Project

	if err := range initializers.DB.Find(&projects); err != nil {
		logrus.WithFields(
			logrus.Fields{
				"err" : err.Error(),
			}
		).Error("Error with finding")
		c.JSON(http.StatusNotFound, gin.H {"err" : err.Error()})
	}

	c.JSON(http.StatusOK, gin.H{
		"projects" : projects,
	})
}
func GetDocumentationAndSoftwareByProjectID(c *gin.Context) {
	id, _ := c.Param("id")

	var project models.Project
	if err := initializers.DB.Where("id = ?", id).First(&project); err != nil{
		logrus.WithFields(logrus.Fields{
			"project_id": id
			"error" : err.Error(),
		}).Error("Server error")
		c.JSON(http.StatusNotFound, gin.H{"error" : err.Error()})
		return
	}
	var documentation models.Documentation
	var software models.Software
	if err := initializers.DB.Where("project_id = ?", id).First(&documentation); err != nil{
		logrus.WithFields(logrus.Fields{
			"project_id": id
			"error" : err.Error(),
		}).Error("Documentation isn't found")
		c.JSON(http.StatusNotFound, gin.H{"error" : err.Error()})
		return
	}

	if err := initializers.DB.Where("project_id = ?", id).First(&software); err != nil{
		logrus.WithFields(logrus.Fields{
			"project_id": id
			"error" : err.Error(),
		}).Error("Server isn't found")
		c.JSON(http.StatusNotFound, gin.H{"error" : err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"documentation" : documentation,
		"software" : software,
	})

}
