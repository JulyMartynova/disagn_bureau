package controllers

import (
	"disagn_bureau/shared/initializers"
	"disagn_bureau/shared/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
)

func GetDocumentationAndSoftwareByProjectID(c *gin.Context) {
	id := c.Param("id")

	var project models.Project
	if err := initializers.DB.Where("id = ?", id).First(&project).Error; err != nil {
		logrus.WithFields(logrus.Fields{
			"project_id": id,
			"error":      err.Error(),
		}).Error("Project not found")
		c.JSON(http.StatusNotFound, gin.H{"error": "Project not found"})
		return
	}

	var documentation models.Document
	if err := initializers.DB.Where("project_id = ?", id).First(&documentation).Error; err != nil {
		logrus.WithFields(logrus.Fields{
			"project_id": id,
			"error":      err.Error(),
		}).Error("Documentation not found")
		c.JSON(http.StatusNotFound, gin.H{"error": "Documentation not found"})
		return
	}

	var software models.Software
	if err := initializers.DB.Where("project_id = ?", id).First(&software).Error; err != nil {
		logrus.WithFields(logrus.Fields{
			"project_id": id,
			"error":      err.Error(),
		}).Error("Software not found")
		c.JSON(http.StatusNotFound, gin.H{"error": "Software not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"documentation": documentation,
		"software":      software,
	})
}

// func DownloadDocumentationController(c *gin.Context) {
// 	docID := c.Param("id")

// 	var document models.Document

// 	if err := initializers.DB.Where("id = ?", docID).Find(&document); err != nil {
// 		logrus.WithFields(logrus.Fields{
// 			"error": err.Error(),
// 		}).Error("Documentation not found")
// 		c.JSON(http.StatusNotFound, gin.H{
// 			"error": "Documentation not found",
// 		})
// 		return
// 	}
// 	if err != nil {
// 		logrus.WithFields(logrus.Fields{
// 			"error": err.Error(),
// 		}).Error("Failed to download file")
// 		c.JSON(http.StatusInternalServerError, gin.H{
// 			"error": "Failed to download file",
// 		})
// 		return
// 	}
// 	defer resp.Body.Close()
// 	c.Header("Content-Description", "File Transfer")
// 	c.Header("Content-Transfer-Encoding", "binary")
// 	c.Header("Content-Disposition", "attachment; filename="+document.Filename)
// 	c.Header("Content-Type", "application/octet-stream")
// 	c.DataFromReader(http.StatusOK, resp.ContentLength, resp.Header.Get("Content-Type"), resp.Body, nil)

// }
