import express from 'express';
import { OpenAIModelService } from '../models/openai.js';

const router = express.Router();
const modelService = new OpenAIModelService();

router.post('/message', async (req, res) => {
  try {
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
    res.json({ response });
  } catch (error) {
    console.error('Error processing message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export const chatRouter = router;
