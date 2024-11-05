package partnercontroller
import (
	"net/http"
	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
	"shared/models"
	"shared/initializers"
	"encoded/json"

)
type PartnerInput struct {
	Name string `json:"name" binding:"required"`
}

func CreatePartner(c *gin.Context) {
	var input PartnerInput

	if err := c.BindJSON(&input); err != nil {
		logrus.WithError(err).Error("Failed to bind partner")
		c.JSON(http.StatusBadRequest, gin.H{"err" : err.Error()})
		return
	}

	partner := models.Partner{
		name: input.Name,
	}

	if err := initializers.DB.Create(&partner); err != nil {
		logrus.WithFields(logrus.Fields{
			"partner_name" : input.Name,
			"err" : err.Error(),
		}).Error("Failed to create partner")
		c.JSON(http.StatusInternalServerError, gin.H{"err" : err.Error()})
		return
	}
	logrus.WithFields(logrus.Fields{
		"partner_name" : input.Name,
	}).Info("Created partner")

	c.JSON(http.StatusOK, partner)
}
func DeleteProject(c *gin.Context) {
	project, _ := c.Get("project")

	initializers.DB.Delete(&project)

	logrus.Info(
		"Project is deleted successfully")

	c.JSON(http.StatusOK, gin.H{"data": true})
}
func GetAllPartnersController(c *gin.Context){
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
func GetPartnerByIDController(c *gin.Context){
	var partner models.Partner
	partner, _ = c.Get("partner")
	if err := initializers.DB.Where("id = ?", c.Param("id")).Find(&partner); err != nil {
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
