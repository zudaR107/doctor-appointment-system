# Auth Service

## Описание
Этот микросервис отвечает за аутентификацию и авторизацию пользователей.  
Он поддерживает регистрацию, вход в систему и защиту API с использованием JWT.

## Запуск сервиса

1. Установите зависимости:
    ```bash
    npm install
    ```
2. Запустите сервер: 
    ```bash
    npm run dev
    ```
   Сервер будет доступен по адресу:
   `http://localhost:5001`

## Swagger API
Документация API доступна после запуска сервиса:  
`http://localhost:5001/api-docs`

## Файлы микросервиса
### Структура проекта
```bash
auth-service/
├── node_modules/       # Установленные зависимости
├── src/                # Исходный код сервиса
│   ├── config/         # Конфигурация (БД, Swagger)
│   │   ├── db.ts       # Подключение к PostgreSQL (TypeORM)
│   │   ├── swagger.ts  # Настройка Swagger-документации
│   ├── services/       # Основная бизнес-логика сервиса
│   │   ├── auth.controller.ts  # Контроллер (обработка HTTP-запросов)
│   │   ├── auth.entity.ts      # Модель пользователя (TypeORM)
│   │   ├── auth.routes.ts      # Определение API-маршрутов
│   │   ├── auth.service.ts     # Реализация аутентификации (регистрация, логин)
│   ├── index.ts        # Точка входа сервера (Express.js)
├── .env                # Переменные окружения
├── .gitignore          # Исключает файлы node_modules, .env и dist/
├── package.json        # Конфигурация npm-зависимостей
├── package-lock.json   # Список установленных зависимостей
├── tsconfig.json       # Конфигурация TypeScript
├── README.md           # Документация сервиса
```

### Описание файлов
- `src/index.ts` – точка входа сервиса, создаёт Express-сервер и подключает маршруты.
- `src/config/db.ts` – конфигурация подключения к PostgreSQL через TypeORM.
- `src/config/swagger.ts` – настройка Swagger-документации.
- `src/services/auth.controller.ts` – контроллер обработки запросов (регистрация, логин).
- `src/services/auth.entity.ts` – модель пользователя (TypeORM).
- `src/services/auth.routes.ts` – маршруты API (регистрация, логин).
- `src/services/auth.service.ts` – бизнес-логика сервиса (хеширование паролей, генерация JWT).
- `.env` – переменные окружения (не коммитится).
- `package.json` – список зависимостей и скрипты для запуска.
- `tsconfig.json` – конфигурация TypeScript.
