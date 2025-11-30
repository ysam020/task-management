import { TaskStatus } from "../types";
import { alpha } from "@mui/material";
import {
  CheckBox,
  IndeterminateCheckBox,
  CheckBoxOutlineBlank,
  TrendingUp,
  RadioButtonUnchecked,
  AccessTime,
  CheckCircle,
} from "@mui/icons-material";

/**
 * Task status options for dropdowns and filters
 */
export const TASK_STATUS_OPTIONS = [
  { value: TaskStatus.PENDING, label: "Pending" },
  { value: TaskStatus.IN_PROGRESS, label: "In Progress" },
  { value: TaskStatus.COMPLETED, label: "Completed" },
] as const;

/**
 * Task status visual configuration
 */
export const TASK_STATUS_CONFIG = {
  [TaskStatus.PENDING]: {
    color: "#f59e0b",
    bgColor: alpha("#f59e0b", 0.1),
    icon: CheckBoxOutlineBlank,
    label: "Pending",
  },
  [TaskStatus.IN_PROGRESS]: {
    color: "#8b5cf6",
    bgColor: alpha("#8b5cf6", 0.1),
    icon: IndeterminateCheckBox,
    label: "In Progress",
  },
  [TaskStatus.COMPLETED]: {
    color: "#10b981",
    bgColor: alpha("#10b981", 0.1),
    icon: CheckBox,
    label: "Completed",
  },
} as const;

/**
 * Statistics items configuration for dashboard
 */
export const STAT_ITEMS = [
  {
    key: "total",
    label: "Total",
    icon: TrendingUp,
    color: "#3b82f6",
    bgColor: alpha("#3b82f6", 0.1),
  },
  {
    key: "pending",
    label: "Pending",
    icon: RadioButtonUnchecked,
    color: "#f59e0b",
    bgColor: alpha("#f59e0b", 0.1),
  },
  {
    key: "inProgress",
    label: "In Progress",
    icon: AccessTime,
    color: "#8b5cf6",
    bgColor: alpha("#8b5cf6", 0.1),
  },
  {
    key: "completed",
    label: "Completed",
    icon: CheckCircle,
    color: "#10b981",
    bgColor: alpha("#10b981", 0.1),
  },
] as const;

/**
 * Sort by options for task lists
 */
export const SORT_OPTIONS = [
  { value: "createdAt", label: "Created Date" },
  { value: "updatedAt", label: "Updated Date" },
  { value: "title", label: "Title" },
] as const;

/**
 * Sort order options
 */
export const SORT_ORDER_OPTIONS = [
  { value: "asc", label: "Ascending" },
  { value: "desc", label: "Descending" },
] as const;

/**
 * Items per page options for pagination
 */
export const ITEMS_PER_PAGE_OPTIONS = [10, 20, 50, 100] as const;

/**
 * Default pagination settings
 */
export const DEFAULT_PAGINATION = {
  page: 1,
  limit: 10,
  sortBy: "createdAt",
  sortOrder: "desc",
} as const;

/**
 * Local storage keys
 */
export const LOCAL_STORAGE_KEYS = {
  VIEW_MODE: "task_view_mode",
  FILTERS: "task_filters",
  SORT_PREFERENCES: "task_sort_preferences",
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
} as const;

/**
 * API endpoints
 */
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
    ME: "/auth/me",
  },
  TASKS: {
    BASE: "/tasks",
    BY_ID: (id: number) => `/tasks/${id}`,
    TOGGLE_STATUS: (id: number) => `/tasks/${id}/toggle`,
    STATS: "/tasks/stats",
  },
} as const;

/**
 * View modes for task list
 */
export const VIEW_MODES = {
  GRID: "grid",
  LIST: "list",
} as const;

/**
 * Breakpoints (match with theme)
 */
export const BREAKPOINTS = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
} as const;

/**
 * Z-index layers
 */
export const Z_INDEX = {
  DRAWER: 1200,
  MODAL: 1300,
  SNACKBAR: 1400,
  TOOLTIP: 1500,
} as const;

/**
 * Animation durations (in milliseconds)
 */
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 250,
  SLOW: 350,
} as const;

/**
 * Debounce delays (in milliseconds)
 */
export const DEBOUNCE_DELAY = {
  SEARCH: 500,
  FILTER: 300,
  RESIZE: 200,
} as const;

/**
 * HTTP status codes
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
} as const;

/**
 * Error messages
 */
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error. Please check your connection.",
  UNAUTHORIZED: "You are not authorized. Please login again.",
  SERVER_ERROR: "Server error. Please try again later.",
  VALIDATION_ERROR: "Please check your input and try again.",
  NOT_FOUND: "The requested resource was not found.",
} as const;

/**
 * Success messages
 */
export const SUCCESS_MESSAGES = {
  TASK_CREATED: "Task created successfully!",
  TASK_UPDATED: "Task updated successfully!",
  TASK_DELETED: "Task deleted successfully!",
  TASK_STATUS_UPDATED: "Task status updated!",
  LOGIN_SUCCESS: "Login successful!",
  REGISTER_SUCCESS: "Registration successful!",
  LOGOUT_SUCCESS: "Logged out successfully!",
} as const;
