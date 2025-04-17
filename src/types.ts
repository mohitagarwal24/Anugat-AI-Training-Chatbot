export interface User {
  id: string;
  email: string;
  role: 'admin';
}

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: string;
  confidenceScore: number;
}

export interface LowConfidenceQuery {
  id: string;
  query: string;
  response: string;
  confidenceScore: number;
  timestamp: string;
  status: 'pending' | 'resolved' | 'flagged';
}

export interface DashboardMetrics {
  totalQueries: number;
  averageConfidence: number;
  lowConfidenceCount: number;
  responseTime: number;
}