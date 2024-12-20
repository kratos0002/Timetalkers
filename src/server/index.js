// src/server/index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { chatRouter } from './api/chat.js';

dotenv.config();

const app = express();

// Configure CORS
app.use(cors({
  origin: '*',  // Temporarily allow all origins for testing
  methods: ['GET', 'POST']
}));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});

app.use(express.json());

// Mount the chat router at /api/chat
app.use('/api/chat', chatRouter);

// Test route
app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: err.message });
});

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
  console.log('Environment:', process.env.NODE_ENV);
  console.log('OpenAI API Key set:', !!process.env.OPENAI_API_KEY);
});