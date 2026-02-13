import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { AddTodo } from './components/AddTodo';
import { FilterBar } from './components/FilterBar';
import { TodoList } from './components/TodoList';
import { Stats } from './components/Stats';
import { useTodos } from './hooks/useTodos';

function App() {
  const { todos, addTodo, toggleTodo, deleteTodo, updateTodo, clearCompleted } = useTodos();
  const [filter, setFilter] = useState('all');

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const completedCount = todos.filter(todo => todo.completed).length;
  const hasCompleted = completedCount > 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 pb-12">
        <Header totalTasks={todos.length} completedTasks={completedCount} />
        
        <main className="space-y-6">
          <AddTodo onAdd={addTodo} />
          
          <FilterBar
            filter={filter}
            setFilter={setFilter}
            onClearCompleted={clearCompleted}
            hasCompleted={hasCompleted}
          />
          
          <TodoList
            todos={filteredTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onUpdate={updateTodo}
          />
          
          <Stats todos={todos} />
        </main>
      </div>
    </div>
  );
}

export default App;
