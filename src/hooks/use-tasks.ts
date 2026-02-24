'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { taskService } from '@/services/task.service';
import type { Task, CreateTaskInput, UpdateTaskInput } from '@/types/task.types';

/**
 * Fetch all tasks with React Query caching
 * Data stays fresh for 5 minutes, cached for 10
 */
export function useTasks() {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: () => taskService.getAllTasks(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (gcTime in v5)
    refetchOnWindowFocus: false,
  });
}

/**
 * Fetch a single task by ID
 * Only runs if you give it a valid ID
 */
export function useTask(id: number) {
  return useQuery({
    queryKey: ['tasks', id],
    queryFn: () => taskService.getTaskById(id),
    enabled: !!id,
  });
}

/**
 * Create a new task
 * Does optimistic updates so the UI feels instant
 */
export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (task: CreateTaskInput) => taskService.createTask(task),
    onSuccess: async (newTask) => {
      // Optimistically update the cache
      queryClient.setQueryData(['tasks'], (oldTasks: any[] = []) => {
        return [...oldTasks, newTask];
      });
      // Invalidate to ensure consistency
      await queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
}

/**
 * Update an existing task
 * Optimistic updates for instant feedback
 */
export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, task }: { id: number; task: UpdateTaskInput }) =>
      taskService.updateTask(id, task),
    onSuccess: async (updatedTask) => {
      // Optimistically update the cache
      queryClient.setQueryData(['tasks'], (oldTasks: any[] = []) => {
        return oldTasks.map(t => t.id === updatedTask.id ? updatedTask : t);
      });
      // Invalidate to ensure consistency
      await queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
}

/**
 * Delete a task
 * Optimistic updates so it disappears immediately
 */
export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => taskService.deleteTask(id),
    onSuccess: async (_, deletedId) => {
      // Optimistically update the cache
      queryClient.setQueryData(['tasks'], (oldTasks: any[] = []) => {
        return oldTasks.filter(t => t.id !== deletedId);
      });
      // Invalidate to ensure consistency
      await queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
}
