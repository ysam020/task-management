"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import { Edit, Delete, ToggleOn } from "@mui/icons-material";
import { Task } from "@/lib/types";
import { useTasks } from "@/contexts/TaskContext";
import { TaskForm } from "./TaskForm";
import { formatDate, getStatusColor, getStatusLabel } from "@/lib/utils/helper";

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
      <Card
        sx={{
          transition: "box-shadow 0.3s",
          "&:hover": {
            boxShadow: 6,
          },
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 2,
            }}
          >
            <Typography variant="h6" component="h3" sx={{ flex: 1, pr: 2 }}>
              {task.title}
            </Typography>
            <Chip
              label={getStatusLabel(task.status)}
              color={getStatusColor(task.status) as any}
              size="small"
            />
          </Box>

          {task.description && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {task.description}
            </Typography>
          )}

          <Typography variant="caption" color="text.secondary">
            {formatDate(task.createdAt)}
          </Typography>
        </CardContent>

        <CardActions sx={{ justifyContent: "flex-end", px: 2, pb: 2 }}>
          <Button
            variant="outlined"
            size="small"
            startIcon={
              isToggling ? <CircularProgress size={16} /> : <ToggleOn />
            }
            onClick={handleToggle}
            disabled={isToggling}
          >
            Toggle
          </Button>
          <Button
            variant="outlined"
            size="small"
            startIcon={<Edit />}
            onClick={() => setIsEditModalOpen(true)}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            startIcon={<Delete />}
            onClick={() => setIsDeleteModalOpen(true)}
          >
            Delete
          </Button>
        </CardActions>
      </Card>

      {/* Edit Modal */}
      <Dialog
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <TaskForm
              task={task}
              onSuccess={() => setIsEditModalOpen(false)}
              onCancel={() => setIsEditModalOpen(false)}
            />
          </Box>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Delete Task</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this task?</Typography>
          <Typography color="error" sx={{ mt: 1, fontWeight: 500 }}>
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setIsDeleteModalOpen(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            color="error"
            variant="contained"
            disabled={isDeleting}
            startIcon={isDeleting && <CircularProgress size={16} />}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
