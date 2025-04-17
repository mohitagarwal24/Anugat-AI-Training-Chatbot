import React, { useState } from 'react';
import { useChatStore } from '../store/chat';
import { ConfidenceBadge } from '../components/ConfidenceBadge';
import { CheckCircle, Flag, Clock, ExternalLink } from 'lucide-react';
import { QueryModal } from '../components/QueryModal';
import { LowConfidenceQuery } from '../types';
import ReactMarkdown from 'react-markdown';

export const LowConfidence: React.FC = () => {
  const { lowConfidenceQueries, updateQueryStatus } = useChatStore();
  const [selectedQuery, setSelectedQuery] = useState<LowConfidenceQuery | null>(null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'flagged':
        return <Flag className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-600" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'Resolved';
      case 'flagged':
        return 'Flagged';
      default:
        return 'Pending';
    }
  };

  // Function to truncate text to a specific number of words
  const truncateText = (text: string, maxWords: number = 10) => {
    const words = text.split(/\s+/);
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(' ') + '...';
  };

  const openModal = (query: LowConfidenceQuery) => {
    setSelectedQuery(query);
  };

  const closeModal = () => {
    setSelectedQuery(null);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Low Confidence Queries</h1>
        <p className="text-gray-600">
          Review and manage queries where the AI showed low confidence in its responses
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Query
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Response
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Confidence
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {lowConfidenceQueries.map((query) => (
                <tr key={query.id} className="hover:bg-gray-50 cursor-pointer transition-colors duration-150" onClick={() => openModal(query)}>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 flex items-center">
                      <span className="line-clamp-2">{truncateText(query.query)}</span>
                      <ExternalLink className="w-4 h-4 ml-1 text-gray-400 flex-shrink-0" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 flex items-center">
                      <div className="line-clamp-2 prose prose-sm max-w-none">
                        <ReactMarkdown>{truncateText(query.response)}</ReactMarkdown>
                      </div>
                      <ExternalLink className="w-4 h-4 ml-1 text-gray-400 flex-shrink-0" />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <ConfidenceBadge score={query.confidenceScore} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(query.status)}
                      <span className="ml-2 text-sm text-gray-900">
                        {getStatusText(query.status)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateQueryStatus(query.id, 'resolved');
                        }}
                        className="text-green-600 hover:text-green-900 transition-colors duration-150"
                      >
                        Mark Resolved
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateQueryStatus(query.id, 'flagged');
                        }}
                        className="text-red-600 hover:text-red-900 transition-colors duration-150"
                      >
                        Flag
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {lowConfidenceQueries.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    No low confidence queries found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedQuery && (
        <QueryModal query={selectedQuery} onClose={closeModal} />
      )}
    </div>
  );
};