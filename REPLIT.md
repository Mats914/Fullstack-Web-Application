# Running on Replit

This project can run on [Replit](https://replit.com) with the frontend and backend as separate services.

---

## Importing the project to Replit

If you **don’t see the project** on Replit, you need to **import it** from GitHub first.

### Rapid import

1. Open this URL in your browser (your GitHub repo):
   ```
   https://replit.com/github.com/Mats914/Fullstack-React-Node-MongoPostgreSQL-
   ```
2. Press **Enter** — Replit will open and start importing automatically.
3. Log in to Replit if prompted.
4. When import finishes, you’ll see the project (files, editor, etc.).

### Guided import

1. Go to **[replit.com/import](https://replit.com/import)**.
2. Select **GitHub** as the import source.
3. **Connect your GitHub account** if needed.
4. Search for the repo **`Fullstack-React-Node-MongoPostgreSQL-`** (or yours) and select it.
5. Click **Import** and complete the steps.

After importing, the project appears as a **Replit App**. You can open files, run it, and add Secrets (`MONGODB_URI`, `JWT_SECRET`) as described below.

---

## Ports

- **Frontend** (Vite): port **5000** → Replit Preview (default port 80)
- **Backend** (Express): port **3001**

---

## Run button (recommended): single script runs both

The project includes `.replit` and `scripts/start-replit.sh`. When you press **Run**:

1. `npm install` runs for backend and frontend.
2. Backend starts on port **3001**.
3. Frontend (Vite) starts on port **5000** with `host: true` (for Replit Preview).

**Requirements:**

- **Secrets** (Replit tools → Secrets): add `MONGODB_URI` and `JWT_SECRET`.
- Frontend uses `VITE_PROXY_TARGET=http://localhost:3001` and `VITE_PORT=5000` from `.replit` → `[run.env]`.

**Preview:** In Replit, open **Preview** and choose port **80** or **5000** to view the app.

---

## Alternative: Workflows (two separate processes)

If the single Run script does not work, use **Workflows** to run two processes in **parallel**:

1. Open **Workflows** (or ⌘K → Workflows) → **+ New Workflow**.
2. Create a **Backend** workflow:
   - **Execute Shell Command**: `cd backend && npm install && npm run dev`
   - Execution mode: **Sequential** (or default).
3. Create a **Frontend** workflow:
   - **Execute Shell Command**: `cd frontend && npm install && npm run dev`
   - Same mode.
4. Create a **Fullstack** workflow:
   - **Run Workflow** → Backend  
   - **Run Workflow** → Frontend  
   - Execution mode: **Parallel**.
5. Assign **Fullstack** as the workflow for the **Run** button (dropdown next to Run).
6. In **Secrets**, add: `PORT=3001`, `MONGODB_URI`, `JWT_SECRET`, `VITE_PORT=5000`, `VITE_PROXY_TARGET=http://localhost:3001`.

Run **Fullstack** and confirm the Console shows output from both backend and frontend.

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
- [ ] `VITE_PROXY_TARGET=http://localhost:3001` and `VITE_PORT=5000` (in `.replit` or Secrets when using Workflows)

---

## 6. Vite won't start / Frontend not showing

If **Backend** runs but **Frontend** (Vite) does not appear:

1. **`host: true`** — Added in `vite.config.ts` so Vite listens on `0.0.0.0` (required for Replit Preview).
2. **Running both** — Using `&` in a single line sometimes fails. Use either:
   - **`scripts/start-replit.sh`** (current Run setup), or  
   - **Workflows** with two processes (Backend + Frontend) in **Parallel** as above.
3. **Port 5000** — Ensure no other process uses it. The Run script starts backend on 3001 first, then frontend on 5000.
4. **Preview** — In Replit, open **Preview** and select port **80** or **5000** for the app.
