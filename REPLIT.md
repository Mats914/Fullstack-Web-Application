# Running on Replit

This project can run on [Replit](https://replit.com) with the frontend and backend as separate services.

---

## استيراد المشروع إلى Replit (كيف ترى المشروع على Replit)

إذا **لا ترى المشروع** على Replit، يجب أولاً **استيراده** من GitHub.

### الطريقة السريعة (Rapid import)

1. افتح هذا الرابط في المتصفح (مستودعك على GitHub):
   ```
   https://replit.com/github.com/Mats914/Fullstack-React-Node-MongoPostgreSQL-
   ```
2. اضغط **Enter** — سيُفتح Replit ويبدأ الاستيراد تلقائياً.
3. سجّل الدخول إلى Replit إن طُلِب منك ذلك.
4. بعد انتهاء الاستيراد، ستظهر لك واجهة المشروع (الملفات، المحرر، إلخ).

### الطريقة المُوجّهة (Guided import)

1. اذهب إلى **[replit.com/import](https://replit.com/import)**.
2. اختر **GitHub** كمصدر الاستيراد.
3. **اربط حساب GitHub** إذا لم يكن مربوطاً.
4. ابحث عن المستودع **`Fullstack-React-Node-MongoPostgreSQL-`** أو المستودع الذي يخصك واختره.
5. اضغط **Import** وأكمل الخطوات حتى ينتهي الاستيراد.

بعد الاستيراد، المشروع يظهر كـ **Replit App** — يمكنك فتح الملفات، التشغيل، وإضافة Secrets (مثل `MONGODB_URI`, `JWT_SECRET`) كما هو موضّح أدناه.

---

## Ports

- **Frontend** (Vite): port **5000**
- **Backend** (Express): port **3001** (to avoid conflict)

## 1. Backend

- **Run**: `cd backend && npm install && npm run dev` (or `npm start`)
- **PORT**: Set `PORT=3001` in Replit Secrets / Environment.
- **Required env vars**:
  - `MONGODB_URI` — MongoDB Atlas connection string (or another MongoDB URI).
  - `JWT_SECRET` — A long, random string (e.g. 32+ chars).

Without these, the server still starts, but **register/login will return**:
- `Database unavailable. Set MONGODB_URI and ensure MongoDB is running.`
- `Server configuration error. Set JWT_SECRET in environment variables.`

## 2. Frontend

- **Run**: `cd frontend && npm install && npm run dev`
- **Port**: Set `VITE_PORT=5000` so the app is served on 5000.
- **API proxy**: Set `VITE_PROXY_TARGET=http://localhost:3001` so `/api` is proxied to the backend.

Example env for the **frontend** run:

```env
VITE_PORT=5000
VITE_PROXY_TARGET=http://localhost:3001
```

## 3. Workflows / multiple run commands

Use two Replit run targets (or Replit’s “Run” config):

1. **Backend**: `cd backend && npm run dev`  
   - Env: `PORT=3001`, `MONGODB_URI`, `JWT_SECRET`.

2. **Frontend**: `cd frontend && npm run dev`  
   - Env: `VITE_PORT=5000`, `VITE_PROXY_TARGET=http://localhost:3001`.

Both must be running. The frontend proxies `/api/*` to the backend.

## 4. “Server error during registration”

Usually means:

1. **Backend not reachable**  
   - Backend not running, or wrong port.  
   - Fix: Run backend on 3001, set `VITE_PROXY_TARGET=http://localhost:3001` for frontend.

2. **Database not configured**  
   - `MONGODB_URI` missing or MongoDB not running.  
   - Fix: Set `MONGODB_URI` and ensure MongoDB (e.g. Atlas) is reachable.

3. **JWT not configured**  
   - `JWT_SECRET` missing.  
   - Fix: Set `JWT_SECRET` in the backend environment.

After fixing, you should see the specific 503 messages above instead of a generic “Server error during registration.”

## 5. Quick checklist

- [ ] Backend running on port 3001
- [ ] Frontend running on port 5000
- [ ] `MONGODB_URI` set for backend
- [ ] `JWT_SECRET` set for backend
- [ ] `VITE_PROXY_TARGET=http://localhost:3001` set for frontend (and `VITE_PORT=5000` if you use it)
