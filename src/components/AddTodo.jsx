import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ChevronDown, Tag, Flag } from 'lucide-react';

const priorities = [
  { value: 'low', label: 'Low', color: 'text-success' },
  { value: 'medium', label: 'Medium', color: 'text-warning' },
  { value: 'high', label: 'High', color: 'text-error' },
];

const categories = [
  { value: 'personal', label: 'Personal', icon: '🏠' },
  { value: 'work', label: 'Work', icon: '💼' },
  { value: 'health', label: 'Health', icon: '💪' },
  { value: 'learning', label: 'Learning', icon: '📚' },
];

export function AddTodo({ onAdd }) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState('personal');
  const [showOptions, setShowOptions] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim(), priority, category);
      setText('');
      setShowOptions(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      onSubmit={handleSubmit}
      className="glass-effect rounded-2xl p-4 glow"
    >
      <div className="flex gap-3">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-1 bg-background/50 border border-border rounded-xl px-4 py-3 text-text placeholder-textSecondary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-primary to-accent text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 hover:shadow-lg hover:shadow-primary/25 transition-shadow"
        >
          <Plus className="w-5 h-5" />
          Add
        </motion.button>
      </div>

      <button
        type="button"
        onClick={() => setShowOptions(!showOptions)}
        className="flex items-center gap-2 mt-3 text-textSecondary hover:text-text transition-colors text-sm"
      >
        <ChevronDown className={`w-4 h-4 transition-transform ${showOptions ? 'rotate-180' : ''}`} />
        {showOptions ? 'Hide options' : 'More options'}
      </button>

      <AnimatePresence>
        {showOptions && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-border">
              {/* Priority Selection */}
              <div className="flex items-center gap-2">
                <Flag className="w-4 h-4 text-textSecondary" />
                <span className="text-sm text-textSecondary">Priority:</span>
                <div className="flex gap-1">
                  {priorities.map((p) => (
                    <button
                      key={p.value}
                      type="button"
                      onClick={() => setPriority(p.value)}
                      className={`px-3 py-1 rounded-lg text-sm transition-all ${
                        priority === p.value
                          ? 'bg-surface border border-primary text-text'
                          : 'bg-background/50 border border-border text-textSecondary hover:border-primary/50'
                      }`}
                    >
                      <span className={p.color}>{p.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Selection */}
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-textSecondary" />
                <span className="text-sm text-textSecondary">Category:</span>
                <div className="flex gap-1">
                  {categories.map((c) => (
                    <button
                      key={c.value}
                      type="button"
                      onClick={() => setCategory(c.value)}
                      className={`px-3 py-1 rounded-lg text-sm transition-all ${
                        category === c.value
                          ? 'bg-surface border border-primary text-text'
                          : 'bg-background/50 border border-border text-textSecondary hover:border-primary/50'
                      }`}
                    >
                      {c.icon} {c.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.form>
  );
}
