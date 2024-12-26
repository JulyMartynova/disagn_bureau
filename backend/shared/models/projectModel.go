package models

import (
	"gorm.io/gorm"
)

// type ProjectType string

// const (
// 	Future    ProjectType = "Будущий"
// 	Initial   ProjectType = "Текущий"
// 	Completed ProjectType = "Завершенный"
// )

type Project struct {
	gorm.Model
	ID          uint   `gorm:"primaryKey"`
	Name        string `gorm:"notnull"`
	Description string `gorm:"notnull"`
	Image       []byte 
}
