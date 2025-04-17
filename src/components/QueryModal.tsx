import React from 'react';
import { X } from 'lucide-react';
import { LowConfidenceQuery } from '../types';
import { ConfidenceBadge } from './ConfidenceBadge';
import ReactMarkdown from 'react-markdown';

interface QueryModalProps {
  query: LowConfidenceQuery;
  onClose: () => void;
}

export const QueryModal: React.FC<QueryModalProps> = ({ query, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto transform transition-all">
        <div className="flex justify-between items-center p-5 border-b border-gray-200 sticky top-0 bg-white z-10">
          <h2 className="text-2xl font-bold text-gray-800">Query Details</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200 focus:outline-none"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Query</h3>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm">
              <p className="text-gray-800 whitespace-pre-wrap">{query.query}</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Response</h3>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm prose prose-sm max-w-none">
              <ReactMarkdown>{query.response}</ReactMarkdown>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div className="flex items-center">
              <span className="text-gray-700 mr-2 font-medium">Confidence Score:</span>
              <ConfidenceBadge score={query.confidenceScore} />
            </div>
            <div className="text-sm text-gray-500">
              {new Date(query.timestamp).toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 