import { useState, useEffect } from 'react';

const STORAGE_KEY = 'taskflow-todos';

const initialTodos = [
  { id: 1, text: 'Design new landing page mockups', completed: false, priority: 'high', category: 'work' },
  { id: 2, text: 'Review pull requests', completed: true, priority: 'medium', category: 'work' },
  { id: 3, text: 'Buy groceries for the week', completed: false, priority: 'low', category: 'personal' },
  { id: 4, text: 'Schedule dentist appointment', completed: false, priority: 'medium', category: 'personal' },
  { id: 5, text: 'Prepare presentation slides', completed: false, priority: 'high', category: 'work' },
  { id: 6, text: 'Call mom for her birthday', completed: true, priority: 'high', category: 'personal' },
  { id: 7, text: 'Update project documentation', completed: false, priority: 'low', category: 'work' },
];

export function useTodos() {
  const [todos, setTodos] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : initialTodos;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text, priority = 'medium', category = 'personal') => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      priority,
      category,
    };
    setTodos(prev => [newTodo, ...prev]);
  };

  const toggleTodo = (id) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const updateTodo = (id, updates) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, ...updates } : todo
      )
    );
  };

  const clearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  };

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    clearCompleted,
  };
}
