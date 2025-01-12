package controllers

import (
	"disagn_bureau/shared/initializers"
	"disagn_bureau/shared/models"
	"net/http"
    "os"
    "strings"
	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"   
)

func GetProjectsController(c *gin.Context) {
	var projects [] models.Project

	if err := initializers.DB.Find(&projects).Error; err != nil {
		logrus.WithFields(logrus.Fields{
			"error": err.Error(),
		}).Error("Projects are not found")
		c.JSON(http.StatusNotFound, gin.H{"error" : "Projects are not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"projects": projects,
	})
}

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
            "ID": id,
            "error":      err.Error(),
        }).Error("Documentation not found")
        c.JSON(http.StatusNotFound, gin.H{"error": "Documentation not found"})
        return
    }

    var software models.Software
    if err := initializers.DB.Where("project_id = ?", id).First(&software).Error; err != nil {
        logrus.WithFields(logrus.Fields{
            "ID": id,
            "error":      err.Error(),
        }).Error("Software not found")
        c.JSON(http.StatusNotFound, gin.H{"error": "Software not found"})
        return
    }

    // Возвращаем JSON с ссылками на скачивание
    c.JSON(http.StatusOK, gin.H{
        "ID":                 project.ID,
        "documentation": documentation,
        "software" : software,
    })
}
func DownloadDocumentationController(c *gin.Context) {
    id := c.Param("id")

    var documentation models.Document
    if err := initializers.DB.Where("project_id = ?", id).First(&documentation).Error; err != nil {
        logrus.WithFields(logrus.Fields{
            "project_id": id,
            "error":      err.Error(),
        }).Error("Documentation not found")
        c.JSON(http.StatusNotFound, gin.H{"error": "Documentation not found"})
        return
    }

    // Обрабатываем filePath (заменяем ~ на абсолютный путь)
    filePath := strings.Replace(documentation.Url, "~", os.Getenv("HOME"), 1)

    // Проверяем, существует ли файл
    if _, err := os.Stat(filePath); os.IsNotExist(err) {
        logrus.WithFields(logrus.Fields{
            "file_path": filePath,
            "error":     err.Error(),
        }).Error("File not found")
        c.JSON(http.StatusNotFound, gin.H{"error": "File not found"})
        return
    }

    // Отправляем файл клиенту
    c.File(filePath)
}

// Скачать программное обеспечение
func DownloadSoftwareController(c *gin.Context) {
    id := c.Param("id")

    var software models.Software
    if err := initializers.DB.Where("project_id = ?", id).First(&software).Error; err != nil {
        logrus.WithFields(logrus.Fields{
            "project_id": id,
            "error":      err.Error(),
        }).Error("Software not found")
        c.JSON(http.StatusNotFound, gin.H{"error": "Software not found"})
        return
    }

    // Обрабатываем filePath (заменяем ~ на абсолютный путь)
    filePath := strings.Replace(software.Url, "~", os.Getenv("HOME"), 1)

    // Проверяем, существует ли файл
    if _, err := os.Stat(filePath); os.IsNotExist(err) {
        logrus.WithFields(logrus.Fields{
            "file_path": filePath,
            "error":     err.Error(),
        }).Error("File not found")
        c.JSON(http.StatusNotFound, gin.H{"error": "File not found"})
        return
    }

    // Отправляем файл клиенту
    c.File(filePath)
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
