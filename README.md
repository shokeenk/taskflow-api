# Full Stack Task Management API

A **full-stack task management application** demonstrating a modern backend API with secure authentication and a React frontend.

Users can **register, log in, and manage their own tasks**, while admins have additional privileges such as viewing and managing all tasks.

This project demonstrates **RESTful API design, authentication, validation, error handling, and frontend integration**.

---

# Tech Stack

## Backend

* **Node.js**
* **Express.js**
* **MongoDB** with **Mongoose**
* **JWT Authentication**
* **Role-Based Access Control** (`USER`, `ADMIN`)
* **bcryptjs** for password hashing
* **express-validator** for request validation
* **Swagger (swagger-ui-express + swagger-jsdoc)** for API documentation
* **Centralized Error Handling**

## Frontend

* **React (Vite)**
* **React Router DOM**
* **Axios** for API requests
* Simple **responsive UI** for authentication and task CRUD operations

# Setup Instructions

##  Backend Setup

Install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file inside **backend/**:

```
MONGO_URI=mongodb://127.0.0.1:27017/full_stack_api
JWT_SECRET=your_secret_key
PORT=5000
```

Run the backend:

```bash
npm run dev
```

Backend will run on:

```
http://localhost:5000
```

---

## 2️⃣ Swagger API Documentation

Once the backend is running, open:

```
http://localhost:5000/api-docs
```

Swagger UI allows you to **view and test all endpoints**.

---

## 3️⃣ Frontend Setup

Install dependencies:

```bash
cd frontend
npm install
```

Run the frontend:

```bash
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

---

# Authentication Flow

1. User registers via **Register page**
2. User logs in via **Login page**
3. Backend returns a **JWT token**
4. Token is stored in **localStorage**
5. All protected API calls include:

```
Authorization: Bearer <token>
```

---

# API Endpoints

All APIs are versioned under:

```
/api/v1
```

---

## Authentication

### Register User

```
POST /api/v1/auth/register
```

Body:

```json
{
  "name": "Kunal",
  "email": "kunal@example.com",
  "password": "123456"
}
```

---

### Login User

```
POST /api/v1/auth/login
```

Body:

```json
{
  "email": "kunal@example.com",
  "password": "123456"
}
```

Response:

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "...",
      "name": "Kunal",
      "email": "kunal@example.com",
      "role": "USER"
    },
    "token": "JWT_TOKEN"
  }
}
```

---

# Task APIs (Protected)

Authorization header required:

```
Authorization: Bearer <token>
```

---

### Get Tasks

```
GET /api/v1/tasks
```

* USER → returns own tasks
* ADMIN → returns all tasks

---

### Create Task

```
POST /api/v1/tasks
```

Body:

```json
{
  "title": "Build Backend",
  "description": "Finish API assignment",
  "status": "pending"
}
```

---

### Update Task

```
PUT /api/v1/tasks/:id
```

---

### Delete Task

```
DELETE /api/v1/tasks/:id
```

---

# Error Response Format

All errors follow a consistent structure:

```json
{
  "success": false,
  "message": "Error description",
  "data": {}
}
```
**Kunal Shokeen**

Backend Developer | Full Stack Enthusiast

---
