# Local MongoDB Setup (Windows)

For running the app on your laptop, use **local MongoDB** instead of Atlas.

## 1. Install MongoDB Community Server

1. Download: [MongoDB Community Server](https://www.mongodb.com/try/download/community)
2. Select: **Windows**, **msi**, latest version
3. Run the installer
4. Choose **Complete** installation
5. Check **Install MongoDB as a Service** (recommended)
6. Finish the installation

MongoDB will run automatically in the background.

## 2. Verify MongoDB is running

Open PowerShell and run:

```powershell
mongosh
```

If you see a MongoDB shell prompt, it's working. Type `exit` to quit.

## 3. Run the app

**Terminal 1 - Backend:**
```powershell
cd backend
npm install
npm run dev
```

**Terminal 2 - Frontend:**
```powershell
cd frontend
npm install
npm run dev
```

Then open http://localhost:3000 in your browser.

## 4. .env configuration

Your `backend/.env` should have:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/fullstack-app
JWT_SECRET=my-super-secret-jwt-key-12345
NODE_ENV=development
```

The app uses local MongoDB by default in development.

## Troubleshooting

**MongoDB service not running?**
- Open **Services** (Win + R → `services.msc`)
- Find **MongoDB Server** → Right-click → Start

**Port 27017 in use?**
- Check if another MongoDB instance is running
- Or change the port in MONGODB_URI: `mongodb://localhost:27018/fullstack-app`
