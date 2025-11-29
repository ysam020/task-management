"use client";

import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  IconButton,
  Tooltip,
  alpha,
} from "@mui/material";
import { ViewModule, ViewList } from "@mui/icons-material";
import { useTasks } from "@/contexts/TaskContext";
import { TaskCard } from "./TaskCard";
import { TaskPagination } from "./TaskPagination";
import { useState, useEffect } from "react";

const VIEW_MODE_STORAGE_KEY = "taskViewMode";

export function MainContent() {
  const { tasks, isLoading, pagination } = useTasks();
  const [viewMode, setViewMode] = useState<"grid" | "list">(() => {
    // Initialize from localStorage if available
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(VIEW_MODE_STORAGE_KEY);
      return saved === "grid" || saved === "list" ? saved : "grid";
    }
    return "grid";
  });

  // Save to localStorage whenever viewMode changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(VIEW_MODE_STORAGE_KEY, viewMode);
    }
  }, [viewMode]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <CircularProgress size={40} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Header - Compact */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1.5,
          pb: 1.5,
          borderBottom: "2px solid",
          borderColor: "divider",
        }}
      >
        <Box>
          <Typography
            variant="h5"
            fontWeight={800}
            sx={{ mb: 0.25, lineHeight: 1.2 }}
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
          {viewMode === "grid" ? (
            <Tooltip title="List View">
              <IconButton
                size="small"
                onClick={() => setViewMode("list")}
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
                onClick={() => setViewMode("grid")}
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

      {/* Task List - Compact */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          pr: 1,
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
              py: 8,
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
              display: viewMode === "grid" ? "grid" : "flex",
              flexDirection: viewMode === "list" ? "column" : undefined,
              gridTemplateColumns:
                viewMode === "grid"
                  ? { sm: "repeat(2, 1fr)", lg: "repeat(2, 1fr)" }
                  : undefined,
              gap: 1.5,
            }}
          >
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </Box>
        )}
      </Box>

      {/* Pagination - Compact */}
      {pagination && pagination.totalPages > 1 && (
        <Box
          sx={{
            mt: 1.5,
            pt: 1.5,
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          <TaskPagination />
        </Box>
      )}
    </Box>
  );
}
