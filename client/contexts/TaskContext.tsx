"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { taskApi } from "../lib/api/task.api";
import {
  Task,
  CreateTaskData,
  UpdateTaskData,
  TaskFilters,
  TasksResponse,
  TaskStats,
} from "../lib/types";
import toast from "react-hot-toast";

interface TaskContextType {
  tasks: Task[];
  pagination: TasksResponse["pagination"] | null;
  stats: TaskStats | null;
  isLoading: boolean;
  filters: TaskFilters;
  fetchTasks: (filters?: TaskFilters) => Promise<void>;
  fetchTaskStats: () => Promise<void>;
  createTask: (data: CreateTaskData) => Promise<void>;
  updateTask: (id: number, data: UpdateTaskData) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  toggleTaskStatus: (id: number) => Promise<void>;
  setFilters: (filters: TaskFilters) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [pagination, setPagination] = useState<
    TasksResponse["pagination"] | null
  >(null);
  const [stats, setStats] = useState<TaskStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<TaskFilters>({
    page: 1,
    limit: 10,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const fetchTasks = async (newFilters?: TaskFilters) => {
    try {
      setIsLoading(true);
      const appliedFilters = newFilters || filters;
      const response = await taskApi.getTasks(appliedFilters);
      setTasks(response.tasks);
      setPagination(response.pagination);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch tasks";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTaskStats = async () => {
    try {
      const statsData = await taskApi.getTaskStats();
      setStats(statsData);
    } catch (error: any) {
      console.error("Failed to fetch task stats:", error);
    }
  };

  const createTask = async (data: CreateTaskData) => {
    try {
      setIsLoading(true);
      await taskApi.createTask(data);
      toast.success("Task created successfully!");
      await fetchTasks(filters);
      await fetchTaskStats();
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to create task";
      toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateTask = async (id: number, data: UpdateTaskData) => {
    try {
      setIsLoading(true);
      await taskApi.updateTask(id, data);
      toast.success("Task updated successfully!");
      await fetchTasks(filters);
      await fetchTaskStats();
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to update task";
      toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      setIsLoading(true);
      await taskApi.deleteTask(id);
      toast.success("Task deleted successfully!");
      await fetchTasks(filters);
      await fetchTaskStats();
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to delete task";
      toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTaskStatus = async (id: number) => {
    try {
      await taskApi.toggleTaskStatus(id);
      toast.success("Task status updated!");
      await fetchTasks(filters);
      await fetchTaskStats();
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to toggle task status";
      toast.error(errorMessage);
      throw error;
    }
  };

  const value: TaskContextType = {
    tasks,
    pagination,
    stats,
    isLoading,
    filters,
    fetchTasks,
    fetchTaskStats,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
    setFilters,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};
