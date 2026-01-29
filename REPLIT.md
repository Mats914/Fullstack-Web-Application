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

- **Frontend** (Vite): port **5000** → Replit Preview (default port 80)
- **Backend** (Express): port **3001**

---

## Run button (مُوصى به): سكربت واحد يُشغّل الاثنين

المشروع يتضمّن `.replit` و `scripts/start-replit.sh`. عند الضغط على **Run**:

1. يُثبَّت `npm` للـ backend والـ frontend.
2. يُشغَّل الـ backend على المنفذ **3001**.
3. يُشغَّل الـ frontend (Vite) على المنفذ **5000** مع `host: true` (للـ Replit Preview).

**المتطلّبات:**

- **Secrets** (أدوات Replit → Secrets): أضف `MONGODB_URI` و `JWT_SECRET`.
- الـ frontend يستخدم `VITE_PROXY_TARGET=http://localhost:3001` و `VITE_PORT=5000` من `.replit` → `[run.env]`.

**المعاينة:** اختر المنفذ **80** (أو **5000**) في قائمة المنافذ في الـ Preview لرؤية الواجهة.

---

## بديل: Workflows (عمليتان منفصلتان)

إذا لم يعمل الـ Run الموحّد، استخدم **Workflows** بتشغيل عمليتين **بالتوازي**:

1. **Workflows** (أو ⌘K → Workflows) → **+ New Workflow**.
2. أنشئ workflow باسم **Backend**:
   - **Execute Shell Command**: `cd backend && npm install && npm run dev`
   - وضع التنفيذ: **Sequential** (أو افتراضي).
3. أنشئ workflow باسم **Frontend**:
   - **Execute Shell Command**: `cd frontend && npm install && npm run dev`
   - نفس الوضع.
4. أنشئ workflow **Fullstack**:
   - **Run Workflow** → Backend  
   - **Run Workflow** → Frontend  
   - وضع التنفيذ: **Parallel**.
5. عيّن **Fullstack** كـ workflow للزر **Run** (القائمة بجانب Run).
6. في **Secrets** أضف: `PORT=3001`, `MONGODB_URI`, `JWT_SECRET`, `VITE_PORT=5000`, `VITE_PROXY_TARGET=http://localhost:3001`.

شغّل **Fullstack** وتأكّد أن الـ Console يعرض خرج الـ backend والـ frontend معاً.

---

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
- [ ] `MONGODB_URI` set (Secrets)
- [ ] `JWT_SECRET` set (Secrets)
- [ ] `VITE_PROXY_TARGET=http://localhost:3001` و `VITE_PORT=5000` (في `.replit` أو Secrets عند استخدام Workflows)

---

## 6. Vite لا يبدأ / Frontend لا يظهر

إذا كان الـ **Backend** يعمل والـ **Frontend** (Vite) لا يظهر:

1. **`host: true`** — تمت إضافته في `vite.config.ts` حتى يستمع Vite على `0.0.0.0` (مطلوب لـ Replit Preview).
2. **تشغيل الأمرين معاً** — استخدام `&` في سطر واحد أحياناً يفشل. استخدم إمّا:
   - **`scripts/start-replit.sh`** (الـ Run الحالي)، أو  
   - **Workflows** بعمليتين (Backend + Frontend) **Parallel** كما في القسم أعلاه.
3. **المنفذ 5000** — تأكّد أن لا يستهلكه بروسيس آخر. الـ Run script يُشغّل الـ backend أولاً على 3001 ثم الـ frontend على 5000.
4. **المعاينة** — في Replit افتح **Preview** واختر المنفذ **80** أو **5000** (الواجهة).
