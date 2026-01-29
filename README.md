# Fullstack Web Application
## React + Node.js + Express + MongoDB

A complete fullstack web application with **React (TypeScript)** frontend and **Node.js + Express** backend. Features user authentication with JWT, task management (CRUD), weather widget, and internationalization (English/Swedish).

## 🚀 Features

### Frontend
- ✅ **React 18 + TypeScript** - Modern, type-safe frontend
- ✅ **Vite** - Fast development and build tool
- ✅ **TailwindCSS** - Beautiful, responsive UI
- ✅ **Internationalization (i18n)** - English & Swedish language support
- ✅ **User Authentication** - Registration, login, logout with JWT
- ✅ **Protected Routes** - Secure access to dashboard
- ✅ **Task Management** - Full CRUD operations (Create, Read, Update, Delete)
- ✅ **Form Validation** - Client-side validation with error messages
- ✅ **Weather Widget** - Dynamic city/country selection with OpenWeatherMap API
- ✅ **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- ✅ **Loading States** - Visual feedback during API calls
- ✅ **Error Handling** - User-friendly error messages

### Backend
- ✅ **Node.js + Express** - RESTful API server
- ✅ **MongoDB + Mongoose** - Database with ODM
- ✅ **JWT Authentication** - Secure token-based authentication
- ✅ **Password Hashing** - bcrypt for secure password storage
- ✅ **Request Validation** - express-validator for input validation
- ✅ **Error Handling** - Comprehensive error handling middleware
- ✅ **CORS** - Configured for cross-origin requests
- ✅ **Health Checks** - Server status monitoring

## 📁 Project Structure

```
.
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── tasks.js
│   ├── middleware/
│   │   └── auth.js
│   ├── tests/
│   │   ├── auth.test.js
│   │   └── tasks.test.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ProtectedRoute.tsx
│   │   │   ├── TaskForm.tsx
│   │   │   ├── TaskList.tsx
│   │   │   └── WeatherWidget.tsx
│   │   ├── contexts/
│   │   │   └── AuthContext.tsx
│   │   ├── pages/
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   └── Dashboard.tsx
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
└── README.md
```

## 🛠️ Setup Instructions

