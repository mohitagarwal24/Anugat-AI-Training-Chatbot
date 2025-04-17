import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { useChatStore } from '../store/chat';
import { ConfidenceBadge } from '../components/ConfidenceBadge';
import { GoogleGenAI } from '@google/genai';
import ReactMarkdown from 'react-markdown';

const genai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
});


const generateResponse = async (message: string) => {
  const response = await genai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: message,
  });
  return response.text;
};

const generateConfidenceScore = () => {
  const score = Math.random()*0.8 + 0.2;
  return score;
};

export const Chat: React.FC = () => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, addMessage } = useChatStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);

    // Add user message
    addMessage({
      content: userMessage,
      role: 'user',
      confidenceScore: 1,
    });

    // Get AI response
    try {
      const response = await generateResponse(userMessage);
      addMessage({
        content: response || 'Blank response from AI',
        role: 'assistant',
        confidenceScore: generateConfidenceScore(),
      });
    } catch (error) {
      console.error('Error getting AI response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Chat Testing</h1>
        <p className="text-gray-600">Test and monitor the AI chatbot's responses</p>
      </div>

      <div className="flex-1 bg-white rounded-lg shadow-md p-4 mb-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${
                message.role === 'assistant' ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              <div
                className={`p-2 rounded-full ${
                  message.role === 'assistant' ? 'bg-blue-100' : 'bg-gray-100'
                }`}
              >
                {message.role === 'assistant' ? (
                  <Bot className="w-5 h-5 text-blue-600" />
                ) : (
                  <User className="w-5 h-5 text-gray-600" />
                )}
              </div>
              <div
                className={`flex-1 p-4 rounded-lg ${
                  message.role === 'assistant'
                    ? 'bg-blue-50'
                    : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">
                    {message.role === 'assistant' ? 'AI Assistant' : 'You'}
                  </span>
                  {message.role === 'assistant' && (
                    <ConfidenceBadge score={message.confidenceScore} />
                  )}
                </div>
                {message.role === 'assistant' ? (
                  <div className="text-gray-700">
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                  </div>
                ) : (
                  <p className="text-gray-700">{message.content}</p>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {isLoading && (
        <div className="flex justify-center mb-4">
          <div className="loader">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          disabled={isLoading}
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};