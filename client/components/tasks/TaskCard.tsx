"use client";

import { useState } from "react";
import {
  Card,
  Typography,
  Chip,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tooltip,
  alpha,
} from "@mui/material";
import {
  EditOutlined,
  DeleteOutlineOutlined,
  CheckCircleOutline,
  RadioButtonUncheckedOutlined,
} from "@mui/icons-material";
import { Task, TaskStatus } from "@/lib/types";
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
    } finally {
      setIsDeleting(false);
    }
  };

  const handleToggle = async () => {
    setIsToggling(true);
    try {
      await toggleTaskStatus(task.id);
    } finally {
      setIsToggling(false);
    }
  };

  const statusColor = getStatusColor(task.status);
  const isCompleted = task.status === TaskStatus.COMPLETED;

  return (
    <>
      <Card
        sx={{
          position: "relative",
          overflow: "visible",
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          borderLeft: `3px solid ${statusColor}`,
          "&:hover": {
            boxShadow: (theme) =>
              `0 4px 20px ${alpha(theme.palette.primary.main, 0.12)}`,
            transform: "translateY(-2px)",
          },
        }}
      >
        <Box sx={{ p: 2.5 }}>
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              mb: 1.5,
            }}
          >
            <Box sx={{ flex: 1, pr: 2 }}>
              <Typography
                variant="h6"
                sx={{
                  fontSize: "1.05rem",
                  fontWeight: 600,
                  mb: 0.5,
                  textDecoration: isCompleted ? "line-through" : "none",
                  color: isCompleted ? "text.secondary" : "text.primary",
                }}
              >
                {task.title}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: "text.secondary", display: "block" }}
              >
                {formatDate(task.createdAt)}
              </Typography>
            </Box>

            <Chip
              label={getStatusLabel(task.status)}
              size="small"
              sx={{
                bgcolor: alpha(statusColor, 0.1),
                color: statusColor,
                fontWeight: 600,
                fontSize: "0.75rem",
                height: 24,
              }}
            />
          </Box>

          {/* Description */}
          {task.description && (
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                mb: 2,
                lineHeight: 1.6,
              }}
            >
              {task.description}
            </Typography>
          )}

          {/* Actions */}
          <Box
            sx={{
              display: "flex",
              gap: 0.5,
              pt: 1,
              borderTop: "1px solid",
              borderColor: "divider",
            }}
          >
            <Tooltip title={isCompleted ? "Mark Incomplete" : "Mark Complete"}>
              <IconButton
                size="small"
                onClick={handleToggle}
                disabled={isToggling}
                sx={{
                  color: isCompleted ? "success.main" : "text.secondary",
                  "&:hover": { bgcolor: alpha(statusColor, 0.08) },
                }}
              >
                {isCompleted ? (
                  <CheckCircleOutline fontSize="small" />
                ) : (
                  <RadioButtonUncheckedOutlined fontSize="small" />
                )}
              </IconButton>
            </Tooltip>

            <Tooltip title="Edit Task">
              <IconButton
                size="small"
                onClick={() => setIsEditModalOpen(true)}
                sx={{
                  color: "text.secondary",
                  "&:hover": { bgcolor: "action.hover" },
                }}
              >
                <EditOutlined fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Delete Task">
              <IconButton
                size="small"
                onClick={() => setIsDeleteModalOpen(true)}
                sx={{
                  color: "text.secondary",
                  "&:hover": { bgcolor: "error.lighter", color: "error.main" },
                }}
              >
                <DeleteOutlineOutlined fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Card>

      {/* Edit Dialog */}
      <Dialog
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 2 },
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>Edit Task</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TaskForm
              task={task}
              onSuccess={() => setIsEditModalOpen(false)}
              onCancel={() => setIsEditModalOpen(false)}
            />
          </Box>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 2 },
        }}
      >
        <DialogTitle>Delete Task</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete <strong>{task.title}</strong>? This
            action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={() => setIsDeleteModalOpen(false)}
            disabled={isDeleting}
            variant="outlined"
            size="small"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            disabled={isDeleting}
            color="error"
            variant="contained"
            size="small"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
