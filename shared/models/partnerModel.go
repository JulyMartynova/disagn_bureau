package models
import (
	"gorm.io/datatypes"
	"gorm.io/gorm"
)
type Partner struct {
	partner_id uint `gorm:"primary_key"`
	partner_name string `gorm:"notnull"`
}
