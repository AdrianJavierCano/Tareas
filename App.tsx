import React, { useState, useEffect, useCallback } from 'react';
import { Task } from './types';
import { generateMotivationalQuote } from './services/geminiService';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import MotivationalQuote from './components/MotivationalQuote';
import { WindowIcon, XIcon, MinusIcon, MaximizeIcon } from './components/Icons';
import FileMenu from './components/FileMenu';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const savedTasks = localStorage.getItem('tasks');
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch (error) {
      console.error('Error reading tasks from localStorage', error);
      return [];
    }
  });
  
  const [quote, setQuote] = useState<string>('');
  const [isQuoteLoading, setIsQuoteLoading] = useState<boolean>(true);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const fetchQuote = useCallback(async () => {
    setIsQuoteLoading(true);
    try {
      const newQuote = await generateMotivationalQuote();
      setQuote(newQuote);
    } catch (error) {
      console.error("Failed to fetch motivational quote:", error);
      setQuote("El secreto para salir adelante es empezar. – Mark Twain");
    } finally {
      setIsQuoteLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQuote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddTask = (text: string) => {
    const newTask: Task = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTasks(prevTasks => [newTask, ...prevTasks]);
    fetchQuote();
  };

  const handleToggleTask = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
    if (tasks.length <= 1) { // Fetch new quote if list becomes empty
        fetchQuote();
    }
  };

  const handleExportTasks = useCallback(() => {
    if (tasks.length === 0) {
      alert("No hay tareas para exportar.");
      return;
    }
    try {
      const dataStr = JSON.stringify(tasks, null, 2);
      const dataBlob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement("a");
      link.download = `zentask-backup-${new Date().toISOString().slice(0, 10)}.json`;
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting tasks:", error);
      alert("Ocurrió un error al exportar las tareas.");
    }
  }, [tasks]);

  const handleImportTasks = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = e => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = event => {
        try {
          const content = event.target?.result;
          if (typeof content !== 'string') {
            throw new Error("El contenido del archivo no es válido.");
          }
          const importedTasks: unknown = JSON.parse(content);
          
          if (
            !Array.isArray(importedTasks) ||
            !importedTasks.every(
              (task: any) =>
                typeof task.id === 'number' &&
                typeof task.text === 'string' &&
                typeof task.completed === 'boolean'
            )
          ) {
            throw new Error("El archivo no tiene el formato de tareas esperado.");
          }

          if (window.confirm("¿Deseas reemplazar tu lista actual de tareas con las del archivo? Esta acción no se puede deshacer.")) {
            setTasks(importedTasks as Task[]);
          }
        } catch (error) {
          console.error("Error importing tasks:", error);
          alert(`Error al importar tareas: ${error instanceof Error ? error.message : 'Error desconocido'}`);
        }
      };
      reader.onerror = () => {
        alert("No se pudo leer el archivo.");
      };
      reader.readAsText(file);
    };
    input.click();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900">
      <div className="w-full max-w-2xl mx-auto bg-gray-100 dark:bg-gray-900 rounded-lg shadow-2xl overflow-hidden border border-gray-300 dark:border-gray-700 transform transition-all duration-300 hover:shadow-3xl">
        {/* Fake Window Title Bar */}
        <div className="flex items-center justify-between h-10 bg-gray-200 dark:bg-gray-800 px-4 border-b border-gray-300 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <WindowIcon />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 mr-2">ZenTask</span>
            <FileMenu onImport={handleImportTasks} onExport={handleExportTasks} />
          </div>
          <div className="flex items-center space-x-2">
            <button className="w-5 h-5 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-full transition-colors">
              <MinusIcon />
            </button>
            <button className="w-5 h-5 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-full transition-colors">
              <MaximizeIcon />
            </button>
            <button className="w-5 h-5 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white rounded-full transition-colors">
              <XIcon />
            </button>
          </div>
        </div>
        
        {/* App Content */}
        <div className="p-6 md:p-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-2">Enfócate en Hoy</h1>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-6">¿Cuál es tu objetivo principal?</p>
          
          <TaskInput onAddTask={handleAddTask} />
          
          <div className="mt-8">
            <TaskList tasks={tasks} onToggleTask={handleToggleTask} onDeleteTask={handleDeleteTask} />
          </div>
          
          <MotivationalQuote quote={quote} isLoading={isQuoteLoading} onRefresh={fetchQuote} />
        </div>
      </div>
    </div>
  );
};

export default App;