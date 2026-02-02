import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import taskRoutes from './routes/tasks.js';

// Load environment variables from .env file (only needed for local development)
// On production platforms like Render, environment variables are set directly
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route - for testing server status
app.get('/', (req, res) => {
  res.json({
    message: 'Backend is live!',
    status: 'OK',
    endpoints: {
      health: '/api/health',
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login'
      },
      tasks: {
        getAll: 'GET /api/tasks',
        getOne: 'GET /api/tasks/:id',
        create: 'POST /api/tasks',
        update: 'PUT /api/tasks/:id',
        delete: 'DELETE /api/tasks/:id'
      }
    }
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Health check for Render (uses /healthz path)
app.get('/healthz', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Server is healthy',
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Environment variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGODB_URI || (process.env.NODE_ENV !== 'production' ? 'mongodb://localhost:27017/fullstack-app' : null);
const JWT_SECRET = process.env.JWT_SECRET;

if (!process.env.MONGODB_URI && process.env.NODE_ENV !== 'production') {
  console.log('📦 Using default: mongodb://localhost:27017/fullstack-app');
}
if (!MONGO_URI) {
  console.warn('⚠️  MONGODB_URI not set. Set it in .env or environment variables for auth/tasks.');
}
if (!JWT_SECRET) {
  console.warn('⚠️  JWT_SECRET not set. Set it in .env or environment variables for auth.');
}

// Connect to MongoDB (optional at startup — auth/tasks return 503 if not connected)
const connectDB = async () => {
  if (!MONGO_URI) return false;
  try {
    if (!MONGO_URI.startsWith('mongodb://') && !MONGO_URI.startsWith('mongodb+srv://')) {
      console.error('Invalid MongoDB URI. Must start with mongodb:// or mongodb+srv://');
      return false;
    }
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 15000,
      connectTimeoutMS: 15000,
      family: 4,
    });
    console.log('✅ MongoDB connected');
    const dbName = mongoose.connection.db?.databaseName;
    if (dbName) console.log(`📊 Database: ${dbName}`);
    return true;
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    return false;
  }
};

app.listen(PORT, async () => {
  console.log(`🚀 Server on http://localhost:${PORT}`);
  const ok = await connectDB();
  if (!ok) console.warn('⚠️  MongoDB not connected. Set MONGODB_URI for auth/tasks.');
});

export default app;
