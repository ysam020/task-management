import { TaskStatus } from "../types";

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) {
    return "Today";
  } else if (diffInDays === 1) {
    return "Yesterday";
  } else if (diffInDays < 7) {
    return `${diffInDays} days ago`;
  } else {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
};

export const getStatusColor = (status: TaskStatus): string => {
  switch (status) {
    case TaskStatus.PENDING:
      return "#f59e0b";
    case TaskStatus.IN_PROGRESS:
      return "#8b5cf6";
    case TaskStatus.COMPLETED:
      return "#10b981";
    default:
      return "#6b7280";
  }
};

export const getStatusLabel = (status: TaskStatus): string => {
  switch (status) {
    case TaskStatus.PENDING:
      return "Pending";
    case TaskStatus.IN_PROGRESS:
      return "In Progress";
    case TaskStatus.COMPLETED:
      return "Completed";
    default:
      return status;
  }
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};
