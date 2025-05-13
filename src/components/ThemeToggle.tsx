import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useAppContext();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center justify-center w-10 h-10 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 overflow-hidden transition-colors"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div
        className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 ${
          theme === 'dark' ? 'translate-y-full' : 'translate-y-0'
        }`}
      >
        <Sun
          size={20}
          className="text-gray-700 dark:text-gray-300 transition-colors"
        />
      </div>
      <div
        className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 ${
          theme === 'dark' ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <Moon
          size={20}
          className="text-gray-700 dark:text-gray-300 transition-colors"
        />
      </div>
    </button>
  );
};

export default ThemeToggle;