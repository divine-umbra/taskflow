import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import TaskFilters from './components/TaskFilters';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleAddTask = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Header onAddTask={handleAddTask} />
        
        <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8">
          <TaskFilters />
          <TaskList />
          <TaskForm isOpen={isFormOpen} onClose={handleCloseForm} />
        </main>
        
        <Footer />
      </div>
    </AppProvider>
  );
}

export default App;