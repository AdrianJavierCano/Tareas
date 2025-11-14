import React from 'react';
import { RefreshIcon } from './Icons';

interface MotivationalQuoteProps {
  quote: string;
  isLoading: boolean;
  onRefresh: () => void;
}

const MotivationalQuote: React.FC<MotivationalQuoteProps> = ({ quote, isLoading, onRefresh }) => {
  return (
    <div className="mt-8 pt-6 border-t-2 border-dashed border-gray-300 dark:border-gray-700 text-center relative">
      <div className="flex justify-center items-center h-16 px-4">
        {isLoading ? (
          <div className="w-full max-w-sm space-y-2.5">
            <div className="relative overflow-hidden h-4 bg-gray-300 dark:bg-gray-600 rounded-full">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-gray-100/50 dark:via-gray-500/30 to-transparent"></div>
            </div>
            <div className="relative overflow-hidden h-4 bg-gray-300 dark:bg-gray-600 rounded-full w-10/12 mx-auto">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-gray-100/50 dark:via-gray-500/30 to-transparent"></div>
            </div>
          </div>
        ) : (
          <p className="text-lg italic text-gray-600 dark:text-gray-300">
            "{quote}"
          </p>
        )}
      </div>
       <button
          onClick={onRefresh}
          disabled={isLoading}
          className="absolute top-6 right-0 p-2 rounded-full text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Obtener nueva frase"
       >
        <RefreshIcon />
      </button>
    </div>
  );
};

export default MotivationalQuote;