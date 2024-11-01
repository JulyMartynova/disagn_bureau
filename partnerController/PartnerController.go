package partnercontroller
import (
	"net/http"
	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
	"models"
)
func getAllPartnersController(c *gin.Context){
	var partners [] models.Partner
	if err := initalizers.DB.Find(&partners).Error; err!=nil {
		logrus.WithFields(logrus.Fields{
			"err": err.Error(),
		}).Error("Failed to find parner")
		c.JSON(http.StatusInternalServerError, gin.H{"err": err.Error()})
		return
	}
	c.JSON(http.StatusOK, partners)
}
func getPartnerByIDController(c *gin.Context){
	var partner models.Partner
	partner, _ := c.Get("partner")
	if err := initializers.DB.Where("id = ? AND partner_id = ?", c.Param("id")).Find(&partner); err != nil {
		logrus.WithFields(logrus.Fields{
			"partner_id": c.Param("id"),
			"err": err.Error(),
		}).Error("Partner is not found")
		c.JSON(http.StatusNotFound,gin.H{"err": err.Error()})
	}
	logrus.WithFields(logrus.Fields{
		"partner_id" : c.Param("id"),
		"partner_name" : partner.Name,
	}).Info("Fetched partner successfuly")
	c.JSON(http.StatusOK, partner)
}
