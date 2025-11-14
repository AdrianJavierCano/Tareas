import React from 'react';
import { Task } from '../types';
import { CheckIcon, TrashIcon } from './Icons';

interface TaskItemProps {
  task: Task;
  onToggleTask: (id: number) => void;
  onDeleteTask: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleTask, onDeleteTask }) => {
  return (
    <li className={`flex items-center p-4 rounded-lg transition-all duration-500 ${task.completed ? 'bg-green-100 dark:bg-green-900/50 opacity-70' : 'bg-white dark:bg-gray-800 shadow-sm'}`}>
      <button
        onClick={() => onToggleTask(task.id)}
        className={`w-6 h-6 rounded-full border-2 flex-shrink-0 mr-4 flex items-center justify-center transition-all duration-200 ${task.completed ? 'bg-green-500 border-green-500' : 'border-gray-400 dark:border-gray-500 hover:border-blue-500'}`}
        aria-label={task.completed ? 'Marcar tarea como incompleta' : 'Marcar tarea como completa'}
      >
        {task.completed && <CheckIcon />}
      </button>
      <span className={`flex-grow text-gray-800 dark:text-gray-200 transition-all duration-500 ${task.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''}`}>
        {task.text}
      </span>
      <button
        onClick={() => onDeleteTask(task.id)}
        className="ml-4 p-2 rounded-full text-gray-400 dark:text-gray-500 hover:bg-red-100 dark:hover:bg-red-900/50 hover:text-red-500 transition-colors"
        aria-label="Eliminar tarea"
      >
        <TrashIcon />
      </button>
    </li>
  );
};

export default TaskItem;