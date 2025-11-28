"use client";

import { useEffect, useState } from "react";
import { useTasks } from "@/contexts/TaskContext";
import { Button } from "@/components/ui/Button";
import { TaskList } from "@/components/tasks/TaskList";
import { TaskFilters } from "@/components/tasks/TaskFilters";
import { TaskForm } from "@/components/tasks/TaskForm";
import { TaskStats } from "@/components/tasks/TaskStats";
import { Modal } from "@/components/ui/Modal";
import styles from "./styles.module.css";

export default function DashboardPage() {
  const { fetchTasks, fetchTaskStats } = useTasks();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
    fetchTaskStats();
  }, []);

  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboardHeader}>
        <h1 className={styles.dashboardTitle}>My Tasks</h1>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          + Create Task
        </Button>
      </div>

      <TaskStats />

      <TaskFilters />

      <TaskList />

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Task"
      >
        <TaskForm
          onSuccess={() => setIsCreateModalOpen(false)}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
