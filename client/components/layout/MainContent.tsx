"use client";

import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  IconButton,
  Tooltip,
  Button,
  Stack,
  alpha,
} from "@mui/material";
import { ViewModule, ViewList } from "@mui/icons-material";
import { Modal } from "@/components/common/Modal";
import { useTasks } from "@/contexts/TaskContext";
import { TaskCard } from "@/components/tasks/TaskCard";
import { TaskForm } from "@/components/tasks/TaskForm";
import { TaskPagination } from "../tasks/TaskPagination";
import { Task } from "@/lib/types";
import { useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalstorage";
import { useToast } from "@/hooks/useToast";
import {
  VIEW_MODES,
  LOCAL_STORAGE_KEYS,
  SUCCESS_MESSAGES,
} from "@/lib/utils/constants";

export function MainContent() {
  const { tasks, isLoading, pagination, deleteTask } = useTasks();
  const { success, error } = useToast();
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [deleteTaskId, setDeleteTaskId] = useState<number | null>(null);
  const [viewMode, setViewMode] = useLocalStorage<"grid" | "list">(
    LOCAL_STORAGE_KEYS.VIEW_MODE,
    VIEW_MODES.GRID as "grid"
  );

  const handleEditClose = () => setEditTask(null);
  const handleDeleteClose = () => setDeleteTaskId(null);

  const handleConfirmDelete = async () => {
    if (deleteTaskId) {
      try {
        await deleteTask(deleteTaskId);
        success(SUCCESS_MESSAGES.TASK_DELETED);
        setDeleteTaskId(null);
      } catch (err) {
        error("Failed to delete task");
      }
    }
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          minHeight: { xs: "50vh", md: "auto" },
        }}
      >
        <CircularProgress size={40} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: { xs: "auto", md: "100%" },
        minHeight: { xs: "calc(100vh - 200px)", md: "auto" },
        display: "flex",
        flexDirection: "column",
        overflow: { xs: "visible", md: "hidden" },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: { xs: 2, md: 1.5 },
          pb: { xs: 2, md: 1.5 },
          borderBottom: "2px solid",
          borderColor: "divider",
          flexShrink: 0,
        }}
      >
        <Box>
          <Typography
            variant="h5"
            fontWeight={800}
            sx={{
              mb: 0.25,
              lineHeight: 1.2,
              fontSize: { xs: "1.25rem", md: "1.5rem" },
            }}
          >
            My Tasks
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            fontSize="0.75rem"
          >
            {pagination?.total || 0} task{pagination?.total !== 1 ? "s" : ""}{" "}
            total
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 0.5 }}>
          {viewMode === VIEW_MODES.GRID ? (
            <Tooltip title="List View">
              <IconButton
                size="small"
                onClick={() => setViewMode(VIEW_MODES.LIST as "list")}
                sx={{
                  backgroundColor: "primary.main",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "primary.main",
                  },
                }}
              >
                <ViewList fontSize="small" />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Grid View">
              <IconButton
                size="small"
                onClick={() => setViewMode(VIEW_MODES.GRID as "grid")}
                sx={{
                  backgroundColor: "primary.main",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "primary.main",
                  },
                }}
              >
                <ViewModule fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Box>

      {/* Task List */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: { xs: "visible", md: "auto" },
          pr: { xs: 0, md: 1 },
          pb: { xs: 2, md: 0 },
          "&::-webkit-scrollbar": { width: "8px" },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,0.2)",
            borderRadius: "4px",
          },
        }}
      >
        {!tasks || tasks.length === 0 ? (
          <Paper
            elevation={0}
            sx={{
              textAlign: "center",
              py: { xs: 6, md: 8 },
              border: "2px dashed",
              borderColor: "divider",
              borderRadius: 2,
              background: "rgba(0,0,0,0.01)",
            }}
          >
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                backgroundColor: alpha("#667eea", 0.1),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 2,
              }}
            >
              <ViewList sx={{ fontSize: 32, color: "#667eea" }} />
            </Box>
            <Typography variant="subtitle1" fontWeight={700} gutterBottom>
              No tasks found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Create your first task to get started!
            </Typography>
          </Paper>
        ) : (
          <Box
            sx={{
              display: viewMode === VIEW_MODES.GRID ? "grid" : "flex",
              flexDirection:
                viewMode === VIEW_MODES.LIST ? "column" : undefined,
              gridTemplateColumns:
                viewMode === VIEW_MODES.GRID
                  ? {
                      xs: "1fr",
                      sm: "repeat(2, 1fr)",
                      lg: "repeat(2, 1fr)",
                    }
                  : undefined,
              gap: { xs: 2, md: 1.5 },
            }}
          >
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={() => setEditTask(task)}
                onDelete={() => setDeleteTaskId(task.id)}
              />
            ))}
          </Box>
        )}
      </Box>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <Box
          sx={{
            pt: { xs: 2, md: 1.5 },
            pb: { xs: 15, md: 0 },
            borderTop: "1px solid",
            borderColor: "divider",
            flexShrink: 0,
          }}
        >
          <TaskPagination />
        </Box>
      )}

      {/* Edit Task Modal */}
      <Modal open={!!editTask} onClose={handleEditClose} title="Edit Task">
        {editTask && (
          <TaskForm
            task={editTask}
            onSuccess={handleEditClose}
            onCancel={handleEditClose}
          />
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        open={!!deleteTaskId}
        onClose={handleDeleteClose}
        title="Delete Task"
        maxWidth="xs"
        actions={
          <Stack direction="row" spacing={1.5}>
            <Button variant="outlined" onClick={handleDeleteClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleConfirmDelete}
            >
              Delete
            </Button>
          </Stack>
        }
      >
        <Typography>
          Are you sure you want to delete this task? This action cannot be
          undone.
        </Typography>
      </Modal>
    </Box>
  );
}
