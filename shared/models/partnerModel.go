package models

type Partner struct {
	ID   uint   `gorm:"primary_key"`
	name string `gorm:"notnull"`
}
