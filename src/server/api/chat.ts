const express = require('express');
const { OpenAIModelService } = require('../models/openai');
const { z } = require('zod');

const router = express.Router();
const modelService = new OpenAIModelService();

const MessageSchema = z.object({
  content: z.string(),
  character: z.object({
    id: z.string(),
    name: z.string(),
    basePrompt: z.string(),
  }),
  context: z.array(z.object({
    content: z.string(),
    sender: z.enum(['user', 'character']),
  })),
});

router.post('/message', async (req, res) => {
  try {
    const validation = MessageSchema.safeParse(req.body);
    
    if (!validation.success) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

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

module.exports = { chatRouter: router };