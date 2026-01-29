import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/User.js';

export const authenticate = async (req, res, next) => {
  try {
    if (!process.env.JWT_SECRET) {
      return res.status(503).json({ message: 'Server configuration error. Set JWT_SECRET in environment variables.' });
    }
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ message: 'Database unavailable. Set MONGODB_URI and ensure MongoDB is running.' });
    }

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};
