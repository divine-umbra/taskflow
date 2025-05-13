import React from 'react';
import { CheckSquare } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { requestNotificationPermission } from '../utils/helpers';

const Header: React.FC<{ onAddTask: () => void }> = ({ onAddTask }) => {
  // Request notification permission when the component mounts
  React.useEffect(() => {
    requestNotificationPermission();
  }, []);

  return (
    <header className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-10 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <CheckSquare size={24} className="text-blue-500" />
          <h1 className="ml-2 text-xl font-bold text-gray-800 dark:text-white">
            TaskFlow
          </h1>
        </div>

        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <button
            onClick={onAddTask}
            className="ml-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >
            Add Task
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;