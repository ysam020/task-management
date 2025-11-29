"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
  alpha,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  MoreVert,
  Edit,
  Delete,
  CheckCircle,
  RadioButtonUnchecked,
  AccessTime,
  Schedule,
} from "@mui/icons-material";
import { Task, TaskStatus } from "@/lib/types";
import { useTasks } from "@/contexts/TaskContext";
import { TaskForm } from "@/components/tasks/TaskForm";
import { formatDate } from "@/lib/utils/helper";

interface ModernTaskCardProps {
  task: Task;
  isSelected: boolean;
  onClick: () => void;
  viewMode: "grid" | "list";
}

export function TaskCard({
  task,
  isSelected,
  onClick,
  viewMode,
}: ModernTaskCardProps) {
  const { deleteTask, toggleTaskStatus } = useTasks();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isToggling, setIsToggling] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

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

  const statusConfig = {
    [TaskStatus.PENDING]: {
      color: "#f59e0b",
      bgColor: alpha("#f59e0b", 0.1),
      icon: <RadioButtonUnchecked sx={{ fontSize: 16 }} />,
      label: "Pending",
    },
    [TaskStatus.IN_PROGRESS]: {
      color: "#8b5cf6",
      bgColor: alpha("#8b5cf6", 0.1),
      icon: <AccessTime sx={{ fontSize: 16 }} />,
      label: "In Progress",
    },
    [TaskStatus.COMPLETED]: {
      color: "#10b981",
      bgColor: alpha("#10b981", 0.1),
      icon: <CheckCircle sx={{ fontSize: 16 }} />,
      label: "Completed",
    },
  };

  const config = statusConfig[task.status];

  return (
    <>
      <Card
        onClick={onClick}
        sx={{
          cursor: "pointer",
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          border: "1px solid",
          borderColor: isSelected ? "primary.main" : "divider",
          borderLeft: `3px solid ${config.color}`,
          boxShadow: isSelected ? 2 : 0,
          position: "relative",
          overflow: "visible",
          background: (theme) =>
            isSelected
              ? theme.palette.mode === "dark"
                ? "rgba(102, 126, 234, 0.08)"
                : "rgba(102, 126, 234, 0.04)"
              : theme.palette.mode === "dark"
              ? "rgba(255,255,255,0.02)"
              : "white",
          "&:hover": {
            transform: isSelected ? "none" : "translateY(-1px)",
            boxShadow: isSelected ? 2 : 1,
            borderColor: isSelected ? "primary.main" : "primary.light",
          },
        }}
      >
        <CardContent sx={{ p: 1.5, pb: "12px !important" }}>
          {/* Header - Compact */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 1,
            }}
          >
            <Box sx={{ flex: 1, pr: 1 }}>
              <Typography
                variant="subtitle2"
                fontWeight={700}
                sx={{
                  mb: 0.25,
                  fontSize: "0.9375rem",
                  lineHeight: 1.3,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {task.title}
              </Typography>
            </Box>

            <IconButton
              size="small"
              onClick={handleMenuOpen}
              sx={{
                opacity: 0.6,
                p: 0.25,
                "&:hover": { opacity: 1, backgroundColor: alpha("#000", 0.05) },
              }}
            >
              <MoreVert fontSize="small" sx={{ fontSize: 18 }} />
            </IconButton>
          </Box>

          {/* Description - Compact */}
          {task.description && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 1,
                fontSize: "0.8125rem",
                display: "-webkit-box",
                WebkitLineClamp: viewMode === "grid" ? 2 : 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                lineHeight: 1.5,
              }}
            >
              {task.description}
            </Typography>
          )}

          {/* Footer - Compact */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 0.75,
            }}
          >
            <Chip
              icon={config.icon}
              label={config.label}
              size="small"
              sx={{
                backgroundColor: config.bgColor,
                color: config.color,
                fontWeight: 600,
                fontSize: "0.6875rem",
                height: 20,
                border: "none",
                "& .MuiChip-icon": {
                  color: config.color,
                  fontSize: 16,
                },
              }}
            />

            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Schedule sx={{ fontSize: 12, color: "text.secondary" }} />
              <Typography
                variant="caption"
                color="text.secondary"
                fontSize="0.7rem"
              >
                {formatDate(task.createdAt)}
              </Typography>
            </Box>
          </Box>

          {/* Quick Toggle Button - Compact */}
          <Box
            sx={{
              position: "absolute",
              top: 8,
              right: 32,
              opacity: 0,
              transition: "opacity 0.2s",
              ".MuiCard-root:hover &": {
                opacity: 1,
              },
            }}
          >
            <Tooltip title="Toggle Status">
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggle();
                }}
                disabled={isToggling}
                sx={{
                  p: 0.5,
                  backgroundColor: alpha(config.color, 0.1),
                  color: config.color,
                  "&:hover": {
                    backgroundColor: alpha(config.color, 0.2),
                  },
                }}
              >
                {isToggling ? (
                  <CircularProgress size={14} />
                ) : task.status === TaskStatus.COMPLETED ? (
                  <RadioButtonUnchecked sx={{ fontSize: 16 }} />
                ) : (
                  <CheckCircle sx={{ fontSize: 16 }} />
                )}
              </IconButton>
            </Tooltip>
          </Box>
        </CardContent>
      </Card>

      {/* Context Menu - Compact */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={(e) => {
            e.stopPropagation();
            handleToggle();
            handleMenuClose();
          }}
          sx={{ py: 0.75, fontSize: "0.875rem" }}
        >
          <ListItemIcon sx={{ minWidth: 32 }}>
            {task.status === TaskStatus.COMPLETED ? (
              <RadioButtonUnchecked fontSize="small" />
            ) : (
              <CheckCircle fontSize="small" />
            )}
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ fontSize: "0.875rem" }}>
            Toggle Status
          </ListItemText>
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            e.stopPropagation();
            setIsEditModalOpen(true);
            handleMenuClose();
          }}
          sx={{ py: 0.75, fontSize: "0.875rem" }}
        >
          <ListItemIcon sx={{ minWidth: 32 }}>
            <Edit fontSize="small" />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ fontSize: "0.875rem" }}>
            Edit
          </ListItemText>
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            e.stopPropagation();
            setIsDeleteModalOpen(true);
            handleMenuClose();
          }}
          sx={{ color: "error.main", py: 0.75, fontSize: "0.875rem" }}
        >
          <ListItemIcon sx={{ minWidth: 32 }}>
            <Delete fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ fontSize: "0.875rem" }}>
            Delete
          </ListItemText>
        </MenuItem>
      </Menu>

      {/* Edit Modal - Compact */}
      <Dialog
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ pb: 1, py: 1.5 }}>
          <Typography variant="h6" fontWeight={700} fontSize="1.125rem">
            Edit Task
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ pt: 1.5 }}>
          <TaskForm
            task={task}
            onSuccess={() => setIsEditModalOpen(false)}
            onCancel={() => setIsEditModalOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal - Compact */}
      <Dialog
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ py: 1.5 }}>
          <Typography variant="h6" fontWeight={700} fontSize="1.125rem">
            Delete Task
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ py: 1 }}>
          <Typography variant="body2" gutterBottom>
            Are you sure you want to delete "{task.title}"?
          </Typography>
          <Typography
            variant="caption"
            color="error"
            sx={{ mt: 0.5, fontWeight: 500, display: "block" }}
          >
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 2, pb: 1.5 }}>
          <Button
            onClick={() => setIsDeleteModalOpen(false)}
            disabled={isDeleting}
            size="small"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            color="error"
            variant="contained"
            disabled={isDeleting}
            size="small"
            startIcon={isDeleting && <CircularProgress size={14} />}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