### Prerequisites
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **MongoDB Atlas** account (free tier available) - [Sign up](https://www.mongodb.com/cloud/atlas)
- **npm** or **yarn** package manager
- **Git** for version control

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file:**
   - Create a new file named `.env` in the `backend` folder
   - Add the following environment variables:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   NODE_ENV=development
   ```
   
   **Getting MongoDB Atlas Connection String:**
   1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   2. Create a free cluster
   3. Click **Connect** → **Connect your application**
   4. Copy the connection string
   5. Replace `<password>` with your database user password
   6. Add your database name: `mongodb+srv://.../fullstack-app?retryWrites=true&w=majority`
   
   **Important:** Never commit `.env` file to Git! It's already in `.gitignore`

4. **Run the backend server:**
   ```bash
   # Development mode (with auto-reload)
   npm run dev

   # Production mode
   npm start
   ```

   The backend will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file (optional):**
   ```env
   VITE_WEATHER_API_KEY=your_openweathermap_api_key (optional)
   ```
   
   **Note:** For local development, the frontend automatically uses Vite proxy to connect to the backend. No additional configuration needed.

4. **Run the development server:**
   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:3000`
   
   **Note:** The frontend automatically proxies `/api/*` requests to `http://localhost:5000` (configured in `vite.config.ts`)

5. **Build for production:**
   ```bash
   npm run build
   ```

   The production build will be in the `dist/` directory.

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📡 API Endpoints

### Base URL
- **Development**: `http://localhost:5000` (frontend uses Vite proxy)

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/auth/register` | Register a new user | ❌ No |
| `POST` | `/api/auth/login` | Login user | ❌ No |

**Register Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Login Request:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (both endpoints):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Task Endpoints (Protected)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/tasks` | Get all tasks for authenticated user | ✅ Yes |
| `GET` | `/api/tasks/:id` | Get single task by ID | ✅ Yes |
| `POST` | `/api/tasks` | Create new task | ✅ Yes |
| `PUT` | `/api/tasks/:id` | Update task | ✅ Yes |
| `DELETE` | `/api/tasks/:id` | Delete task | ✅ Yes |

**Create/Update Task Request:**
```json
{
  "title": "Complete project",
  "description": "Finish the fullstack application",
  "status": "in-progress"
}
```

**Task Status Values:**
- `pending` (default)
- `in-progress`
- `completed`

**Authorization Header:**
```
Authorization: Bearer <your_jwt_token>
```

### Health Check Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Root endpoint - Server status |
| `GET` | `/api/health` | API health check |
| `GET` | `/healthz` | Health check endpoint |

**Response:**
```json
{
  "status": "OK",
  "message": "Server is running",
  "timestamp": "2024-01-24T12:00:00.000Z"
}
```

## 🔐 Authentication

The application uses **JWT (JSON Web Tokens)** for secure authentication.

### How it works:

1. **User Registration/Login:**
   - User submits credentials (email, password)
   - Backend validates credentials
   - Backend generates JWT token
   - Token is returned to frontend

2. **Token Storage:**
   - Token is stored in `localStorage`
   - User data is also stored in `localStorage`

3. **Protected Requests:**
   - Token is automatically included in `Authorization` header
   - Format: `Authorization: Bearer <token>`
   - Backend validates token on each protected request

4. **Token Expiration:**
   - Tokens don't expire by default (can be configured)
   - User must logout to clear token
   - Token is cleared on logout

### Security Features:

- ✅ Passwords are hashed using **bcrypt** (never stored in plain text)
- ✅ JWT tokens are signed with secret key
- ✅ Protected routes require valid token
- ✅ CORS configured for secure cross-origin requests
- ✅ Input validation on all endpoints

## 🌤️ Weather Widget

The weather widget integrates with **OpenWeatherMap API** to display real-time weather data.

### Features:
- ✅ Search and select any city/country worldwide
- ✅ Real-time weather data (temperature, humidity, wind speed)
- ✅ Beautiful weather icons
- ✅ Supports multiple languages (English/Swedish)
- ✅ City selection saved in localStorage

### Setup:

1. **Get OpenWeatherMap API Key:**
   - Sign up at [OpenWeatherMap](https://openweathermap.org/api)
   - Free tier: 60 calls/minute, 1,000,000 calls/month
   - Get your API key from dashboard

2. **Configure API Key:**
   - Add to `frontend/.env`:
     ```env
     VITE_WEATHER_API_KEY=your_api_key_here
     ```
   - Or set it in your deployment platform's environment variables

3. **Usage:**
   - Widget automatically uses API key from environment variable
   - If API key is not set, widget will show error message
   - Users can search and select any city from the dropdown list

## 🎨 UI Features

- **Modern Design**: Clean, professional interface with TailwindCSS
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile
- **Form Validation**: Real-time validation with helpful error messages
- **Success/Error Messages**: User-friendly feedback for all operations
- **Loading States**: Visual feedback during API calls
- **Protected Routes**: Automatic redirect to login if not authenticated

## 🚀 Production Deployment

This project is designed to be deployed as a monorepo (frontend and backend in the same repository).

### Deployment Options

You can deploy this project to any platform that supports Node.js and static file hosting:

- **Vercel** - Supports both frontend and backend
- **Railway** - Full-stack deployment
- **Heroku** - Traditional PaaS
- **DigitalOcean App Platform** - Simple deployment
- **AWS/GCP/Azure** - Enterprise solutions

### General Deployment Steps

1. **Set Environment Variables:**
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_strong_secret_key_minimum_32_characters
   NODE_ENV=production
   VITE_WEATHER_API_KEY=your_openweathermap_api_key (optional)
   ```

2. **Configure MongoDB Atlas:**
   - Go to MongoDB Atlas → **Network Access**
   - Add `0.0.0.0/0` to allow all IPs (or specific IPs for better security)

3. **Build Frontend:**
   ```bash
   cd frontend
   npm run build
   ```

4. **Serve Frontend from Backend (optional):**
   - You can serve the built frontend from the Express server
   - Or deploy frontend and backend separately if your platform supports it

### Local Development

The frontend automatically connects to the backend using Vite proxy:
- Frontend runs on `http://localhost:3000`
- Backend runs on `http://localhost:5000`
- Vite proxies `/api/*` requests to the backend automatically

## 📝 Task Model

Tasks have the following fields:
- `title` (required): Task title (max 200 characters)
- `description` (optional): Task description (max 1000 characters)
- `status`: One of `pending`, `in-progress`, or `completed` (default: `pending`)
- `user`: Reference to the user who owns the task
- `createdAt`: Auto-generated timestamp
- `updatedAt`: Auto-generated timestamp

## 🔧 Technologies Used

### Frontend Stack
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.2.0 | UI library |
| **TypeScript** | 5.2.2 | Type safety |
| **Vite** | 5.0.8 | Build tool & dev server |
| **TailwindCSS** | 3.3.6 | Styling |
| **React Router** | 6.20.1 | Client-side routing |
| **Axios** | 1.6.2 | HTTP client |
| **i18next** | 23.7.6 | Internationalization |
| **react-i18next** | 13.5.0 | React i18n integration |
| **Heroicons** | 2.1.1 | Icon library |

### Backend Stack
| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 18+ | Runtime environment |
| **Express** | 4.18.2 | Web framework |
| **MongoDB** | Latest | Database |
| **Mongoose** | 8.0.3 | ODM (Object Data Modeling) |
| **JWT** | 9.0.2 | Authentication tokens |
| **bcryptjs** | 2.4.3 | Password hashing |
| **express-validator** | 7.0.1 | Input validation |
| **CORS** | 2.8.5 | Cross-origin resource sharing |
| **dotenv** | 16.3.1 | Environment variables |

### Development Tools
- **Nodemon** - Auto-restart server in development
- **Vitest** - Frontend testing framework
- **Jest** - Backend testing framework
- **ESLint** - Code linting
- **TypeScript** - Type checking

## 📚 Additional Resources

### Documentation
- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Atlas Setup](https://www.mongodb.com/docs/atlas/getting-started/)
- [Vite Documentation](https://vitejs.dev/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)

### Deployment Guides
- [MongoDB Atlas Network Access](https://www.mongodb.com/docs/atlas/security/ip-access-list/)
- Choose your preferred deployment platform (Vercel, Railway, Heroku, etc.)

### API Documentation
- [OpenWeatherMap API](https://openweathermap.org/api)
- [JWT.io](https://jwt.io/) - JWT token decoder

---

## 🤝 Contributing

This is a template project. Feel free to:
- Fork the repository
- Create feature branches
- Submit pull requests
- Report issues

---

## 📄 License

This project is open-source and available under the [ISC License](https://opensource.org/licenses/ISC).

---

## 👤 Author

Created as a fullstack application template for learning and development.

**GitHub Repository (monorepo):**
- [Fullstack-React-Node-MongoPostgreSQL](https://github.com/Mats914/Fullstack-React-Node-MongoPostgreSQL-) — Frontend in `frontend/`, Backend in `backend/`

---

## ⚠️ Important Security Notes

1. **Never commit `.env` files** - They contain sensitive information
2. **Use strong JWT_SECRET** - Minimum 32 characters, random string
3. **Change default credentials** - Don't use default passwords/keys
4. **Keep dependencies updated** - Regularly update npm packages
5. **Use HTTPS in production** - Most modern hosting platforms provide HTTPS by default
6. **Restrict MongoDB Atlas IP access** - Use specific IPs instead of `0.0.0.0/0` in production

---

## 🎯 Quick Links

- 📖 [Frontend README](./frontend/README.md)
- 📖 [Backend README](./backend/README.md)
- 📖 [API Routes](./backend/ROUTES.md)
- 🔗 [GitHub Repository](https://github.com/Mats914/Fullstack-React-Node-MongoPostgreSQL-)

**Local development (when running):**
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`
- API Health: `http://localhost:5000/api/health`

---

**Made with ❤️ using React, Node.js, and MongoDB**
