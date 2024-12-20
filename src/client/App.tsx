// src/client/App.tsx
import React from 'react';
import { ChatInterface } from './components/ChatInterface';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Historical Dialogues: Socrates
          </h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <ChatInterface />
      </main>
    </div>
  );
}

export default App;