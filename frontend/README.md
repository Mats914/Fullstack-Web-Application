# Fullstack Project Frontend (React + Vite + TailwindCSS + TypeScript)

This repository contains the **frontend** of a fullstack project built with **React**, **Vite**, **TypeScript**, and **TailwindCSS**.  
It is designed to work with a backend (Node.js + Express + MongoDB/PostgreSQL) which is deployed separately.

---

## 🚀 Features

- Modern **React** frontend using **Vite** for fast development and build
- **TypeScript** for type safety and better code quality
- Responsive UI with **TailwindCSS**
- **Internationalization (i18n)** - Supports English and Swedish
- User authentication (login, register, logout)
- Task management with full CRUD operations
- Weather widget with dynamic city/country selection
- Protected routes with JWT authentication
- Organized project structure ready for extension

---

## 🛠 Installation

1. **Clone the repository**

```bash
git clone https://github.com/Mats914/Fullstack-React-Node-MongoPostgreSQL-.git
cd Fullstack-React-Node-MongoPostgreSQL-
cd frontend
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables (optional)**

Create a `.env` file in the root directory for OpenWeatherMap API key:

```env
# OpenWeatherMap API Key (optional)
# Get your free API key from: https://openweathermap.org/api
VITE_WEATHER_API_KEY=your_weather_api_key_here
```

**Note:** For local development, the frontend automatically uses Vite proxy to connect to the backend on `http://localhost:5000`. No additional configuration needed.

4. **Start the development server**

```bash
npm run dev
```

5. **Open your browser**

Go to `http://localhost:3000` to see the app running.

---

## 📦 Project Structure

```
src/
├── components/          # Reusable React components
│   ├── LanguageSwitcher.tsx
│   ├── ProtectedRoute.tsx
│   ├── TaskForm.tsx
│   ├── TaskList.tsx
│   └── WeatherWidget.tsx
├── contexts/           # React contexts for state management
│   ├── AuthContext.tsx
│   └── LanguageContext.tsx
├── pages/              # Page components
│   ├── Dashboard.tsx
│   ├── Login.tsx
│   └── Register.tsx
├── config/            # Configuration files
│   └── api.ts         # API URL configuration
├── i18n/              # Internationalization
│   ├── config.ts
│   └── locales/
│       ├── en.json
│       └── sv.json
├── data/              # Static data
│   └── countriesCities.ts
├── tests/             # Unit tests
├── App.tsx            # Main app component
└── main.tsx           # Entry point
```

---

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run unit tests

---

## 🌐 Connecting to Backend

### Local Development

In development mode, the frontend uses Vite's proxy to forward `/api/*` requests to `http://localhost:5000`. No configuration needed - just make sure your backend is running on port 5000.

### Production

In production, configure your deployment platform to serve both frontend and backend together, or set up API proxying based on your hosting solution.

---

## 🎨 Features Overview

### Authentication
- User registration with validation
- Login with JWT token storage
- Protected routes that require authentication
- Automatic token refresh on page reload

### Task Management
- Create, read, update, and delete tasks
- Task status management (pending, in-progress, completed)
- Real-time error and success messages
- Responsive task list with edit/delete actions

### Weather Widget
- Search and select any city/country worldwide
- Real-time weather data from OpenWeatherMap
- Beautiful weather display with icons
- Supports multiple languages

### Internationalization
- Switch between English and Swedish
- All UI text is translated
- Language preference saved in localStorage

---

## 🚀 Deployment

This frontend is designed to work with the backend in the same repository. Deploy both together to your preferred platform.

### Build for Production

```bash
npm run build
```

The production build will be in the `dist/` directory.

---

## 📌 Notes

- This repository only contains the frontend code
- You need a backend server to handle API requests for full functionality
- The backend is in the same repository (monorepo structure)
- For local development, Vite proxy automatically connects frontend to backend

---

## 🔗 Related

- **Backend**: Located in the `backend/` directory of this repository
- **Main README**: See root `README.md` for full project documentation

---

## 📄 License

This project is open-source and free to use.

---

## 👤 Author

Created as part of a fullstack application project.