package models
import (
	"gorm.io/datatypes"
	"gorm.io/gorm"
)
type ProjectType string
const (
	Future ProjectType = "Будущий"
	Initial ProjectType = "Текущий"
	Completed ProjectType = "Завершенный"

)
type Project struct {
	gorm.Model 
	Project_id uint `gorm:"primary_key"`
	Project_name string `gorm:"notnull"`
	Project_type ProjectType 
	Date datatypes.Date `gorm:"notnull"`
	Partner_id uint `gorm:"notnull; index"`
	Partner Partner `gorm:"foreignKey:Partner_id"`
}
