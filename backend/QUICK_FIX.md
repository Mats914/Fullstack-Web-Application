# Quick Fix for "Not Found" on Render

## 🚨 Problem: "Not Found" at root URL

The route `/` exists in code, but Render shows "Not Found".

---

## ✅ Solution Steps:

### Step 1: Check Root Directory

In Render Dashboard → Settings → Build & Deploy:

**If your code is in `backend` folder:**
- Set **Root Directory:** `backend`

**If your code is in root:**
- Leave **Root Directory** empty

### Step 2: Verify Code is Pushed

Make sure `backend/server.js` contains:
```javascript
app.get('/', (req, res) => {
  res.json({ message: 'Backend is live!', ... });
});
```

Push to GitHub:
```bash
git add .
git commit -m "Add root route"
git push origin main
```

### Step 3: Manual Deploy

1. Go to Render Dashboard
2. Click "Manual Deploy"
3. Select "Deploy latest commit"
4. Wait for deployment to complete

### Step 4: Test

Open in browser:
```
https://backend-fullstack-react-node.onrender.com/
```

Should see:
```json
{
  "message": "Backend is live!",
  "status": "OK"
}
```

---

## 🔍 If Still Not Working:

1. **Check Render Logs:**
   - Look for errors
   - Look for "Server running on port"

2. **Verify Environment Variables:**
   - `MONGODB_URI` exists
   - `JWT_SECRET` exists
   - `NODE_ENV=production`

3. **Check Build Command:**
   - Should be: `npm install`

4. **Check Start Command:**
   - Should be: `node server.js`

---

## 📋 All Routes to Test:

- `GET /` - Root route
- `GET /api/health` - Health check
- `GET /healthz` - Render health check
- `POST /api/auth/register` - Register
- `POST /api/auth/login` - Login
- `GET /api/tasks` - Get tasks (requires token)
