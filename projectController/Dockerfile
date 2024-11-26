FROM golang:1.22.2-alpine AS build

WORKDIR /app

COPY projecController/go.mod projecController/go.sum ./
COPY shared/go.mod shared/

RUN go mod tidy
RUN go mod download

COPY projectController/ .
COPY shared/ ./shared

RUN go build -o main

RUN chmod +x /app/main

EXPOSE 443

CMD ["./main"]



