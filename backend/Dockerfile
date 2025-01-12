# Используем официальный образ Go
FROM golang:1.20-alpine AS builder

# Устанавливаем рабочую директорию
WORKDIR /app

COPY projectController/config ./projectController/

# Копируем .env в supportService
#COPY supportService/config ./supportService/

# Копируем go.mod и go.sum для установки зависимостей
COPY shared/go.mod shared/go.sum ./shared/
COPY projectController/go.mod projectController/go.sum ./projectController/
COPY supportService/go.mod supportService/go.sum ./supportService/

# Устанавливаем зависимости
RUN cd shared && go mod download
RUN cd projectController && go mod download
RUN cd supportService && go mod download

# Копируем исходный код
COPY . .

# Собираем projectController
RUN cd projectController && go build -o project-controller .

# Собираем supportService
RUN cd supportService && go build -o support-service .

# Используем минимальный образ для финального контейнера
FROM alpine:latest

RUN apk add --no-cache supervisor
# Копируем собранные бинарники
COPY --from=builder /app/projectController/project-controller /project-controller
COPY --from=builder /app/supportService/support-service /support-service

COPY supervisord.conf /etc/supervisord.conf
# Указываем команду для запуска (по умолчанию запускаем projectController)
CMD ["supervisord", "-c", "/etc/supervisord.conf"]