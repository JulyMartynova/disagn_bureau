package initializers

import (
	"disagn_bureau/shared/models"

	"github.com/sirupsen/logrus"
)

func migrateModels() {
	if !DB.HasTable(models.Project) {
		if err := DB.AutoMigrate(models.Project); err != nil {
			if err := DB.AutoMigrate(models.Project); err != nil {
				logrus.WithError(err).Error("Database migration for projects failed", err)
			} else {
				logrus.Infof("Database migration for project")
			}
		}
	}
	if !DB.HasTable(models.Partner) {
		if err := DB.AutoMigrate(models.Partner); err != nil {
			if err := DB.AutoMigrate(models.Partner); err != nil {
				logrus.WithError(err).Error("Database migration for partners failed", err)
			} else {
				logrus.Infof("Database migration for partner")
			}
		}
	}

	logrus.Infof("Database migration is completed")
}
