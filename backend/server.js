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
const MONGO_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;

// Validate required environment variables
if (!MONGO_URI) {
  console.error('ERROR: MONGODB_URI is not defined in environment variables');
  console.error('Please set MONGODB_URI in your environment variables (Render Dashboard → Environment)');
  process.exit(1);
}

if (!JWT_SECRET) {
  console.error('ERROR: JWT_SECRET is not defined in environment variables');
  console.error('Please set JWT_SECRET in your environment variables (Render Dashboard → Environment)');
  process.exit(1);
}

// Connect to MongoDB
const connectDB = async () => {
  try {
    // Validate MongoDB URI format
    if (!MONGO_URI.startsWith('mongodb://') && !MONGO_URI.startsWith('mongodb+srv://')) {
      console.error('ERROR: Invalid MongoDB URI format. Must start with mongodb:// or mongodb+srv://');
      console.error('Current URI format:', MONGO_URI.substring(0, 20) + '...');
      return false;
    }

    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB connected successfully');
    
    // Log connection info (hide credentials)
    const safeURI = MONGO_URI.replace(/\/\/([^:]+):([^@]+)@/, '//$1:***@');
    console.log(`📦 Connected to: ${safeURI}`);
    
    // Log database name if available
    const dbName = mongoose.connection.db?.databaseName;
    if (dbName) {
      console.log(`📊 Database: ${dbName}`);
    }
    return true;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.error('💡 Make sure:');
    console.error('   1. MONGODB_URI is set correctly in Render Environment Variables');
    console.error('   2. MongoDB Atlas IP whitelist includes Render IPs (or 0.0.0.0/0 for testing)');
    console.error('   3. MongoDB Atlas credentials are correct');
    console.error('   4. MongoDB Atlas cluster is running');
    return false;
  }
};

// Start server first, then connect to MongoDB
app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📡 Server URL: http://localhost:${PORT}`);
  
  // Connect to MongoDB after server starts
  const connected = await connectDB();
  if (!connected) {
    console.warn('⚠️  Server started but MongoDB connection failed. Some features may not work.');
    console.warn('⚠️  Check Render logs and MongoDB Atlas settings.');
  }
});

export default app;
