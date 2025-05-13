import React from 'react';
import { TaskStatus } from '../types';
import { useAppContext } from '../context/AppContext';
import { Calendar, Check, CircleDashed, ListFilter } from 'lucide-react';

const TaskFilters: React.FC = () => {
  const { filter, setFilter, tasks } = useAppContext();
  
  const activeCount = tasks.filter(task => !task.completed).length;
  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;

  const filters: { value: TaskStatus; label: string; icon: React.ReactNode; count: number }[] = [
    { 
      value: 'all', 
      label: 'All Tasks', 
      icon: <ListFilter size={16} />, 
      count: totalCount 
    },
    { 
      value: 'active', 
      label: 'Active', 
      icon: <CircleDashed size={16} />, 
      count: activeCount 
    },
    { 
      value: 'completed', 
      label: 'Completed', 
      icon: <Check size={16} />, 
      count: completedCount 
    },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 sm:mb-0 flex items-center">
        <Calendar size={20} className="mr-2 text-blue-500" />
        <span>My Tasks</span>
      </h2>
      
      <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1 shadow-inner">
        {filters.map((item) => (
          <button
            key={item.value}
            onClick={() => setFilter(item.value)}
            className={`flex items-center px-3 py-1.5 text-sm rounded-md transition-all ${
              filter === item.value
                ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
            aria-current={filter === item.value ? 'page' : undefined}
          >
            {item.icon}
            <span className="ml-1.5">{item.label}</span>
            <span className="ml-1.5 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-1.5 py-0.5 rounded-full text-xs">
              {item.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TaskFilters;