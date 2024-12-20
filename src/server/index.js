import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { chatRouter } from './api/chat.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());

app.use('/api/chat', chatRouter);

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});