import React from 'react';
import { Task } from '../types';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: number) => void;
  onDeleteTask: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleTask, onDeleteTask }) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-10 px-4 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
        <p className="text-gray-500 dark:text-gray-400">Aún no hay tareas. ¡Añade una para empezar!</p>
        <p className="text-2xl mt-2">🎉</p>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleTask={onToggleTask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </ul>
  );
};

export default TaskList;