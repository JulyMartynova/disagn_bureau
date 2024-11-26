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
	ID          uint           `gorm:"primary_key"`
	name        string         `gorm:"notnull"`
	projectType ProjectType    `gorm:"notnull"`
	date        datatypes.Date `gorm:"notnull"`
	image       string
	
}
