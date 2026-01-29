# API Routes Documentation

## Base URL
- Local: `http://localhost:5000`
- Production: `https://your-backend-url.onrender.com`

## Available Routes

### Root & Health Check

#### GET `/`
Test if server is running
```json
{
  "message": "Backend is live!",
  "status": "OK",
  "endpoints": { ... }
}
```

#### GET `/api/health`
Health check endpoint
```json
{
  "status": "OK",
  "message": "Server is running",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "environment": "production"
}
```

---

### Authentication Routes

#### POST `/api/auth/register`
Register a new user

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### POST `/api/auth/login`
Login user

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

### Tasks Routes (Protected - Requires JWT Token)

**All task routes require authentication header:**
```
Authorization: Bearer <token>
```

#### GET `/api/tasks`
Get all tasks for authenticated user

**Response (200):**
```json
[
  {
    "_id": "task_id",
    "title": "Task title",
    "description": "Task description",
    "status": "pending",
    "user": "user_id",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### GET `/api/tasks/:id`
Get single task by ID

**Response (200):**
```json
{
  "_id": "task_id",
  "title": "Task title",
  "description": "Task description",
  "status": "pending",
  "user": "user_id",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### POST `/api/tasks`
Create new task

**Request Body:**
```json
{
  "title": "New Task",
  "description": "Task description",
  "status": "pending"
}
```

**Response (201):**
```json
{
  "_id": "task_id",
  "title": "New Task",
  "description": "Task description",
  "status": "pending",
  "user": "user_id",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### PUT `/api/tasks/:id`
Update task

**Request Body:**
```json
{
  "title": "Updated Task",
  "description": "Updated description",
  "status": "in-progress"
}
```

**Response (200):**
```json
{
  "_id": "task_id",
  "title": "Updated Task",
  "description": "Updated description",
  "status": "in-progress",
  "user": "user_id",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

#### DELETE `/api/tasks/:id`
Delete task

**Response (200):**
```json
{
  "message": "Task deleted successfully"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "errors": [
    {
      "msg": "Email is required",
      "param": "email"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "message": "Authentication required"
}
```

### 404 Not Found
```json
{
  "message": "Route not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Internal Server Error"
}
```

---

## Testing with cURL

### Test Root Route
```bash
curl https://your-backend-url.onrender.com/
```

### Test Health Check
```bash
curl https://your-backend-url.onrender.com/api/health
```

### Register User
```bash
curl -X POST https://your-backend-url.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

### Login
```bash
curl -X POST https://your-backend-url.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

### Get Tasks (with token)
```bash
curl https://your-backend-url.onrender.com/api/tasks \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```
