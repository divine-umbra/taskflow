import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import TaskItem from './TaskItem';
import { ListX } from 'lucide-react';
import TaskForm from './TaskForm';
import { Task } from '../types';

const TaskList: React.FC = () => {
  const { tasks, filter, reorderTasks } = useAppContext();
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dropIndex, setDropIndex] = useState<number | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  
  // Filter tasks based on the selected filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  // Sort tasks by priority (lower number = higher priority)
  const sortedTasks = [...filteredTasks].sort((a, b) => a.priority - b.priority);

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    // Add a custom drag image or use the default
    try {
      const dragPreview = document.createElement('div');
      dragPreview.classList.add('hidden');
      document.body.appendChild(dragPreview);
      e.dataTransfer.setDragImage(dragPreview, 0, 0);
      setTimeout(() => document.body.removeChild(dragPreview), 0);
    } catch (error) {
      console.error('Error setting drag image:', error);
    }
  };

  const handleDragEnter = (_: React.DragEvent<HTMLDivElement>, index: number) => {
    setDropIndex(index);
  };

  const handleDragEnd = () => {
    if (draggedIndex !== null && dropIndex !== null && draggedIndex !== dropIndex) {
      // Get the actual indices from the sorted and filtered array
      const sourceTask = sortedTasks[draggedIndex];
      const destTask = sortedTasks[dropIndex];
      
      // Find their indices in the original tasks array
      const originalSourceIndex = tasks.findIndex(t => t.id === sourceTask.id);
      const originalDestIndex = tasks.findIndex(t => t.id === destTask.id);
      
      // Reorder tasks in the context
      reorderTasks(originalSourceIndex, originalDestIndex);
    }
    
    // Reset drag state
    setDraggedIndex(null);
    setDropIndex(null);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  return (
    <div className="relative">
      {/* Task Form Modal */}
      <TaskForm 
        isOpen={!!editingTask} 
        onClose={() => setEditingTask(null)} 
        editingTask={editingTask}
      />
      
      {/* Task List */}
      {sortedTasks.length > 0 ? (
        <div>
          {sortedTasks.map((task, index) => (
            <TaskItem
              key={task.id}
              task={task}
              index={index}
              onDragStart={handleDragStart}
              onDragEnter={handleDragEnter}
              onDragEnd={handleDragEnd}
              onEdit={handleEditTask}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center animate-fadeIn">
          <ListX size={48} className="text-gray-300 dark:text-gray-600 mb-4" />
          <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400">No tasks found</h3>
          <p className="mt-1 text-gray-400 dark:text-gray-500">
            {filter === 'all'
              ? 'Add your first task to get started!'
              : filter === 'active'
              ? 'No active tasks. Great job!'
              : 'No completed tasks yet. Make some progress!'}
          </p>
        </div>
      )}
    </div>
  );
};

export default TaskList;