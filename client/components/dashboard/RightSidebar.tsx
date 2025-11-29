"use client";

import {
  Box,
  Paper,
  Typography,
  Chip,
  Divider,
  alpha,
  Avatar,
} from "@mui/material";
import {
  CheckCircle,
  RadioButtonUnchecked,
  AccessTime,
  CalendarToday,
  Update,
  TrendingUp,
} from "@mui/icons-material";
import { Task, TaskStatus } from "@/lib/types";
import { formatDate } from "@/lib/utils/helper";
import { useTasks } from "@/contexts/TaskContext";

interface RightSidebarProps {
  selectedTask: Task | null;
}

export function RightSidebar({ selectedTask }: RightSidebarProps) {
  const { tasks } = useTasks();

  const statusConfig = {
    [TaskStatus.PENDING]: {
      color: "#f59e0b",
      bgColor: alpha("#f59e0b", 0.1),
      icon: <RadioButtonUnchecked sx={{ fontSize: 18 }} />,
      label: "Pending",
    },
    [TaskStatus.IN_PROGRESS]: {
      color: "#8b5cf6",
      bgColor: alpha("#8b5cf6", 0.1),
      icon: <AccessTime sx={{ fontSize: 18 }} />,
      label: "In Progress",
    },
    [TaskStatus.COMPLETED]: {
      color: "#10b981",
      bgColor: alpha("#10b981", 0.1),
      icon: <CheckCircle sx={{ fontSize: 18 }} />,
      label: "Completed",
    },
  };

  const recentActivity = [...tasks]
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
    .slice(0, 5);

  return (
    <Box
      sx={{
        height: "100%",
        overflowY: "auto",
        "&::-webkit-scrollbar": { width: "6px" },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(0,0,0,0.2)",
          borderRadius: "3px",
        },
      }}
    >
      {/* Task Details - Compact */}
      {selectedTask ? (
        <Paper
          elevation={0}
          sx={{
            p: 1.5,
            mb: 1.5,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 1.5,
            background: (theme) =>
              theme.palette.mode === "dark"
                ? "rgba(255,255,255,0.02)"
                : "rgba(0,0,0,0.01)",
          }}
        >
          <Typography
            variant="caption"
            fontWeight={700}
            sx={{ mb: 1, textTransform: "uppercase", display: "block" }}
          >
            Task Details
          </Typography>

          <Typography
            variant="subtitle1"
            fontWeight={700}
            sx={{ mb: 1, lineHeight: 1.3, fontSize: "1rem" }}
          >
            {selectedTask.title}
          </Typography>

          {/* Status - Compact */}
          <Box sx={{ mb: 1.5 }}>
            <Chip
              icon={statusConfig[selectedTask.status].icon}
              label={statusConfig[selectedTask.status].label}
              size="small"
              sx={{
                backgroundColor: statusConfig[selectedTask.status].bgColor,
                color: statusConfig[selectedTask.status].color,
                fontWeight: 600,
                height: 22,
                fontSize: "0.75rem",
                border: "none",
                "& .MuiChip-icon": {
                  color: statusConfig[selectedTask.status].color,
                  fontSize: 16,
                },
              }}
            />
          </Box>

          {/* Description - Compact */}
          {selectedTask.description && (
            <>
              <Typography
                variant="caption"
                fontWeight={700}
                color="text.secondary"
                sx={{ mb: 0.5, display: "block", textTransform: "uppercase" }}
              >
                Description
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  mb: 1.5,
                  lineHeight: 1.6,
                  color: "text.primary",
                  fontSize: "0.8125rem",
                }}
              >
                {selectedTask.description}
              </Typography>
            </>
          )}

          <Divider sx={{ my: 1 }} />

          {/* Metadata - Compact */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CalendarToday sx={{ fontSize: 16, color: "text.secondary" }} />
              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                  fontSize="0.7rem"
                >
                  Created
                </Typography>
                <Typography
                  variant="caption"
                  fontWeight={600}
                  fontSize="0.75rem"
                >
                  {formatDate(selectedTask.createdAt)}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Update sx={{ fontSize: 16, color: "text.secondary" }} />
              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                  fontSize="0.7rem"
                >
                  Last Updated
                </Typography>
                <Typography
                  variant="caption"
                  fontWeight={600}
                  fontSize="0.75rem"
                >
                  {formatDate(selectedTask.updatedAt)}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Paper>
      ) : (
        <Paper
          elevation={0}
          sx={{
            p: 2.5,
            mb: 1.5,
            textAlign: "center",
            border: "2px dashed",
            borderColor: "divider",
            borderRadius: 1.5,
            background: (theme) =>
              theme.palette.mode === "dark"
                ? "rgba(255,255,255,0.02)"
                : "rgba(0,0,0,0.01)",
          }}
        >
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              backgroundColor: alpha("#667eea", 0.1),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 1,
            }}
          >
            <TrendingUp sx={{ fontSize: 24, color: "#667eea" }} />
          </Box>
          <Typography variant="caption" color="text.secondary">
            Select a task to view details
          </Typography>
        </Paper>
      )}

      {/* Activity Feed - Compact */}
      <Paper
        elevation={0}
        sx={{
          p: 1.5,
          mb: 1.5,
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 1.5,
          background: (theme) =>
            theme.palette.mode === "dark"
              ? "rgba(255,255,255,0.02)"
              : "rgba(0,0,0,0.01)",
        }}
      >
        <Typography
          variant="caption"
          fontWeight={700}
          sx={{ mb: 1, textTransform: "uppercase", display: "block" }}
        >
          Recent Activity
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {recentActivity.length === 0 ? (
            <Typography
              variant="caption"
              color="text.secondary"
              textAlign="center"
              py={1}
            >
              No recent activity
            </Typography>
          ) : (
            recentActivity.map((task, index) => (
              <Box
                key={task.id}
                sx={{
                  display: "flex",
                  gap: 1,
                  pb: index < recentActivity.length - 1 ? 1 : 0,
                  borderBottom:
                    index < recentActivity.length - 1 ? "1px solid" : "none",
                  borderColor: "divider",
                }}
              >
                <Avatar
                  sx={{
                    width: 28,
                    height: 28,
                    bgcolor: statusConfig[task.status].bgColor,
                    color: statusConfig[task.status].color,
                  }}
                >
                  {statusConfig[task.status].icon}
                </Avatar>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    variant="caption"
                    fontWeight={600}
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      mb: 0.25,
                      display: "block",
                      fontSize: "0.75rem",
                    }}
                  >
                    {task.title}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 0.5,
                    }}
                  >
                    <Chip
                      label={statusConfig[task.status].label}
                      size="small"
                      sx={{
                        height: 18,
                        fontSize: "0.65rem",
                        backgroundColor: statusConfig[task.status].bgColor,
                        color: statusConfig[task.status].color,
                        fontWeight: 600,
                      }}
                    />
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      fontSize="0.65rem"
                    >
                      {formatDate(task.updatedAt)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))
          )}
        </Box>
      </Paper>
    </Box>
  );
}
