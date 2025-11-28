"use client";

import { Formik, Form, Field } from "formik";
import {
  TextField,
  MenuItem,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import { Task, TaskStatus } from "@/lib/types";
import { useTasks } from "@/contexts/TaskContext";
import {
  createTaskSchema,
  updateTaskSchema,
} from "@/lib/validations/task.schema";

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
      {({ isSubmitting, errors, touched, values, handleChange }) => (
        <Form>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Field name="title">
              {({ field }: any) => (
                <TextField
                  {...field}
                  label="Title"
                  placeholder="Enter task title"
                  fullWidth
                  error={touched.title && Boolean(errors.title)}
                  helperText={touched.title && errors.title}
                />
              )}
            </Field>

            <Field name="description">
              {({ field }: any) => (
                <TextField
                  {...field}
                  label="Description"
                  placeholder="Enter task description (optional)"
                  fullWidth
                  multiline
                  rows={4}
                  error={touched.description && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
                />
              )}
            </Field>

            <Field name="status">
              {({ field }: any) => (
                <TextField
                  {...field}
                  select
                  label="Status"
                  fullWidth
                  error={touched.status && Boolean(errors.status)}
                  helperText={touched.status && errors.status}
                >
                  <MenuItem value={TaskStatus.PENDING}>Pending</MenuItem>
                  <MenuItem value={TaskStatus.IN_PROGRESS}>
                    In Progress
                  </MenuItem>
                  <MenuItem value={TaskStatus.COMPLETED}>Completed</MenuItem>
                </TextField>
              )}
            </Field>

            <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
              <Button onClick={onCancel} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                startIcon={isSubmitting && <CircularProgress size={16} />}
              >
                {isEditing ? "Update Task" : "Create Task"}
              </Button>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
}
