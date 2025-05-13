import React, { createContext, useContext, useEffect, useState } from 'react';
import { AppState, Task, TaskStatus, ThemeMode } from '../types';
import { generateId } from '../utils/helpers';
import { showNotification } from '../utils/notifications';

const AppContext = createContext<AppState | undefined>(undefined);

export const useAppContext = (): AppState => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load tasks from localStorage or use default empty array
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // Load filter from localStorage or default to 'all'
  const [filter, setFilter] = useState<TaskStatus>(() => {
    const savedFilter = localStorage.getItem('taskFilter');
    return (savedFilter as TaskStatus) || 'all';
  });

  // Load theme from localStorage or default to system preference
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme as ThemeMode;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Persist tasks to localStorage when they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Persist filter to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('taskFilter', filter);
  }, [filter]);

  // Persist theme to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // Add a new task
  const addTask = (task: Omit<Task, 'id' | 'createdAt' | 'priority'>) => {
    const newTask: Task = {
      ...task,
      id: generateId(),
      createdAt: new Date().toISOString(),
      priority: tasks.length, // New tasks get lowest priority (highest number)
    };
    
    setTasks((prevTasks) => [newTask, ...prevTasks].map((t, i) => ({ ...t, priority: i })));
    showNotification('Task Added', `"${task.title}" has been added to your tasks.`);
  };

  // Edit an existing task
  const editTask = (id: string, updates: Partial<Task>) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, ...updates } : task))
    );
    showNotification('Task Updated', 'Your task has been updated successfully.');
  };

  // Delete a task
  const deleteTask = (id: string) => {
    const taskToDelete = tasks.find(task => task.id === id);
    setTasks((prevTasks) => {
      const filtered = prevTasks.filter((task) => task.id !== id);
      // Recalculate priorities after deletion
      return filtered.map((task, index) => ({ ...task, priority: index }));
    });
    
    if (taskToDelete) {
      showNotification('Task Deleted', `"${taskToDelete.title}" has been removed.`);
    }
  };

  // Toggle a task's completed status
  const toggleTaskStatus = (id: string) => {
    const taskToToggle = tasks.find(task => task.id === id);
    
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
    
    if (taskToToggle) {
      const status = !taskToToggle.completed ? 'completed' : 'active';
      showNotification(
        `Task ${status === 'completed' ? 'Completed' : 'Activated'}`,
        `"${taskToToggle.title}" is now ${status}.`
      );
    }
  };

  // Reorder tasks using drag and drop
  const reorderTasks = (sourceIndex: number, destinationIndex: number) => {
    if (sourceIndex === destinationIndex) return;

    const reorderedTasks = [...tasks];
    const [removed] = reorderedTasks.splice(sourceIndex, 1);
    reorderedTasks.splice(destinationIndex, 0, removed);

    // Update priorities to match new order
    const updatedTasks = reorderedTasks.map((task, index) => ({
      ...task,
      priority: index,
    }));

    setTasks(updatedTasks);
    showNotification('Tasks Reordered', 'Your task priorities have been updated.');
  };

  // Toggle theme between light and dark
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const value: AppState = {
    tasks,
    filter,
    theme,
    addTask,
    editTask,
    deleteTask,
    toggleTaskStatus,
    reorderTasks,
    setFilter,
    toggleTheme,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};