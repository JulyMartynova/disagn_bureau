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
}
