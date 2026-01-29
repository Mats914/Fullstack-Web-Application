# Render Setup Guide

## ✅ Your Backend URL
```
https://backend-fullstack-react-node.onrender.com
```

---

## 🔧 Environment Variables on Render

Go to: **Render Dashboard → Your Service → Environment**

Add these environment variables:

### Required Variables:

```
MONGODB_URI=mongodb+srv://motaseemalleje_db_user:qOLbMV7x6M0hLzka@cluster0.uezlmf8.mongodb.net/fullstack-app?retryWrites=true&w=majority
```

```
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

```
NODE_ENV=production
```

### Optional (Auto-set by Render):
```
PORT=10000
```
*(Render sets this automatically, but you can add it if needed)*

---

## 📋 Step-by-Step Setup on Render

### 1. Add Environment Variables

1. Go to your service on Render
2. Click **"Environment"** tab
3. Click **"Add Environment Variable"**
4. Add each variable:
   - **Key:** `MONGODB_URI`
   - **Value:** `mongodb+srv://motaseemalleje_db_user:qOLbMV7x6M0hLzka@cluster0.uezlmf8.mongodb.net/fullstack-app?retryWrites=true&w=majority`
   
   - **Key:** `JWT_SECRET`
   - **Value:** `your-super-secret-jwt-key-change-this-in-production`
   
   - **Key:** `NODE_ENV`
   - **Value:** `production`

5. Click **"Save Changes"**

### 2. Build & Deploy Settings

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

### 3. MongoDB Atlas Configuration

Make sure your MongoDB Atlas cluster allows connections from Render:

1. Go to MongoDB Atlas Dashboard
2. Click **"Network Access"**
3. Add IP Address: `0.0.0.0/0` (allows all IPs - for testing)
   - Or add specific Render IPs if you know them
4. Click **"Add Access List Entry"**

---

## 🧪 Testing Your Backend

### 1. Test Root Route
```
https://backend-fullstack-react-node.onrender.com/
```

**Expected Response:**
```json
{
  "message": "Backend is live!",
  "status": "OK",
  "endpoints": { ... }
}
```

### 2. Test Health Check
```
https://backend-fullstack-react-node.onrender.com/api/health
```

**Expected Response:**
```json
{
  "status": "OK",
  "message": "Server is running",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "environment": "production"
}
```

### 3. Test Render Health Check
```
https://backend-fullstack-react-node.onrender.com/healthz
```

### 4. Test Register Endpoint
```bash
curl -X POST https://backend-fullstack-react-node.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
```

---

## 🔍 Troubleshooting

### Error: "MongoDB connection error: ECONNREFUSED"

**Cause:** Backend trying to connect to localhost instead of MongoDB Atlas

**Solution:**
1. ✅ Check `MONGODB_URI` is set in Render Environment Variables
2. ✅ Make sure MongoDB Atlas allows connections from Render IPs
3. ✅ Verify MongoDB Atlas credentials are correct
4. ✅ Check MongoDB Atlas cluster is running

### Error: "JWT_SECRET is not defined"

**Solution:**
1. Add `JWT_SECRET` in Render Environment Variables
2. Use a strong, random string (at least 32 characters)

### Error: "Route not found"

**This is normal if:**
- You're accessing a route that doesn't exist
- The route requires authentication but you didn't provide a token

**Test with:**
- `GET /` - Should return "Backend is live!"
- `GET /api/health` - Should return health status

---

## 🔗 Frontend Configuration

Update your frontend to use the Render backend URL:

### In `frontend/vite.config.ts`:
```typescript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://backend-fullstack-react-node.onrender.com',
        changeOrigin: true,
        secure: true
      }
    }
  }
})
```

### Or in production, update API calls:
```typescript
const API_URL = 'https://backend-fullstack-react-node.onrender.com';
```

---

## ✅ Checklist Before Deploying

- [ ] `MONGODB_URI` added to Render Environment Variables
- [ ] `JWT_SECRET` added to Render Environment Variables
- [ ] `NODE_ENV` set to `production`
- [ ] MongoDB Atlas Network Access configured (0.0.0.0/0 or Render IPs)
- [ ] Build Command: `npm install`
- [ ] Start Command: `node server.js`
- [ ] Health Check Path: `/healthz`
- [ ] Test root route: `https://backend-fullstack-react-node.onrender.com/`
- [ ] Test health check: `https://backend-fullstack-react-node.onrender.com/api/health`

---

## 🚀 After Deployment

1. Check Render logs for:
   - ✅ "MongoDB connected successfully"
   - ✅ "Server running on port 10000" (or whatever port Render assigns)
   - ✅ No connection errors

2. Test endpoints:
   - Root: `/`
   - Health: `/api/health` or `/healthz`
   - Register: `POST /api/auth/register`

3. If everything works, update frontend to use Render URL!
