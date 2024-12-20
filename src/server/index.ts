const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { chatRouter } = require('./api/chat');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/chat', chatRouter);

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
