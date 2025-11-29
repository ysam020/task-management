"use client";

import { Box, Paper, Typography, alpha, Avatar } from "@mui/material";
import {
  CheckCircle,
  RadioButtonUnchecked,
  AccessTime,
  TrendingUp,
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
    <Box
      sx={{
        height: "100%",
        overflowY: "auto",
        p: 1,
        borderLeft: "1px solid",
        borderColor: "divider",
        background: "linear-gradient(180deg, #fefeff 0%, #f8f9ff 100%)",
        "&::-webkit-scrollbar": { width: "6px" },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(102, 126, 234, 0.3)",
          borderRadius: "3px",
          "&:hover": {
            backgroundColor: "rgba(102, 126, 234, 0.5)",
          },
        },
      }}
    >
      {/* Recent Activity */}
      <Paper
        elevation={0}
        sx={{
          p: 1,
          border: "1px solid",
          borderColor: alpha("#667eea", 0.1),
          borderRadius: 2,
          background: "linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)",
          boxShadow: "0 2px 8px rgba(102, 126, 234, 0.08)",
        }}
      >
        <Typography
          variant="caption"
          fontWeight={700}
          sx={{
            mb: 1.5,
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            textTransform: "uppercase",
            color: "#667eea",
            letterSpacing: "0.5px",
          }}
        >
          <TrendingUp sx={{ fontSize: 16 }} />
          Recent Activity
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          {recentActivity.length === 0 ? (
            <Box
              sx={{
                p: 2,
                textAlign: "center",
                borderRadius: 1.5,
                backgroundColor: alpha("#667eea", 0.05),
                border: `1px dashed ${alpha("#667eea", 0.2)}`,
              }}
            >
              <Typography
                variant="caption"
                color="text.secondary"
                fontSize="0.75rem"
              >
                No recent activity
              </Typography>
            </Box>
          ) : (
            recentActivity.map((task) => (
              <Box
                key={task.id}
                sx={{
                  display: "flex",
                  gap: 1.5,
                  p: 1,
                  borderRadius: 1.5,
                  backgroundColor: "#ffffff",
                  border: `1px solid ${alpha(
                    statusConfig[task.status].color,
                    0.15
                  )}`,
                  boxShadow: `0 2px 4px ${alpha(
                    statusConfig[task.status].color,
                    0.08
                  )}`,
                  transition: "all 0.25s ease-in-out",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: statusConfig[task.status].bgColor,
                    borderColor: alpha(statusConfig[task.status].color, 0.3),
                    transform: "translateX(-4px)",
                    boxShadow: `0 4px 12px ${alpha(
                      statusConfig[task.status].color,
                      0.2
                    )}`,
                  },
                }}
              >
                <Avatar
                  sx={{
                    width: 36,
                    height: 36,
                    backgroundColor: statusConfig[task.status].bgColor,
                    color: statusConfig[task.status].color,
                    fontSize: "0.75rem",
                    border: `2px solid ${alpha(
                      statusConfig[task.status].color,
                      0.2
                    )}`,
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
                      fontSize: "0.8rem",
                      mb: 0.25,
                    }}
                  >
                    {task.title}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      display: "block",
                      fontSize: "0.7rem",
                    }}
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
