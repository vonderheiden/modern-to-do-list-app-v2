import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TodoItem } from './TodoItem';
import { ClipboardList } from 'lucide-react';

export function TodoList({ todos, onToggle, onDelete, onUpdate }) {
  if (todos.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-16 text-center"
      >
        <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center mb-4">
          <ClipboardList className="w-10 h-10 text-textSecondary" />
        </div>
        <h3 className="text-xl font-semibold text-text mb-2">No tasks yet</h3>
        <p className="text-textSecondary">Add your first task to get started!</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="space-y-3"
    >
      <AnimatePresence mode="popLayout">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
