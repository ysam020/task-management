"use client";

import { useState } from "react";
import { Task } from "@/lib/types";
import { useTasks } from "@/contexts/TaskContext";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { TaskForm } from "./TaskForm";
import {
  formatDate,
  getStatusColor,
  getStatusLabel,
} from "@/lib//utils/helper";
import styles from "./styles.module.css";

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const { deleteTask, toggleTaskStatus } = useTasks();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isToggling, setIsToggling] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteTask(task.id);
      setIsDeleteModalOpen(false);
    } catch (error) {
      // Error handled in context
    } finally {
      setIsDeleting(false);
    }
  };

  const handleToggle = async () => {
    setIsToggling(true);
    try {
      await toggleTaskStatus(task.id);
    } catch (error) {
      // Error handled in context
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <>
      <div className={styles.taskCard}>
        <div className={styles.taskHeader}>
          <h3 className={styles.taskTitle}>{task.title}</h3>
          <span
            className={`${styles.taskStatus} ${
              styles[getStatusColor(task.status)]
            }`}
          >
            {getStatusLabel(task.status)}
          </span>
        </div>

        {task.description && (
          <p className={styles.taskDescription}>{task.description}</p>
        )}

        <div className={styles.taskFooter}>
          <span className={styles.taskDate}>{formatDate(task.createdAt)}</span>

          <div className={styles.taskActions}>
            <Button
              variant="outline"
              size="sm"
              onClick={handleToggle}
              isLoading={isToggling}
            >
              Toggle Status
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsEditModalOpen(true)}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => setIsDeleteModalOpen(true)}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Task"
      >
        <TaskForm
          task={task}
          onSuccess={() => setIsEditModalOpen(false)}
          onCancel={() => setIsEditModalOpen(false)}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Task"
        size="sm"
      >
        <div className={styles.deleteModal}>
          <p>Are you sure you want to delete this task?</p>
          <p className={styles.deleteWarning}>This action cannot be undone.</p>

          <div className={styles.deleteActions}>
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDelete}
              isLoading={isDeleting}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
