'use client';

import { useState, useEffect } from 'react';
import type { Task, TaskColumn, TaskPriority, CreateTaskInput, UpdateTaskInput } from '@/types/task.types';

interface UseTaskDialogProps {
  task?: Task | null;
  open: boolean;
}

interface UseTaskDialogReturn {
  title: string;
  description: string;
  column: TaskColumn;
  priority: TaskPriority;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setColumn: (column: TaskColumn) => void;
  setPriority: (priority: TaskPriority) => void;
  handleSave: () => CreateTaskInput | UpdateTaskInput | null;
  reset: () => void;
}

/**
 * Custom hook for managing task dialog form state
 * @param props - Dialog props containing task and open state
 * @returns Form state and handlers for task dialog
 */
export function useTaskDialog({ task, open }: UseTaskDialogProps): UseTaskDialogReturn {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [column, setColumn] = useState<TaskColumn>('backlog');
  const [priority, setPriority] = useState<TaskPriority>('low');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setColumn(task.column);
      setPriority(task.priority || 'low');
    } else {
      reset();
    }
  }, [task, open]);

  const reset = () => {
    setTitle('');
    setDescription('');
    setColumn('backlog');
    setPriority('low');
  };

  const handleSave = (): CreateTaskInput | UpdateTaskInput | null => {
    if (!title.trim()) {
      return null;
    }

    return {
      title: title.trim(),
      description: description.trim(),
      column,
      priority,
    };
  };

  return {
    title,
    description,
    column,
    priority,
    setTitle,
    setDescription,
    setColumn,
    setPriority,
    handleSave,
    reset,
  };
}
