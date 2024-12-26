package initializers

import (
	"disagn_bureau/shared/models"

	"github.com/sirupsen/logrus"
)

func MigrateModels() {
	if !DB.Migrator().HasTable(&models.Project{}) {
		if err := DB.AutoMigrate(&models.Project{}); err != nil {
				logrus.WithError(err).Error("Database migration for projects failed", err)
				return
			}else {
				logrus.Infof("Database migration for project")
			}
	}
	logrus.Infof("Database migration is completed")
	
	if !DB.Migrator().HasTable(&models.Document{}) {
		if err := DB.AutoMigrate(&models.Document{}); err != nil {
				logrus.WithError(err).Error("Database migration for documents failed", err)
				return
			}else {
				logrus.Infof("Database migration for documents")
			}
	}
	logrus.Infof("Database migration is completed")

	if !DB.Migrator().HasTable(&models.Software{}) {
		if err := DB.AutoMigrate(&models.Software{}); err != nil  {
			logrus.WithError(err).Error("Database migration for softwares failed", err)
		} else {
			logrus.Infof("Database migration for softwares")
		}
	}
	logrus.Infof("Database migration is completed")
}
