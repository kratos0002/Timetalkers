export interface ModelInterface {
    generateResponse(prompt: string, context: ConversationContext): Promise<string>;
    name: string;
    getModelInfo(): ModelInfo;
  }
  
  export interface ModelInfo {
    name: string;
    provider: string;
    capabilities: string[];
    limitations: string[];
  }
  
  export interface ConversationContext {
    character: HistoricalCharacter;
    messageHistory: Message[];
    sessionMetadata: SessionMetadata;
  }
  
  export interface HistoricalCharacter {
    id: string;
    name: string;
    basePrompt: string;
    characteristics: string[];
    dialogueStyle: string;
    methodologyNotes?: string[];
  }
  
  export interface Message {
    id: string;
    content: string;
    sender: 'user' | 'character';
    timestamp: Date;
    metadata?: MessageMetadata;
  }
  
  export interface MessageMetadata {
    modelUsed?: string;
    promptTokens?: number;
    completionTokens?: number;
    processingTime?: number;
  }
  
  export interface SessionMetadata {
    startTime: Date;
    modelVersion: string;
    characterId: string;
  }