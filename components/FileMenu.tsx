import React, { useState, useRef, useEffect } from 'react';
import { UploadIcon, DownloadIcon } from './Icons';

interface FileMenuProps {
  onImport: () => void;
  onExport: () => void;
}

const FileMenu: React.FC<FileMenuProps> = ({ onImport, onExport }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleImportClick = () => {
    onImport();
    setIsOpen(false);
  };
  
  const handleExportClick = () => {
    onExport();
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-md transition-colors"
      >
        Archivo
      </button>
      {isOpen && (
        <div className="absolute left-0 mt-2 w-56 bg-gray-100 dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-300 dark:border-gray-700">
          <button
            onClick={handleImportClick}
            className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <UploadIcon />
            <span className="ml-3">Importar Tareas desde Archivo...</span>
          </button>
          <button
            onClick={handleExportClick}
            className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <DownloadIcon />
            <span className="ml-3">Exportar Tareas a Archivo...</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default FileMenu;
