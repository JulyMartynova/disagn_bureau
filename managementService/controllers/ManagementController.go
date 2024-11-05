package controllers

import (
	"net/http"
	"shared/initializers"
	"shared/models"

	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
)

func GetAllManagers(c *gin.Context) {
	var managers []models.Managers
	if err := initializers.DB.Find(&manager); err != nil {
		logrus.WithFields(logrus.Fields{
			"error": err.Error(),
		}).Error("Failed to get managers")
		c.JSON(http.StatusInternalServerError, gin.H{"err": err.Error()})
		return
	}
	c.JSON(http.StatusOK, managers)
}
