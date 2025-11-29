"use client";

import { Formik, Form, Field } from "formik";
import {
  TextField,
  MenuItem,
  Button,
  Box,
  Stack,
  InputAdornment,
} from "@mui/material";
import {
  TitleOutlined,
  DescriptionOutlined,
  FlagOutlined,
} from "@mui/icons-material";
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
          // Error is handled in context
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ errors, touched, isSubmitting, values, handleChange }) => (
        <Form>
          <Stack spacing={2.5}>
            <Field name="title">
              {({ field }: any) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Task Title"
                  placeholder="Enter task title"
                  error={touched.title && Boolean(errors.title)}
                  helperText={touched.title && errors.title}
                  disabled={isSubmitting}
                />
              )}
            </Field>

            <Field name="description">
              {({ field }: any) => (
                <TextField
                  {...field}
                  fullWidth
                  multiline
                  rows={3}
                  label="Description"
                  placeholder="Enter task description (optional)"
                  error={touched.description && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
                  disabled={isSubmitting}
                />
              )}
            </Field>

            <Field name="status">
              {({ field }: any) => (
                <TextField
                  {...field}
                  select
                  fullWidth
                  label="Status"
                  error={touched.status && Boolean(errors.status)}
                  helperText={touched.status && errors.status}
                  disabled={isSubmitting}
                >
                  <MenuItem value={TaskStatus.PENDING}>Pending</MenuItem>
                  <MenuItem value={TaskStatus.IN_PROGRESS}>
                    In Progress
                  </MenuItem>
                  <MenuItem value={TaskStatus.COMPLETED}>Completed</MenuItem>
                </TextField>
              )}
            </Field>

            <Box
              sx={{
                display: "flex",
                gap: 1.5,
                justifyContent: "flex-end",
                pt: 1,
              }}
            >
              <Button
                onClick={onCancel}
                disabled={isSubmitting}
                variant="outlined"
                size="medium"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                variant="contained"
                size="medium"
              >
                {isSubmitting
                  ? isEditing
                    ? "Updating..."
                    : "Creating..."
                  : isEditing
                  ? "Update Task"
                  : "Create Task"}
              </Button>
            </Box>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
