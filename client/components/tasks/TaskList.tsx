"use client";

import { useTasks } from "@/contexts/TaskContext";
import { TaskCard } from "./TaskCard";
import { Button } from "@/components/ui/Button";
import { Loader } from "@/components/ui/Loader";
import styles from "./styles.module.css";

export function TaskList() {
  const { tasks, isLoading, pagination, setFilters, filters } = useTasks();

  if (isLoading) {
    return <Loader />;
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className={styles.emptyState}>
        <h3>No tasks found</h3>
        <p>Create your first task to get started!</p>
      </div>
    );
  }

  return (
    <div className={styles.taskListContainer}>
      <div className={styles.taskList}>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>

      {pagination && pagination.totalPages > 1 && (
        <div className={styles.pagination}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setFilters({ ...filters, page: filters.page - 1 })}
            disabled={!pagination.hasPrev}
          >
            Previous
          </Button>

          <span className={styles.paginationInfo}>
            Page {pagination.page} of {pagination.totalPages}
          </span>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
            disabled={!pagination.hasNext}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
