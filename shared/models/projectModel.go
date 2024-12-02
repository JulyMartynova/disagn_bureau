package models

import (
	"gorm.io/datatypes"
	"gorm.io/gorm"
)

type ProjectType string

const (
	Future    ProjectType = "Будущий"
	Initial   ProjectType = "Текущий"
	Completed ProjectType = "Завершенный"
)

type Project struct {
	gorm.Model
	ID          uint           `gorm:"primaryKey"`
	Name        string         `gorm:"notnull"`
	ProjectType ProjectType    `gorm:"notnull"`
	Date        datatypes.Date `gorm:"notnull"`
	Image       string
	
}
