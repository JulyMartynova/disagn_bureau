package models
import (
  "gorm.io/datatypes"
  "gorm.io/gorm"
)

type Software struct {
  ID uint gorm:"primary_key"
  project_id uint gorm:"notnull;index"
  project Project gorm:"foreign_key:project_id" 
  link string gorm:"notnull"
}