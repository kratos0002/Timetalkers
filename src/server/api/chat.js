// src/server/api/chat.js
import express from 'express';
import { OpenAIModelService } from '../models/openai.js';

const router = express.Router();
const modelService = new OpenAIModelService();

// Test route to verify API is working
router.get('/test', (req, res) => {
  res.json({ message: 'Chat API is working' });
});

router.post('/message', async (req, res) => {
  try {
    console.log('Received chat request:', req.body);
    
    const { content, character, context } = req.body;
    
    const response = await modelService.generateResponse(content, {
      character,
      messageHistory: context,
      sessionMetadata: {
        startTime: new Date(),
        modelVersion: 'openai-gpt4',
        characterId: character.id,
      },
    });

    console.log('Generated response:', response);
    res.json({ response });
  } catch (error) {
    console.error('Error processing message:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

export { router as chatRouter };