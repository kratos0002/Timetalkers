import React from 'react'
import { ModelProvider } from './context/ModelContext'
import { ChatInterface } from './components/ChatInterface'
import { socratesCharacter } from './characters/socrates'

function App() {
  return (
    <ModelProvider>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4">
            <h1 className="text-3xl font-bold text-gray-900">
              Historical Dialogues
            </h1>
          </div>
        </header>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <ChatInterface character={socratesCharacter} />
        </main>
      </div>
    </ModelProvider>
  )
}

export default App