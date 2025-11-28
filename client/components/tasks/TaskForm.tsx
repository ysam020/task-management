"use client";

import { Formik, Form, Field } from "formik";
import { Task, TaskStatus } from "@/lib/types";
import { useTasks } from "@/contexts/TaskContext";
import {
  createTaskSchema,
  updateTaskSchema,
} from "@/lib/validations/task.schema";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/TextArea";
import { Select } from "@/components/ui/Select";
import styles from "./styles.module.css";

interface TaskFormProps {
  task?: Task;
  onSuccess: () => void;
  onCancel: () => void;
}

export function TaskForm({ task, onSuccess, onCancel }: TaskFormProps) {
  const { createTask, updateTask } = useTasks();
  const isEditing = !!task;

  const initialValues = {
    title: task?.title || "",
    description: task?.description || "",
    status: task?.status || TaskStatus.PENDING,
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={isEditing ? updateTaskSchema : createTaskSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          if (isEditing) {
            await updateTask(task.id, values);
          } else {
            await createTask(values);
          }
          onSuccess();
        } catch (error) {
          // Error handled in context
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className={styles.taskForm}>
          <Field name="title">
            {({ field }: any) => (
              <Input
                {...field}
                type="text"
                label="Title"
                placeholder="Enter task title"
                error={touched.title && errors.title ? errors.title : undefined}
              />
            )}
          </Field>

          <Field name="description">
            {({ field }: any) => (
              <Textarea
                {...field}
                label="Description"
                placeholder="Enter task description (optional)"
                rows={4}
                error={
                  touched.description && errors.description
                    ? errors.description
                    : undefined
                }
              />
            )}
          </Field>

          <Field name="status">
            {({ field }: any) => (
              <Select
                {...field}
                label="Status"
                options={[
                  { value: TaskStatus.PENDING, label: "Pending" },
                  { value: TaskStatus.IN_PROGRESS, label: "In Progress" },
                  { value: TaskStatus.COMPLETED, label: "Completed" },
                ]}
                error={
                  touched.status && errors.status ? errors.status : undefined
                }
              />
            )}
          </Field>

          <div className={styles.formActions}>
            <Button
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" isLoading={isSubmitting}>
              {isEditing ? "Update Task" : "Create Task"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
