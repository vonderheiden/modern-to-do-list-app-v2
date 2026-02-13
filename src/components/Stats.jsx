import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export function Stats({ todos }) {
  const total = todos.length;
  const completed = todos.filter(t => t.completed).length;
  const active = total - completed;
  const highPriority = todos.filter(t => t.priority === 'high' && !t.completed).length;

  const stats = [
    { label: 'Total Tasks', value: total, icon: TrendingUp, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Active', value: active, icon: Clock, color: 'text-secondary', bg: 'bg-secondary/10' },
    { label: 'Completed', value: completed, icon: CheckCircle, color: 'text-success', bg: 'bg-success/10' },
    { label: 'High Priority', value: highPriority, icon: AlertCircle, color: 'text-error', bg: 'bg-error/10' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
          className="glass-effect rounded-xl p-4 text-center"
        >
          <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center mx-auto mb-2`}>
            <stat.icon className={`w-5 h-5 ${stat.color}`} />
          </div>
          <p className="text-2xl font-bold text-text">{stat.value}</p>
          <p className="text-xs text-textSecondary">{stat.label}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}
