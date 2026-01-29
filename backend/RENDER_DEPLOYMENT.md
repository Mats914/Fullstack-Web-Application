# Render Deployment Guide - Complete Setup

## 🔗 Your Backend URL
```
https://backend-fullstack-react-node.onrender.com
```

---

## ✅ All Available Routes

### Public Routes (No Authentication Required)

#### 1. Root Route
```
GET https://backend-fullstack-react-node.onrender.com/
```
**Response:**
```json
{
  "message": "Backend is live!",
  "status": "OK",
  "endpoints": { ... }
}
```

#### 2. Health Check
```
GET https://backend-fullstack-react-node.onrender.com/api/health
```
**Response:**
```json
{
  "status": "OK",
  "message": "Server is running",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "environment": "production"
}
```

#### 3. Render Health Check
```
GET https://backend-fullstack-react-node.onrender.com/healthz
```

#### 4. Register User
```
POST https://backend-fullstack-react-node.onrender.com/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### 5. Login
```
POST https://backend-fullstack-react-node.onrender.com/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Protected Routes (Require JWT Token)

**Header Required:**
```
Authorization: Bearer <token>
```

#### 6. Get All Tasks
```
GET https://backend-fullstack-react-node.onrender.com/api/tasks
Authorization: Bearer <token>
```

#### 7. Get Single Task
```
GET https://backend-fullstack-react-node.onrender.com/api/tasks/:id
Authorization: Bearer <token>
```

#### 8. Create Task
```
POST https://backend-fullstack-react-node.onrender.com/api/tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "New Task",
  "description": "Task description",
  "status": "pending"
}
```

#### 9. Update Task
```
PUT https://backend-fullstack-react-node.onrender.com/api/tasks/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Task",
  "description": "Updated description",
  "status": "in-progress"
}
```

#### 10. Delete Task
```
DELETE https://backend-fullstack-react-node.onrender.com/api/tasks/:id
Authorization: Bearer <token>
```

---

## 🔧 Render Configuration

### 1. Environment Variables

Go to: **Render Dashboard → Service → Environment**

Add these variables:

```
MONGODB_URI=mongodb+srv://motaseemalleje_db_user:qOLbMV7x6M0hLzka@cluster0.uezlmf8.mongodb.net/fullstack-app?retryWrites=true&w=majority
```

```
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

```
NODE_ENV=production
```

### 2. Build & Deploy Settings

**Root Directory:**
```
backend
```
*(Important: If your code is in the `backend` folder)*

**Build Command:**
```bash
npm install
```

**Start Command:**
```bash
node server.js
```

**Health Check Path:**
```
/healthz
```

### 3. Auto-Deploy

- **Auto-Deploy:** Enabled
- **Branch:** `main`

---

## 🚨 Troubleshooting "Not Found"

### If you see "Not Found" at root URL:

1. **Check if code is pushed to GitHub:**
   - Make sure `backend/server.js` contains `app.get('/', ...)`
   - Push to GitHub: `git push origin main`

2. **Check Root Directory in Render:**
   - Go to Render Settings → Build & Deploy
   - Set **Root Directory:** `backend` (if your code is in backend folder)
   - Or leave empty if code is in root

3. **Manual Deploy:**
   - Go to Render Dashboard → Manual Deploy
   - Click "Deploy latest commit"

4. **Check Logs:**
   - Go to Render Dashboard → Logs
   - Look for: `🚀 Server running on port`
   - Look for: `✅ MongoDB connected successfully`

---

## 📝 Quick Test Commands

### Test Root Route
```bash
curl https://backend-fullstack-react-node.onrender.com/
```

### Test Health Check
```bash
curl https://backend-fullstack-react-node.onrender.com/api/health
```

### Test Register
```bash
curl -X POST https://backend-fullstack-react-node.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
```

---

## ✅ Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Environment Variables added in Render
  - [ ] `MONGODB_URI`
  - [ ] `JWT_SECRET`
  - [ ] `NODE_ENV=production`
- [ ] Root Directory set correctly (`backend` or empty)
- [ ] Build Command: `npm install`
- [ ] Start Command: `node server.js`
- [ ] Health Check Path: `/healthz`
- [ ] MongoDB Atlas Network Access configured
- [ ] Manual Deploy triggered
- [ ] Test root route: `https://backend-fullstack-react-node.onrender.com/`

---

## 🔍 Common Issues

### Issue: "Not Found" at root URL

**Possible Causes:**
1. Root Directory not set correctly
2. Code not pushed to GitHub
3. Render hasn't deployed latest commit

**Solution:**
1. Check Root Directory in Render Settings
2. Push code to GitHub
3. Trigger Manual Deploy

### Issue: 502 Bad Gateway

**Possible Causes:**
1. Environment Variables missing
2. MongoDB connection failed
3. Server crashed on startup

**Solution:**
1. Check Render Logs
2. Verify Environment Variables
3. Check MongoDB Atlas Network Access

---

## 📞 Next Steps

After deployment works:
1. Update frontend to use Render URL
2. Test all endpoints
3. Monitor Render Logs for errors
