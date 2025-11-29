"use client";

import {
  Box,
  Button,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Divider,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  alpha,
} from "@mui/material";
import {
  Add,
  Search,
  FilterList,
  CheckCircle,
  RadioButtonUnchecked,
  AccessTime,
  TrendingUp,
} from "@mui/icons-material";
import { useTasks } from "@/contexts/TaskContext";
import { TaskStatus } from "@/lib/types";
import { TaskForm } from "@/components/tasks/TaskForm";
import { useState, useCallback, useEffect, useRef } from "react";

interface LeftSidebarProps {
  onCreateTask: () => void;
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (open: boolean) => void;
}

export function LeftSidebar({
  onCreateTask,
  isCreateModalOpen,
  setIsCreateModalOpen,
}: LeftSidebarProps) {
  const { stats, filters, setFilters } = useTasks();
  const [searchInput, setSearchInput] = useState(filters.search || "");

  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      if (searchInput !== filters.search) {
        // FIX: Only add search property if it has a value, otherwise delete it
        const newFilters = { ...filters, page: 1 };

        if (searchInput && searchInput.trim()) {
          newFilters.search = searchInput;
        } else {
          // Remove search property entirely if empty
          delete newFilters.search;
        }

        setFilters(newFilters);
      }
    }, 500);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchInput, filters, setFilters]);

  const statItems = [
    {
      label: "Total",
      value: stats?.total || 0,
      icon: <TrendingUp sx={{ fontSize: 18 }} />,
      color: "#3b82f6",
      bgColor: alpha("#3b82f6", 0.1),
    },
    {
      label: "Pending",
      value: stats?.pending || 0,
      icon: <RadioButtonUnchecked sx={{ fontSize: 18 }} />,
      color: "#f59e0b",
      bgColor: alpha("#f59e0b", 0.1),
    },
    {
      label: "In Progress",
      value: stats?.inProgress || 0,
      icon: <AccessTime sx={{ fontSize: 18 }} />,
      color: "#8b5cf6",
      bgColor: alpha("#8b5cf6", 0.1),
    },
    {
      label: "Completed",
      value: stats?.completed || 0,
      icon: <CheckCircle sx={{ fontSize: 18 }} />,
      color: "#10b981",
      bgColor: alpha("#10b981", 0.1),
    },
  ];

  return (
    <Box
      sx={{
        p: 1,
        borderRight: "1px solid",
        borderColor: "divider",
        height: "100%",
        overflowY: "auto",
        background: "linear-gradient(180deg, #f8f9ff 0%, #fefeff 100%)",
        "&::-webkit-scrollbar": { width: 6 },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(102, 126, 234, 0.3)",
          borderRadius: 3,
          "&:hover": {
            backgroundColor: "rgba(102, 126, 234, 0.5)",
          },
        },
      }}
    >
      {/* Create Task Button */}
      <Button
        fullWidth
        variant="contained"
        startIcon={<Add />}
        onClick={onCreateTask}
        sx={{
          mb: 2,
          py: 1.2,
          fontWeight: 700,
          fontSize: "0.875rem",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          boxShadow: "0 4px 12px rgba(102, 126, 234, 0.35)",
          borderRadius: 2,
          textTransform: "none",
          "&:hover": {
            background: "linear-gradient(135deg, #5568d3 0%, #6a4292 100%)",
            boxShadow: "0 6px 16px rgba(102, 126, 234, 0.45)",
            transform: "translateY(-1px)",
          },
          transition: "all 0.2s ease-in-out",
        }}
      >
        New Task
      </Button>

      {/* Filters */}
      <Paper
        elevation={0}
        sx={{
          p: 1,
          border: "1px solid",
          borderColor: alpha("#667eea", 0.1),
          borderRadius: 2,
          background: "linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)",
          boxShadow: "0 2px 8px rgba(102, 126, 234, 0.08)",
          mb: 2,
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
          <Search sx={{ fontSize: 16 }} />
          Filters
        </Typography>

        {/* Search */}
        <TextField
          fullWidth
          size="small"
          placeholder="Search tasks..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          sx={{
            mb: 2,
            "& .MuiInputBase-root": {
              fontSize: "0.875rem",
              borderRadius: 1.5,
              backgroundColor: "#ffffff",
              "&:hover": {
                backgroundColor: "#fafbff",
              },
              "&.Mui-focused": {
                backgroundColor: "#ffffff",
                boxShadow: "0 0 0 3px rgba(102, 126, 234, 0.1)",
              },
            },
          }}
        />

        {/* Status Filter */}
        <TextField
          select
          fullWidth
          size="small"
          label="Status"
          value={filters.status || "all"}
          onChange={(e) => {
            // FIX: Clean up undefined values when setting filters
            const newFilters = { ...filters, page: 1 };

            if (e.target.value === "all") {
              delete newFilters.status;
            } else {
              newFilters.status = e.target.value as TaskStatus;
            }

            setFilters(newFilters);
          }}
          sx={{
            mb: 2,
            "& .MuiInputBase-root": {
              borderRadius: 1.5,
              backgroundColor: "#ffffff",
            },
          }}
        >
          <MenuItem value="all">All Status</MenuItem>
          <MenuItem value={TaskStatus.PENDING}>Pending</MenuItem>
          <MenuItem value={TaskStatus.IN_PROGRESS}>In Progress</MenuItem>
          <MenuItem value={TaskStatus.COMPLETED}>Completed</MenuItem>
        </TextField>

        {/* Sort By */}
        <TextField
          select
          fullWidth
          size="small"
          label="Sort By"
          value={`${filters.sortBy}-${filters.sortOrder}`}
          onChange={(e) => {
            const [sortBy, sortOrder] = e.target.value.split("-");
            setFilters({
              ...filters,
              sortBy: sortBy as any,
              sortOrder: sortOrder as "asc" | "desc",
              page: 1,
            });
          }}
          sx={{
            "& .MuiInputBase-root": {
              borderRadius: 1.5,
              backgroundColor: "#ffffff",
            },
          }}
        >
          <MenuItem value="createdAt-desc">Newest First</MenuItem>
          <MenuItem value="createdAt-asc">Oldest First</MenuItem>
          <MenuItem value="title-asc">Title A-Z</MenuItem>
          <MenuItem value="title-desc">Title Z-A</MenuItem>
          <MenuItem value="updatedAt-desc">Recently Updated</MenuItem>
        </TextField>

        {/* Active Filters */}
        {(filters.status || filters.search) && (
          <>
            <Divider sx={{ my: 1.5 }} />
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {filters.status && (
                <Chip
                  label={filters.status}
                  size="small"
                  onDelete={() => {
                    // FIX: Delete property instead of setting to undefined
                    const newFilters = { ...filters, page: 1 };
                    delete newFilters.status;
                    setFilters(newFilters);
                  }}
                  sx={{
                    borderRadius: 1.5,
                    height: 24,
                    fontSize: "0.75rem",
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "#ffffff",
                    fontWeight: 600,
                    "& .MuiChip-deleteIcon": {
                      color: "rgba(255, 255, 255, 0.8)",
                      "&:hover": {
                        color: "#ffffff",
                      },
                    },
                  }}
                />
              )}
              {filters.search && (
                <Chip
                  label={`"${filters.search.slice(0, 10)}${
                    filters.search.length > 10 ? "..." : ""
                  }"`}
                  size="small"
                  onDelete={() => {
                    setSearchInput("");
                    // FIX: Delete property instead of setting to undefined
                    const newFilters = { ...filters, page: 1 };
                    delete newFilters.search;
                    setFilters(newFilters);
                  }}
                  sx={{
                    borderRadius: 1.5,
                    height: 24,
                    fontSize: "0.75rem",
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "#ffffff",
                    fontWeight: 600,
                    "& .MuiChip-deleteIcon": {
                      color: "rgba(255, 255, 255, 0.8)",
                      "&:hover": {
                        color: "#ffffff",
                      },
                    },
                  }}
                />
              )}
            </Box>
          </>
        )}
      </Paper>

      {/* Stats Overview */}
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
          <FilterList sx={{ fontSize: 16 }} />
          Overview
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {statItems.map((stat) => (
            <Box
              key={stat.label}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                p: 1,
                borderRadius: 1.5,
                backgroundColor: stat.bgColor,
                border: `1px solid ${alpha(stat.color, 0.15)}`,
                cursor: "pointer",
                transition: "all 0.25s ease-in-out",
                "&:hover": {
                  boxShadow: `0 4px 12px ${alpha(stat.color, 0.15)}`,
                  backgroundColor: alpha(stat.color, 0.15),
                  borderColor: alpha(stat.color, 0.3),
                },
              }}
              onClick={() => {
                // FIX: Clean up undefined values when setting filters
                const newFilters = { ...filters, page: 1 };

                if (stat.label === "Pending") {
                  newFilters.status = TaskStatus.PENDING;
                } else if (stat.label === "In Progress") {
                  newFilters.status = TaskStatus.IN_PROGRESS;
                } else if (stat.label === "Completed") {
                  newFilters.status = TaskStatus.COMPLETED;
                } else {
                  delete newFilters.status;
                }

                setFilters(newFilters);
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  sx={{
                    color: stat.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 32,
                    height: 32,
                    borderRadius: 1,
                    backgroundColor: alpha(stat.color, 0.15),
                  }}
                >
                  {stat.icon}
                </Box>
                <Typography
                  variant="caption"
                  fontWeight={600}
                  fontSize="0.8rem"
                >
                  {stat.label}
                </Typography>
              </Box>
              <Typography
                variant="h6"
                fontWeight={700}
                sx={{ color: stat.color, fontSize: "1.1rem" }}
              >
                {stat.value}
              </Typography>
            </Box>
          ))}
        </Box>
      </Paper>

      {/* Create Task Modal */}
      <Dialog
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ pb: 1, py: 1.5 }}>
          <Typography fontWeight={700} fontSize="1.125rem">
            Create New Task
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ pt: 1.5 }}>
          <TaskForm
            onSuccess={() => setIsCreateModalOpen(false)}
            onCancel={() => setIsCreateModalOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}
