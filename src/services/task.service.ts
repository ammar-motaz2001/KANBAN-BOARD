import type { Task, CreateTaskInput, UpdateTaskInput } from '@/types/task.types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

/**
 * Task service for API operations
 * 
 * Provides methods for CRUD operations on tasks.
 * All methods return promises and throw errors on failure.
 */
export const taskService = {
  /**
   * Fetches all tasks from the API
   * 
   * @returns Promise resolving to an array of tasks
   * @throws Error if the request fails
   */
  async getAllTasks(): Promise<Task[]> {
    const response = await fetch(`${API_BASE_URL}/tasks`);
    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }
    return response.json();
  },

  /**
   * Fetches a single task by ID
   * 
   * @param id - The ID of the task to fetch
   * @returns Promise resolving to the task
   * @throws Error if the request fails
   */
  async getTaskById(id: number): Promise<Task> {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch task');
    }
    return response.json();
  },

  /**
   * Creates a new task
   * 
   * @param task - The task data to create
   * @returns Promise resolving to the created task
   * @throws Error if the request fails
   */
  async createTask(task: CreateTaskInput): Promise<Task> {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      throw new Error('Failed to create task');
    }
    return response.json();
  },

  /**
   * Updates an existing task
   * 
   * @param id - The ID of the task to update
   * @param task - The partial task data to update
   * @returns Promise resolving to the updated task
   * @throws Error if the request fails
   */
  async updateTask(id: number, task: UpdateTaskInput): Promise<Task> {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      throw new Error('Failed to update task');
    }
    return response.json();
  },

  /**
   * Deletes a task
   * 
   * @param id - The ID of the task to delete
   * @returns Promise that resolves when the task is deleted
   * @throws Error if the request fails
   */
  async deleteTask(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete task');
    }
  },
};
