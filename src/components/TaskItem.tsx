import React, { useRef } from 'react';
import { Task } from '../types';
import { Check, Grip, Pencil, Trash2 } from 'lucide-react';
import { formatDate } from '../utils/helpers';
import { useAppContext } from '../context/AppContext';

interface TaskItemProps {
  task: Task;
  index: number;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  onDragEnter: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  onDragEnd: () => void;
  onEdit: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  index,
  onDragStart,
  onDragEnter,
  onDragEnd,
  onEdit,
}) => {
  const { toggleTaskStatus, deleteTask } = useAppContext();
  const itemRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={itemRef}
      className={`group relative flex items-center gap-3 p-4 mb-3 rounded-lg transition-all duration-300 transform 
        ${task.completed ? 'bg-gray-50 dark:bg-gray-800/50' : 'bg-white dark:bg-gray-800'} 
        hover:shadow-md border border-gray-100 dark:border-gray-700`}
      draggable
      onDragStart={(e) => onDragStart(e, index)}
      onDragEnter={(e) => onDragEnter(e, index)}
      onDragEnd={onDragEnd}
      onDragOver={(e) => e.preventDefault()}
    >
      {/* Drag Handle */}
      <div className="cursor-grab opacity-40 hover:opacity-100 transition-opacity">
        <Grip size={18} className="text-gray-500 dark:text-gray-400" />
      </div>

      {/* Completion Checkbox */}
      <button
        onClick={() => toggleTaskStatus(task.id)}
        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 transition-colors duration-200
          ${
            task.completed
              ? 'bg-emerald-500 border-emerald-500 dark:bg-emerald-600 dark:border-emerald-600'
              : 'border-gray-300 dark:border-gray-600'
          } 
          flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
        aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
      >
        {task.completed && <Check size={14} className="text-white" />}
      </button>

      {/* Task Content */}
      <div className="flex-1 min-w-0">
        <h3 
          className={`text-base font-medium truncate transition-colors
            ${
              task.completed
                ? 'text-gray-400 dark:text-gray-500 line-through'
                : 'text-gray-800 dark:text-gray-200'
            }`}
        >
          {task.title}
        </h3>
        {task.description && (
          <p 
            className={`mt-1 text-sm truncate transition-colors
              ${
                task.completed
                  ? 'text-gray-400 dark:text-gray-500'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
          >
            {task.description}
          </p>
        )}
        {task.dueDate && (
          <p 
            className={`mt-1 text-xs
              ${
                task.completed
                  ? 'text-gray-400 dark:text-gray-500'
                  : 'text-blue-500 dark:text-blue-400'
              }`}
          >
            Due: {formatDate(task.dueDate)}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onEdit(task)}
          className="p-1.5 rounded-full text-gray-400 hover:text-blue-500 dark:text-gray-500 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Edit task"
        >
          <Pencil size={16} />
        </button>
        <button
          onClick={() => deleteTask(task.id)}
          className="p-1.5 rounded-full text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Delete task"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;