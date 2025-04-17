import { create } from 'zustand';
import { ChatMessage, LowConfidenceQuery } from '../types';

interface ChatState {
  messages: ChatMessage[];
  lowConfidenceQueries: LowConfidenceQuery[];
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  updateQueryStatus: (id: string, status: LowConfidenceQuery['status']) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  lowConfidenceQueries: [],
  addMessage: (message) => {
    const newMessage: ChatMessage = {
      id: Math.random().toString(36).substring(7),
      timestamp: new Date().toISOString(),
      ...message,
    };

    set((state) => ({
      messages: [...state.messages, newMessage],
      lowConfidenceQueries: message.role === 'assistant' && message.confidenceScore < 0.6
        ? [...state.lowConfidenceQueries, {
            id: newMessage.id,
            query: state.messages[state.messages.length - 1]?.content || '',
            response: message.content,
            confidenceScore: message.confidenceScore,
            timestamp: newMessage.timestamp,
            status: 'pending',
          }]
        : state.lowConfidenceQueries,
    }));
  },
  updateQueryStatus: (id, status) => {
    set((state) => ({
      lowConfidenceQueries: state.lowConfidenceQueries.map((query) =>
        query.id === id ? { ...query, status } : query
      ),
    }));
  },
}));