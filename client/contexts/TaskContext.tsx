"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  ReactNode,
} from "react";
import { taskApi } from "../lib/api/task.api";
import {
  Task,
  CreateTaskData,
  UpdateTaskData,
  TaskFilters,
  TasksResponse,
  TaskStats,
  TaskStatus,
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

// Helper function to normalize filters by removing undefined values
const normalizeFilters = (filters: TaskFilters): TaskFilters => {
  const normalized: any = {};
  Object.keys(filters).forEach((key) => {
    const value = (filters as any)[key];
    if (value !== undefined) {
      normalized[key] = value;
    }
  });
  return normalized as TaskFilters;
};

// Helper function to compare filters deeply
const areFiltersEqual = (a: TaskFilters, b: TaskFilters): boolean => {
  const normalizedA = normalizeFilters(a);
  const normalizedB = normalizeFilters(b);
  return JSON.stringify(normalizedA) === JSON.stringify(normalizedB);
};

export const TaskProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [pagination, setPagination] = useState<
    TasksResponse["pagination"] | null
  >(null);
  const [stats, setStats] = useState<TaskStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFiltersState] = useState<TaskFilters>({
    page: 1,
    limit: 10,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  // Track the last filters used for fetching to prevent duplicate calls
  const lastFetchedFiltersRef = useRef<TaskFilters | null>(null);
  const isFetchingRef = useRef(false);

  // Wrapper for setFilters that normalizes the input
  const setFilters = useCallback((newFilters: TaskFilters) => {
    setFiltersState(normalizeFilters(newFilters));
  }, []);

  const fetchTasks = useCallback(async (newFilters?: TaskFilters) => {
    const appliedFilters = normalizeFilters(newFilters || filters);

    // Check if we've already fetched with these exact filters
    if (
      lastFetchedFiltersRef.current &&
      areFiltersEqual(appliedFilters, lastFetchedFiltersRef.current) &&
      isFetchingRef.current
    ) {
      return;
    }

    // Prevent duplicate simultaneous fetches
    if (isFetchingRef.current) {
      return;
    }

    try {
      isFetchingRef.current = true;
      lastFetchedFiltersRef.current = appliedFilters;
      setIsLoading(true);

      const response = await taskApi.getTasks(appliedFilters);
      setTasks(response.tasks);
      setPagination(response.pagination);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch tasks";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
      isFetchingRef.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchTaskStats = useCallback(async () => {
    try {
      const statsData = await taskApi.getTaskStats();
      setStats(statsData);
    } catch (error: any) {
      console.error("Failed to fetch task stats:", error);
    }
  }, []);

  // Auto-fetch when filters change
  useEffect(() => {
    const normalizedFilters = normalizeFilters(filters);

    // Only fetch if filters actually changed
    if (
      !lastFetchedFiltersRef.current ||
      !areFiltersEqual(normalizedFilters, lastFetchedFiltersRef.current)
    ) {
      fetchTasks(normalizedFilters);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

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
    // Store the original task for rollback in case of error
    const originalTask = tasks.find((task) => task.id === id);
    if (!originalTask) return;

    // Calculate the next status
    let newStatus: TaskStatus;
    switch (originalTask.status) {
      case TaskStatus.PENDING:
        newStatus = TaskStatus.IN_PROGRESS;
        break;
      case TaskStatus.IN_PROGRESS:
        newStatus = TaskStatus.COMPLETED;
        break;
      case TaskStatus.COMPLETED:
        newStatus = TaskStatus.PENDING;
        break;
      default:
        newStatus = TaskStatus.PENDING;
    }

    // Optimistic update: Update the UI immediately
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );

    // Update stats optimistically
    if (stats) {
      const statUpdates: Partial<TaskStats> = {};

      // Decrease from old status
      if (originalTask.status === TaskStatus.PENDING) {
        statUpdates.pending = (stats.pending || 0) - 1;
      } else if (originalTask.status === TaskStatus.IN_PROGRESS) {
        statUpdates.inProgress = (stats.inProgress || 0) - 1;
      } else if (originalTask.status === TaskStatus.COMPLETED) {
        statUpdates.completed = (stats.completed || 0) - 1;
      }

      // Increase for new status
      if (newStatus === TaskStatus.PENDING) {
        statUpdates.pending = (statUpdates.pending ?? stats.pending ?? 0) + 1;
      } else if (newStatus === TaskStatus.IN_PROGRESS) {
        statUpdates.inProgress =
          (statUpdates.inProgress ?? stats.inProgress ?? 0) + 1;
      } else if (newStatus === TaskStatus.COMPLETED) {
        statUpdates.completed =
          (statUpdates.completed ?? stats.completed ?? 0) + 1;
      }

      setStats({ ...stats, ...statUpdates });
    }

    try {
      // Make the API call
      await taskApi.toggleTaskStatus(id);
      toast.success("Task status updated!");
    } catch (error: any) {
      // Rollback on error: revert to original task state
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? originalTask : task))
      );

      // Rollback stats
      if (stats) {
        setStats(stats);
      }

      const errorMessage =
        error.response?.data?.message || "Failed to toggle task status";
      toast.error(errorMessage);

      // Optionally refetch to ensure consistency
      await fetchTaskStats();
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
