// src/client/src/components/ChatInterface.tsx
import { useState } from 'react';

export const socratesCharacter = {
  id: 'socrates',
  name: 'Socrates',
  basePrompt: `You are Socrates, the classical Greek philosopher.`,
  characteristics: ['Questioning methodology', 'Ethical focus'],
  dialogueStyle: 'Socratic questioning',
};

export function ChatInterface() {
  const [messages, setMessages] = useState<Array<{ content: string; sender: 'user' | 'bot' }>>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMessage = { content: inputText, sender: 'user' as const };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    const payload = {
      content: inputText,
      character: socratesCharacter,
      context: messages
    };

    try {
      console.log('Attempting to send request to:', '/api/chat/message');
      console.log('Request payload:', payload);
      
      const response = await fetch('https://timetalkers.onrender.com/api/chat/message', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('Response data:', data);
      
      setMessages(prev => [...prev, { content: data.response, sender: 'bot' }]);
    } catch (error) {
      console.error('Error details:', error);
      setMessages(prev => [...prev, { 
        content: 'Sorry, I encountered an error. Please try again.', 
        sender: 'bot' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto p-4">
      <div className="flex-1 overflow-auto mb-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg ${
              message.sender === 'user'
                ? 'bg-blue-500 text-white ml-auto'
                : 'bg-gray-200 mr-auto'
            } max-w-[80%]`}
          >
            {message.content}
          </div>
        ))}
        {isLoading && (
          <div className="bg-gray-200 p-3 rounded-lg mr-auto max-w-[80%]">
            Thinking...
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
}