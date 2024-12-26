# Используем официальный образ Go
FROM golang:1.19

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем go.work и go.mod из папок shared, projectController и supportService
COPY go.work ./
COPY shared/go.mod shared/go.sum ./shared/
COPY projectController/go.mod projectController/go.sum ./projectController/
COPY supportService/go.mod supportService/go.sum ./supportService/

# Скачиваем зависимости для всех модулей
RUN go work sync
RUN go mod download

# Копируем исходный код из папок shared, projectController и supportService
COPY shared ./shared
COPY projectController ./projectController
COPY supportService ./supportService

# Собираем приложение service1 (projectController)
WORKDIR /app/projectController
RUN go build -o service1

# Собираем приложение service2 (supportService)
WORKDIR /app/supportService
RUN go build -o service2

# Возвращаемся в корневую директорию
WORKDIR /app

# Указываем порты
EXPOSE 8081 8082

# Запускаем оба приложения
CMD ["./projectController/service1", "&", "./supportService/service2"]