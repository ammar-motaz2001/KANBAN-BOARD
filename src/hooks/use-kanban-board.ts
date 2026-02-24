'use client';

import { useState, useMemo } from 'react';
import {
  DragEndEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { useTasks, useCreateTask, useUpdateTask, useDeleteTask } from './use-tasks';
import type { Task, TaskColumn, CreateTaskInput, UpdateTaskInput } from '@/types/task.types';

/**
 * Handles all the Kanban board logic - drag and drop, search, task operations
 * Returns everything the board component needs to render
 */
export function useKanbanBoard() {
  const { data: tasks = [], isLoading } = useTasks();
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const filteredTasks = useMemo(() => {
    if (!searchQuery.trim()) {
      return tasks;
    }

    const query = searchQuery.toLowerCase();
    return tasks.filter(
      task =>
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query)
    );
  }, [tasks, searchQuery]);

  const tasksByColumn = useMemo(() => {
    const grouped: Record<TaskColumn, Task[]> = {
      backlog: [],
      in_progress: [],
      review: [],
      done: [],
    };

    filteredTasks.forEach(task => {
      if (task.column && grouped[task.column]) {
        grouped[task.column].push(task);
      }
    });

    return grouped;
  }, [filteredTasks]);

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find(t => t.id === event.active.id);
    setActiveTask(task || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) {
      return;
    }

    const task = tasks.find(t => t.id === active.id);
    if (!task) {
      return;
    }

    const validColumns: TaskColumn[] = ['backlog', 'in_progress', 'review', 'done'];
    let newColumn: TaskColumn | null = null;

    if (validColumns.includes(over.id as TaskColumn)) {
      newColumn = over.id as TaskColumn;
    } else {
      const targetTask = tasks.find(t => t.id === over.id);
      if (targetTask) {
        newColumn = targetTask.column;
      }
    }

    if (newColumn && task.column !== newColumn) {
      updateTask.mutate({
        id: task.id,
        task: { column: newColumn },
      });
    }
  };

  const handleAddTask = (column: TaskColumn) => {
    setSelectedTask(null);
    setDialogOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setDialogOpen(true);
  };

  const handleDeleteTask = (id: number) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      setTaskToDelete(task);
      setDeleteDialogOpen(true);
    }
  };

  const handleConfirmDelete = () => {
    if (taskToDelete) {
      deleteTask.mutate(taskToDelete.id);
      setTaskToDelete(null);
    }
  };

  const handleSaveTask = (data: CreateTaskInput | UpdateTaskInput) => {
    if (selectedTask) {
      updateTask.mutate({
        id: selectedTask.id,
        task: data as UpdateTaskInput,
      });
    } else {
      createTask.mutate(data as CreateTaskInput);
    }
    setDialogOpen(false);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setTaskToDelete(null);
  };

  return {
    isLoading,
    searchQuery,
    dialogOpen,
    deleteDialogOpen,
    selectedTask,
    taskToDelete,
    activeTask,
    tasksByColumn,
    sensors,

    setSearchQuery,
    handleDragStart,
    handleDragEnd,
    handleAddTask,
    handleEditTask,
    handleDeleteTask,
    handleConfirmDelete,
    handleSaveTask,
    handleCloseDialog,
    handleCloseDeleteDialog,
  };
}
