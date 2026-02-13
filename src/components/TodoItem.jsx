import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Trash2, Edit3, X, Save, Flag } from 'lucide-react';

const priorityColors = {
  low: 'border-success/50 bg-success/10',
  medium: 'border-warning/50 bg-warning/10',
  high: 'border-error/50 bg-error/10',
};

const priorityDots = {
  low: 'bg-success',
  medium: 'bg-warning',
  high: 'bg-error',
};

const categoryIcons = {
  personal: '🏠',
  work: '💼',
  health: '💪',
  learning: '📚',
};

export function TodoItem({ todo, onToggle, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSave = () => {
    if (editText.trim()) {
      onUpdate(todo.id, { text: editText.trim() });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className={`group glass-effect rounded-xl p-4 hover:border-primary/30 transition-all ${
        todo.completed ? 'opacity-60' : ''
      }`}
    >
      <div className="flex items-center gap-4">
        {/* Checkbox */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onToggle(todo.id)}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
            todo.completed
              ? 'bg-gradient-to-r from-primary to-accent border-transparent'
              : 'border-border hover:border-primary'
          }`}
        >
          {todo.completed && <Check className="w-4 h-4 text-white" />}
        </motion.button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSave();
                if (e.key === 'Escape') handleCancel();
              }}
              className="w-full bg-background/50 border border-primary rounded-lg px-3 py-1 text-text focus:outline-none focus:ring-2 focus:ring-primary/20"
              autoFocus
            />
          ) : (
            <p className={`text-text truncate ${todo.completed ? 'line-through text-textSecondary' : ''}`}>
              {todo.text}
            </p>
          )}

          {/* Tags */}
          <div className="flex items-center gap-2 mt-2">
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${priorityColors[todo.priority]}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${priorityDots[todo.priority]}`} />
              {todo.priority}
            </span>
            <span className="text-xs text-textSecondary">
              {categoryIcons[todo.category]} {todo.category}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {isEditing ? (
            <>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleSave}
                className="p-2 text-success hover:bg-success/10 rounded-lg transition-colors"
              >
                <Save className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleCancel}
                className="p-2 text-textSecondary hover:bg-surface rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </>
          ) : (
            <>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsEditing(true)}
                className="p-2 text-textSecondary hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
              >
                <Edit3 className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onDelete(todo.id)}
                className="p-2 text-textSecondary hover:text-error hover:bg-error/10 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </motion.button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
