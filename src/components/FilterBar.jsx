import React from 'react';
import { motion } from 'framer-motion';
import { ListFilter, Trash2 } from 'lucide-react';

const filters = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

export function FilterBar({ filter, setFilter, onClearCompleted, hasCompleted }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="flex flex-wrap items-center justify-between gap-4 py-4"
    >
      <div className="flex items-center gap-2">
        <ListFilter className="w-5 h-5 text-textSecondary" />
        <div className="flex bg-surface rounded-xl p-1">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === f.value
                  ? 'bg-primary text-white shadow-lg shadow-primary/25'
                  : 'text-textSecondary hover:text-text'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {hasCompleted && (
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClearCompleted}
          className="flex items-center gap-2 px-4 py-2 text-sm text-error hover:bg-error/10 rounded-xl transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          Clear completed
        </motion.button>
      )}
    </motion.div>
  );
}
