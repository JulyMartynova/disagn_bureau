package models
import (
	"gorm.io/gorm"
)

type Software struct {
	gorm.Model
	ID uint `gorm:"primaryKey"`
	Url string `gorm:"notnull"`
	ProjectID uint `gorm:"notnull"`
	Project Project `gorm:"foreignKey:ProjectID"`
}