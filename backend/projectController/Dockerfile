# Используем официальный образ Go
FROM golang:1.19

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем go.mod и go.sum из текущей папки
COPY go.mod go.sum ./

# Скачиваем зависимости
RUN go mod download

# Копируем исходный код из текущей папки
COPY . .

# Собираем приложение
RUN go build -o main

# Указываем порт
EXPOSE 8081

# Запускаем приложение
CMD ["./main"]