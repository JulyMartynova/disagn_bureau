# Используем официальный образ Node.js для сборки
FROM node:20-alpine AS builder

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и yarn.lock
COPY package.json yarn.lock ./

# Устанавливаем зависимости
RUN yarn install --frozen-lockfile

# Копируем исходный код
COPY . .

# Собираем приложение
RUN yarn build

# Используем базовый образ Node.js для запуска статического сервера
FROM node:18-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Устанавливаем serve для запуска статического сервера
RUN yarn global add serve

# Копируем собранные файлы из builder
COPY --from=builder /app/build ./build

# Открываем порт 3000
EXPOSE 3000

# Запускаем статический сервер
CMD ["serve", "-s", "build", "-l", "3000"]