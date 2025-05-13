export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: number;
  createdAt: string;
  dueDate?: string;
}

export type TaskStatus = 'all' | 'active' | 'completed';

export type ThemeMode = 'light' | 'dark';

export interface AppState {
  tasks: Task[];
  filter: TaskStatus;
  theme: ThemeMode;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'priority'>) => void;
  editTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTaskStatus: (id: string) => void;
  reorderTasks: (sourceIndex: number, destinationIndex: number) => void;
  setFilter: (filter: TaskStatus) => void;
  toggleTheme: () => void;
}