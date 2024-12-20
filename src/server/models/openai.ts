// src/server/models/openai.js
const OpenAI = require('openai');
const dotenv = require('dotenv');

dotenv.config();

class OpenAIModelService {
  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      throw new Error(
        'OpenAI API key is missing. Please set the OPENAI_API_KEY environment variable.'
      );
    }

    try {
      this.openai = new OpenAI({
        apiKey: apiKey,
      });
      this.name = 'OpenAI GPT-4';
    } catch (error) {
      console.error('Error initializing OpenAI client:', error);
      throw new Error('Failed to initialize OpenAI client');
    }
  }

  async generateResponse(prompt, context) {
    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: context.character.basePrompt
          },
          ...context.messageHistory.map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'assistant',
            content: msg.content
          })),
          {
            role: "user",
            content: prompt
          }
        ],
      });

      return response.choices[0]?.message?.content || 'No response generated';
    } catch (error) {
      console.error('Error generating response:', error);
      throw new Error('Failed to generate response');
    }
  }

  getModelInfo() {
    return {
      name: this.name,
      provider: 'OpenAI',
      capabilities: ['Natural dialogue', 'Context awareness'],
      limitations: ['No long-term memory', 'Limited historical accuracy']
    };
  }
}

module.exports = { OpenAIModelService };