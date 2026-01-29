import request from 'supertest';
import app from '../server.js';
import User from '../models/User.js';
import Task from '../models/Task.js';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

describe('Tasks API', () => {
  let authToken;
  let userId;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/fullstack-app-test');
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await User.deleteMany({});
    await Task.deleteMany({});

    // Create a test user and get token
    const user = new User({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    });
    await user.save();
    userId = user._id;
    authToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'test-secret');
  });

  describe('GET /api/tasks', () => {
    it('should get all tasks for authenticated user', async () => {
      // Create a task
      await Task.create({
        title: 'Test Task',
        description: 'Test Description',
        status: 'pending',
        user: userId
      });

      const res = await request(app)
        .get('/api/tasks')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveLength(1);
    });

    it('should require authentication', async () => {
      const res = await request(app)
        .get('/api/tasks');

      expect(res.statusCode).toBe(401);
    });
  });

  describe('POST /api/tasks', () => {
    it('should create a new task', async () => {
      const res = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          title: 'New Task',
          description: 'New Description',
          status: 'pending'
        });

      expect(res.statusCode).toBe(201);
      expect(res.body.title).toBe('New Task');
    });
  });
});
