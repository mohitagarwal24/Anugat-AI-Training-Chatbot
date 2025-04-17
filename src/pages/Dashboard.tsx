import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Brain, Clock, AlertTriangle, Zap } from 'lucide-react';
import { useChatStore } from '../store/chat';

const data = [
  { name: 'Mon', confidence: 0.85 },
  { name: 'Tue', confidence: 0.78 },
  { name: 'Wed', confidence: 0.92 },
  { name: 'Thu', confidence: 0.75 },
  { name: 'Fri', confidence: 0.88 },
];

const StatCard: React.FC<{
  title: string;
  value: string;
  icon: React.ReactNode;
  description: string;
}> = ({ title, value, icon, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-2xl font-semibold mt-1">{value}</p>
      </div>
      <div className="p-3 bg-blue-100 rounded-full">
        {icon}
      </div>
    </div>
    <p className="text-sm text-gray-500 mt-2">{description}</p>
  </div>
);

export const Dashboard: React.FC = () => {
  const messages = useChatStore((state) => state.messages);
  const lowConfidenceQueries = useChatStore((state) => state.lowConfidenceQueries);

  const stats = [
    {
      title: 'Total Queries',
      value: messages.filter(m => m.role === 'user').length.toString(),
      icon: <Brain className="w-6 h-6 text-blue-600" />,
      description: 'Total number of queries processed',
    },
    {
      title: 'Average Response Time',
      value: '1.2s',
      icon: <Clock className="w-6 h-6 text-blue-600" />,
      description: 'Average time to process queries',
    },
    {
      title: 'Low Confidence Queries',
      value: lowConfidenceQueries.length.toString(),
      icon: <AlertTriangle className="w-6 h-6 text-blue-600" />,
      description: 'Queries below confidence threshold',
    },
    {
      title: 'System Status',
      value: 'Healthy',
      icon: <Zap className="w-6 h-6 text-blue-600" />,
      description: 'Current system performance status',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600">Monitor your AI chatbot's performance and metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Confidence Score Trend</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 1]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="confidence"
                stroke="#2563eb"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};