import axiosInstance from "./axios";
import {
  Task,
  CreateTaskData,
  UpdateTaskData,
  TaskFilters,
  TasksResponse,
  TaskStats,
  ApiResponse,
} from "../types";

export const taskApi = {
  // Get all tasks with filters
  getTasks: async (filters?: TaskFilters): Promise<TasksResponse> => {
    const params = new URLSearchParams();

    if (filters?.page) params.append("page", filters.page.toString());
    if (filters?.limit) params.append("limit", filters.limit.toString());
    if (filters?.status) params.append("status", filters.status);
    if (filters?.search) params.append("search", filters.search);
    if (filters?.sortBy) params.append("sortBy", filters.sortBy);
    if (filters?.sortOrder) params.append("sortOrder", filters.sortOrder);

    const response = await axiosInstance.get<ApiResponse<TasksResponse>>(
      `/tasks?${params.toString()}`
    );
    return response.data.data!;
  },

  // Get single task by ID
  getTaskById: async (id: number): Promise<Task> => {
    const response = await axiosInstance.get<ApiResponse<{ task: Task }>>(
      `/tasks/${id}`
    );
    return response.data.data!.task;
  },

  // Create new task
  createTask: async (data: CreateTaskData): Promise<Task> => {
    const response = await axiosInstance.post<ApiResponse<{ task: Task }>>(
      "/tasks",
      data
    );
    return response.data.data!.task;
  },

  // Update task
  updateTask: async (id: number, data: UpdateTaskData): Promise<Task> => {
    const response = await axiosInstance.patch<ApiResponse<{ task: Task }>>(
      `/tasks/${id}`,
      data
    );
    return response.data.data!.task;
  },

  // Delete task
  deleteTask: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/tasks/${id}`);
  },

  // Toggle task status
  toggleTaskStatus: async (id: number): Promise<Task> => {
    const response = await axiosInstance.post<ApiResponse<{ task: Task }>>(
      `/tasks/${id}/toggle`
    );
    return response.data.data!.task;
  },

  // Get task statistics
  getTaskStats: async (): Promise<TaskStats> => {
    const response = await axiosInstance.get<ApiResponse<{ stats: TaskStats }>>(
      "/tasks/stats"
    );
    return response.data.data!.stats;
  },
};
