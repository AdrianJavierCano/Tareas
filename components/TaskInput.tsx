import React, { useState } from 'react';
import { PlusIcon, CheckIcon } from './Icons';

interface TaskInputProps {
  onAddTask: (text: string) => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ onAddTask }) => {
  const [text, setText] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && !isSuccess) {
      onAddTask(text.trim());
      setText('');
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
      }, 2000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-3">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ej: Terminar la propuesta del proyecto"
        className="flex-grow w-full px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-800 dark:text-gray-100 transition-shadow"
      />
      <button
        type="submit"
        disabled={isSuccess}
        className={`flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-900 transform hover:scale-105 transition-all duration-300 ${
          isSuccess
            ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
            : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
        }`}
        aria-label="Añadir tarea"
      >
        {isSuccess ? <CheckIcon /> : <PlusIcon />}
      </button>
    </form>
  );
};

export default TaskInput;