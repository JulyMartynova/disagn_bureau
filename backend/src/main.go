package main

import (
	"fmt"
	"io/ioutil"
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/schema"
)

// Определение структуры Project
type Project struct {
	gorm.Model
	ID          uint   `gorm:"primaryKey"`
	Name        string `gorm:"not null"`
	Description string `gorm:"not null"`
	Image       []byte `gorm:"not null"`
}

func main() {
	// Строка подключения к базе данных
	dsn := "host=localhost user=myuser password=mypassword dbname=test port=5432 sslmode=disable TimeZone=UTC"

	// Подключение к базе данных с использованием GORM
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
		NamingStrategy: schema.NamingStrategy{
			TablePrefix:   "public.", // Указываем схему (если нужно)
			SingularTable: false,     // Используем единственное число для имен таблиц
		},
	})
	if err != nil {
		log.Fatalf("Ошибка подключения к базе данных: %v", err)
	}

	// Чтение файла изображения
	filePath := "rover.png"
	imageData, err := ioutil.ReadFile(filePath)
	if err != nil {
		log.Fatalf("Ошибка чтения файла: %v", err)
	}

	// Создание нового проекта
	newProject := Project{
		Name:        "Новый проект", // Укажите имя проекта
		Description: "Описание нового проекта", // Укажите описание проекта
		Image:       imageData,
	}

	// Вставка нового проекта в базу данных
	result := db.Create(&newProject)
	if result.Error != nil {
		log.Fatalf("Ошибка создания проекта: %v", result.Error)
	}

	fmt.Printf("Проект успешно добавлен с ID: %d\n", newProject.ID)
}