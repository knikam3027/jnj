export interface Message {
  id: number;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isEditable?: boolean;
}

export interface ChatSession {
  id: number;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatRequest {
  message: string;
  sessionId?: number;
}

export interface ChatResponse {
  message: Message;
  sessionId: number;
}
