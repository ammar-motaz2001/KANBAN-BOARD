'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { taskService } from '@/services/task.service';
import type { Task, CreateTaskInput, UpdateTaskInput } from '@/types/task.types';

/**
 * Custom hook to fetch all tasks
 * 
 * Uses React Query to fetch and cache all tasks from the API.
 * Data is cached for 5 minutes and persists for 10 minutes.
 * 
 * @returns React Query result object with tasks data, loading state, and error
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
 * Custom hook to fetch a single task by ID
 * 
 * Uses React Query to fetch and cache a specific task.
 * Only fetches if a valid ID is provided.
 * 
 * @param id - The ID of the task to fetch
 * @returns React Query result object with task data, loading state, and error
 */
export function useTask(id: number) {
  return useQuery({
    queryKey: ['tasks', id],
    queryFn: () => taskService.getTaskById(id),
    enabled: !!id,
  });
}

/**
 * Custom hook to create a new task
 * 
 * Uses React Query mutation with optimistic updates for instant UI feedback.
 * Automatically updates the cache and refetches to ensure consistency.
 * 
 * @returns React Query mutation object with mutate function and mutation state
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
 * Custom hook to update an existing task
 * 
 * Uses React Query mutation with optimistic updates for instant UI feedback.
 * Automatically updates the cache and refetches to ensure consistency.
 * 
 * @returns React Query mutation object with mutate function and mutation state
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
 * Custom hook to delete a task
 * 
 * Uses React Query mutation with optimistic updates for instant UI feedback.
 * Automatically updates the cache and refetches to ensure consistency.
 * 
 * @returns React Query mutation object with mutate function and mutation state
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
