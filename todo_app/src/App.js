import React, { useState, useEffect } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all'); 

  // Load tasks from localStorage when the app initializes
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    setTasks(savedTasks);
  }, []);

  // Function to update tasks and save to localStorage immediately
  const updateTasks = (newTasks) => {
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks)); 
  };

  //Adding a new task (prevents empty and duplicate task)
  const addTask = (taskText) => {
    if (taskText.trim() === '') return;
    
    // Check if the task already exists
    if (tasks.some(task => task.text.toLowerCase() === taskText.toLowerCase())) {
      alert('Task already exists!');
      return;
    }
    
    const newTask = { id: Date.now(), text: taskText, completed: false };
    updateTasks([newTask, ...tasks]);
  };

  //Flips a task between true and false
  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    updateTasks(updatedTasks);  
  };

  // Delete a task
  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    updateTasks(updatedTasks);
  };

  //Filtering Tasks (eeturns only the tasks that match the selected filter) 
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true; // Default: Show all tasks
  });

  //Render UI
  return (
    <div className="App">
      <h1>Must-Do List for the Week!</h1>
      <div className="task-header">
        <TodoForm addTask={addTask} />
      </div>

      <div className="filter-buttons">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`} 
          onClick={() => setFilter('all')}
        >
          All
        </button>

        <button 
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`} 
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>

        <button 
          className={`filter-btn ${filter === 'pending' ? 'active' : ''}`} 
          onClick={() => setFilter('pending')}
        >
          Pending
        </button>
      </div>

      <TodoList 
        tasks={filteredTasks} 
        toggleTaskCompletion={toggleTaskCompletion} 
        deleteTask={deleteTask} 
      />
    </div>
  );  
}

export default App;
