# Doctor Appointment System - Backend

## Описание проекта
Этот проект представляет собой **бэкенд для системы записи к врачу**.  
Он построен на **микросервисной архитектуре** и использует **Node.js, TypeScript, PostgreSQL, Docker**.

## Технологии
- **Node.js** + **Express.js**
- **TypeScript**
- **PostgreSQL** + **TypeORM**
- **Docker** + **docker-compose**
- **Swagger (API-документация)**
- **JWT (JSON Web Tokens) для авторизации**
- **Nginx (для фронтенда)**

---

## Структура микросервисов

```
backend/
├── auth-service/        # Микросервис аутентификации и авторизации
├── user-service/        # Микросервис управления пользователями
├── appointment-service/ # Микросервис управления записями на приём
├── clinic-service/      # Микросервис управления клиниками и врачами
├── docker-compose.yml   # Конфигурация базы данных PostgreSQL
├── README.md            # Общая документация
```

---

## Микросервисы

### 1. **Auth Service (Аутентификация)**
**Порт:** `5001`  
**Swagger UI:** [http://localhost:5001/api-docs](http://localhost:5001/api-docs)  
**Описание:**  
Этот сервис управляет **регистрацией, входом в систему и авторизацией через JWT**.  
Он позволяет пользователям **создавать аккаунты, входить в систему и получать данные профиля**.

#### **Основные эндпоинты:**
- **`POST /api/auth/register`** – регистрация нового пользователя  
- **`POST /api/auth/login`** – вход в систему  
- **`GET /api/auth/me`** – получение информации о текущем пользователе  

---

## 2. User Service (Пользователи)
**Порт:** 5002  
**Swagger UI:** [http://localhost:5002/api-docs](http://localhost:5002/api-docs)  

### Описание
Этот сервис управляет пользователями системы (пациенты, врачи, администраторы).
Позволяет изменять профиль, управлять ролями и правами пользователей, а также получать список пользователей (для администраторов).

### Основные эндпоинты:
- **GET /api/users** – Получение списка пользователей (только администратор)
- **GET /api/users/:id** – Получение информации о пользователе (сам пользователь или администратор)
- **PUT /api/users/:id** – Обновление данных пользователя (сам пользователь или администратор)
- **DELETE /api/users/:id** – Удаление пользователя (сам пользователь или администратор)

---

### 3. **Appointment Service (Записи к врачу)**
**Порт:** `5003`  
**Swagger UI:** [http://localhost:5003/api-docs](http://localhost:5003/api-docs)  
**Описание:**  
Этот сервис управляет **записями на приём**, просмотром и изменением записей врачей и пациентов.

#### **Основные эндпоинты:**
- **`POST /api/appointments/book`** – Запись на приём  
- **`GET /api/appointments/:id`** – Получение информации о записи  
- **`PUT /api/appointments/:id`** – Изменение записи  
- **`DELETE /api/appointments/:id`** – Отмена записи  

---

### 4. **Clinic Service (Клиники и Врачи)**
**Порт:** `5004`  
**Swagger UI:** [http://localhost:5004/api-docs](http://localhost:5004/api-docs)  
**Описание:**  
Этот сервис управляет **клиниками, врачами и их расписанием**.

#### **Основные эндпоинты:**
- **`POST /api/clinics`** – Добавление новой клиники  
- **`GET /api/clinics/:id`** – Получение информации о клинике  
- **`POST /api/doctors`** – Регистрация врача  
- **`GET /api/doctors/:id`** – Получение информации о враче  

---

## Документация API
Каждый микросервис имеет свою документацию API, доступную через **Swagger UI**:
- **Auth Service:** [http://localhost:5001/api-docs](http://localhost:5001/api-docs)
- **User Service:** [http://localhost:5002/api-docs](http://localhost:5002/api-docs)
- **Appointment Service:** [http://localhost:5003/api-docs](http://localhost:5003/api-docs)
- **Clinic Service:** [http://localhost:5004/api-docs](http://localhost:5004/api-docs)

Для авторизованных эндпоинтов необходимо ввести **JWT-токен** в разделе `"Authorize"`.

---

## Переменные окружения `.env`
Каждый микросервис использует **свой файл `.env`**.  
Пример `.env` для **auth-service**:

```
PORT=5001
DB_HOST=localhost
DB_PORT=5432
DB_USER=admin
DB_PASSWORD=password
DB_NAME=doctor_db
JWT_SECRET=mysecretkey
```

Пример `.env` для **user-service**:

```
PORT=5002
DB_HOST=localhost
DB_PORT=5432
DB_USER=admin
DB_PASSWORD=password
DB_NAME=doctor_db
```
