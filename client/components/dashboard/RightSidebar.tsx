"use client";

import { Box, Paper, Typography, alpha, Avatar } from "@mui/material";
import {
  CheckCircle,
  RadioButtonUnchecked,
  AccessTime,
} from "@mui/icons-material";
import { TaskStatus } from "@/lib/types";
import { formatDate } from "@/lib/utils/helper";
import { useTasks } from "@/contexts/TaskContext";

export function RightSidebar() {
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
    <Box>
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
              sx={{ textAlign: "center", py: 2 }}
            >
              No recent activity
            </Typography>
          ) : (
            recentActivity.map((task) => (
              <Box
                key={task.id}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 1,
                  p: 1,
                  borderRadius: 1,
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.03)"
                      : "rgba(0,0,0,0.02)",
                  transition: "all 0.2s",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: (theme) =>
                      theme.palette.mode === "dark"
                        ? "rgba(255,255,255,0.05)"
                        : "rgba(0,0,0,0.04)",
                  },
                }}
              >
                <Avatar
                  sx={{
                    width: 24,
                    height: 24,
                    fontSize: "0.7rem",
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
                      display: "block",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      fontSize: "0.75rem",
                    }}
                  >
                    {task.title}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ fontSize: "0.7rem" }}
                  >
                    {formatDate(task.updatedAt)}
                  </Typography>
                </Box>
              </Box>
            ))
          )}
        </Box>
      </Paper>
    </Box>
  );
}
