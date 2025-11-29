"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  IconButton,
  alpha,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import {
  Edit,
  Delete,
  Schedule,
  CheckBox,
  IndeterminateCheckBox,
  CheckBoxOutlineBlank,
} from "@mui/icons-material";
import { Task, TaskStatus } from "@/lib/types";
import { formatDate } from "@/lib/utils/helper";
import { useTasks } from "@/contexts/TaskContext";

interface TaskCardProps {
  task: Task;
  onClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function TaskCard({ task, onClick, onEdit, onDelete }: TaskCardProps) {
  const { toggleTaskStatus } = useTasks();
  const [isToggling, setIsToggling] = useState(false);

  // Status configuration
  const statusConfig = {
    [TaskStatus.PENDING]: {
      color: "#f59e0b",
      bgColor: alpha("#f59e0b", 0.1),
      icon: <CheckBoxOutlineBlank sx={{ fontSize: 18 }} />,
      label: "Pending",
    },
    [TaskStatus.IN_PROGRESS]: {
      color: "#8b5cf6",
      bgColor: alpha("#8b5cf6", 0.1),
      icon: <IndeterminateCheckBox sx={{ fontSize: 18 }} />,
      label: "In Progress",
    },
    [TaskStatus.COMPLETED]: {
      color: "#10b981",
      bgColor: alpha("#10b981", 0.1),
      icon: <CheckBox sx={{ fontSize: 18 }} />,
      label: "Completed",
    },
  };

  const config = statusConfig[task.status];

  const handleToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsToggling(true);
    try {
      await toggleTaskStatus(task.id);
    } finally {
      setIsToggling(false);
    }
  };

  // Get the next status for tooltip
  const getNextStatus = () => {
    switch (task.status) {
      case TaskStatus.PENDING:
        return "In Progress";
      case TaskStatus.IN_PROGRESS:
        return "Completed";
      case TaskStatus.COMPLETED:
        return "Pending";
      default:
        return "In Progress";
    }
  };

  return (
    <Card
      onClick={onClick}
      sx={{
        position: "relative",
        transition: "all 0.2s ease",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 1.5,
        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
        "&:hover": {
          boxShadow: `0 6px 16px ${alpha(config.color, 0.2)}`,
          borderColor: config.color,
        },
      }}
    >
      <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
        {/* Header with Checkbox */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: 1,
            mb: 0.75,
          }}
        >
          {/* 3-State Checkbox */}
          <Tooltip
            title={`Click to mark as ${getNextStatus()}`}
            placement="top"
          >
            <Box
              onClick={handleToggle}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: config.color,
                transition: "all 0.2s",
                flexShrink: 0,
                "&:hover": {
                  transform: "scale(1.15)",
                },
              }}
            >
              {isToggling ? (
                <CircularProgress size={20} sx={{ color: config.color }} />
              ) : (
                config.icon
              )}
            </Box>
          </Tooltip>

          {/* Title */}
          <Typography
            variant="subtitle2"
            fontWeight={700}
            sx={{
              flex: 1,
              lineHeight: 1.4,
              fontSize: "0.875rem",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              textDecoration:
                task.status === TaskStatus.COMPLETED ? "line-through" : "none",
              opacity: task.status === TaskStatus.COMPLETED ? 0.7 : 1,
            }}
          >
            {task.title}
          </Typography>

          {/* Actions */}
          <Box
            sx={{
              display: "flex",
              gap: 0.25,
              flexShrink: 0,
            }}
          >
            <Tooltip title="Edit Task">
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit?.();
                }}
                sx={{
                  p: 0.5,
                  opacity: 0.7,
                  "&:hover": { opacity: 1 },
                }}
              >
                <Edit sx={{ fontSize: 16 }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete Task">
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete?.();
                }}
                sx={{
                  p: 0.5,
                  opacity: 0.7,
                  color: "#ef4444",
                  "&:hover": { opacity: 1 },
                }}
              >
                <Delete sx={{ fontSize: 16 }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Description */}
        {task.description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 1,
              fontSize: "0.75rem",
              lineHeight: 1.5,
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {task.description}
          </Typography>
        )}

        {/* Footer */}
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
            label={config.label}
            size="small"
            sx={{
              backgroundColor: config.bgColor,
              color: config.color,
              fontWeight: 600,
              fontSize: "0.6875rem",
              height: 20,
              border: "none",
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
      </CardContent>
    </Card>
  );
}
