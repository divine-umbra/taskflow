import React from 'react';
import { Github, Info } from 'lucide-react';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="py-6 px-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between">
        <div className="mb-4 sm:mb-0 flex items-center">
          <Info size={16} className="text-gray-400 dark:text-gray-500 mr-2" />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <span className="font-medium">TaskFlow</span> - {year} © All rights reserved
          </p>
        </div>
        
        <div className="flex space-x-4">
          <a
            href="#"
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
          <a
            href="#"
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
          >
            Privacy
          </a>
          <a
            href="#"
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
          >
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;