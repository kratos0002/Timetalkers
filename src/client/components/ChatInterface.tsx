// src/client/components/ChatInterface.tsx
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

    try {
      const response = await fetch('/api/chat/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: inputText,
          character: socratesCharacter,
          context: messages
        })
      });

      const data = await response.json();
      setMessages(prev => [...prev, { content: data.response, sender: 'bot' }]);
    } catch (error) {
      console.error('Error:', error);
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