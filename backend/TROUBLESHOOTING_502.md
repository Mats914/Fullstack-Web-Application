# Fixing 502 Bad Gateway on Render

## The problem: 502 Bad Gateway

This usually means the server is not running or stops right after startup.

---

## Possible causes

### 1. Missing environment variables

**Fix:**
- Go to Render Dashboard → Service → Environment
- Add these variables:

```
MONGODB_URI=your_mongodb_atlas_connection_string
```

```
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

```
NODE_ENV=production
```

---

### 2. MongoDB Atlas network access

**Fix:**
1. Go to MongoDB Atlas Dashboard
2. Network Access → Add IP Address
3. Add `0.0.0.0/0` (for testing)
4. Or add specific Render IPs

---

### 3. Wrong build command

**In Render Settings → Build & Deploy:**

**Build Command:**
```bash
npm install
```

**Start Command:**
```bash
node server.js
```

**Root Directory:**
```
backend
```
*(if the project lives in the `backend` folder)*

---

### 4. Wrong health check path

**In Render Settings → Health Checks:**

**Health Check Path:**
```
/healthz
```

---

## Checklist

- [ ] Environment variables set in Render
  - [ ] `MONGODB_URI`
  - [ ] `JWT_SECRET`
  - [ ] `NODE_ENV=production`

- [ ] MongoDB Atlas
  - [ ] Network Access allows Render IPs
  - [ ] Database user exists
  - [ ] Cluster is running

- [ ] Render settings
  - [ ] Build Command: `npm install`
  - [ ] Start Command: `node server.js`
  - [ ] Root Directory: `backend` (if needed)
  - [ ] Health Check: `/healthz`

- [ ] Code is up to date
  - [ ] Latest changes pushed to GitHub
  - [ ] Render auto-deploy is enabled

---

## Quick fix steps

### 1. Check logs

In Render Dashboard → Logs:
- Look for errors
- Look for "MongoDB connected successfully"
- Look for "Server running on port"

### 2. Add environment variables

If any are missing, add them now.

### 3. Redeploy

- Manual Deploy → Deploy latest commit
- Or wait for auto-deploy

### 4. Check MongoDB Atlas

- Ensure Network Access allows connections
- Ensure the cluster is running

---

## Test after fixing

1. **Root route:**  
   `https://your-render-service.onrender.com/`

2. **Health check:**  
   `https://your-render-service.onrender.com/api/health`

3. **Render health check:**  
   `https://your-render-service.onrender.com/healthz`

---

## Tips

1. **Check logs first** — they usually show the real cause
2. **Environment variables matter** — the server will not run without them
3. **MongoDB Atlas Network Access** — must allow connections
4. **Root Directory** — if the app is in `backend`, set it in Render settings

---

## If the problem continues

1. Review Render logs fully
2. Confirm all environment variables are set
3. Confirm MongoDB Atlas Network Access
4. Try a manual deploy again
