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
import { useState, useCallback, useEffect } from "react";
import { debounce } from "@/lib/utils/helper";

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

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setFilters({ ...filters, search: value, page: 1 });
    }, 500),
    [filters]
  );

  useEffect(() => {
    debouncedSearch(searchInput);
  }, [searchInput, debouncedSearch]);

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
    <Box>
      {/* Create Button - Compact */}
      <Button
        fullWidth
        variant="contained"
        size="medium"
        startIcon={<Add />}
        onClick={onCreateTask}
        sx={{
          mb: 1.5,
          py: 0.75,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          boxShadow: "0 2px 8px rgba(102, 126, 234, 0.3)",
          "&:hover": {
            background: "linear-gradient(135deg, #5568d3 0%, #63408b 100%)",
            boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
          },
        }}
      >
        New Task
      </Button>

      {/* Stats Overview - Compact */}
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
          sx={{
            mb: 1,
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            textTransform: "uppercase",
          }}
        >
          <FilterList sx={{ fontSize: 16 }} />
          Overview
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
          {statItems.map((stat) => (
            <Box
              key={stat.label}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                p: 1,
                borderRadius: 1,
                backgroundColor: stat.bgColor,
                cursor: "pointer",
                transition: "all 0.2s",
                "&:hover": {
                  transform: "translateX(3px)",
                  boxShadow: `0 1px 4px ${alpha(stat.color, 0.2)}`,
                },
              }}
              onClick={() => {
                if (stat.label === "Pending") {
                  setFilters({ ...filters, status: TaskStatus.PENDING });
                } else if (stat.label === "In Progress") {
                  setFilters({ ...filters, status: TaskStatus.IN_PROGRESS });
                } else if (stat.label === "Completed") {
                  setFilters({ ...filters, status: TaskStatus.COMPLETED });
                } else {
                  setFilters({ ...filters, status: undefined });
                }
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                <Box sx={{ color: stat.color }}>{stat.icon}</Box>
                <Typography variant="caption" fontWeight={600}>
                  {stat.label}
                </Typography>
              </Box>
              <Typography
                variant="h6"
                fontWeight={700}
                sx={{ color: stat.color, fontSize: "0.875rem" }}
              >
                {stat.value}
              </Typography>
            </Box>
          ))}
        </Box>
      </Paper>

      {/* Filters - Compact */}
      <Paper
        elevation={0}
        sx={{
          p: 1.5,
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
          Filters
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {/* Search */}
          <TextField
            size="small"
            placeholder="Search tasks..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            InputProps={{
              startAdornment: <Search sx={{ fontSize: 18, mr: 0.5 }} />,
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                fontSize: "0.8125rem",
                height: "32px",
              },
            }}
          />

          {/* Status Filter */}
          <TextField
            select
            size="small"
            label="Status"
            value={filters.status || "all"}
            onChange={(e) => {
              const value = e.target.value;
              setFilters({
                ...filters,
                status: value === "all" ? undefined : (value as TaskStatus),
                page: 1,
              });
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                fontSize: "0.8125rem",
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
            size="small"
            label="Sort By"
            value={filters.sortBy || "createdAt"}
            onChange={(e) =>
              setFilters({
                ...filters,
                sortBy: e.target.value as "createdAt" | "updatedAt" | "title",
                page: 1,
              })
            }
            sx={{
              "& .MuiOutlinedInput-root": {
                fontSize: "0.8125rem",
              },
            }}
          >
            <MenuItem value="createdAt">Created Date</MenuItem>
            <MenuItem value="updatedAt">Updated Date</MenuItem>
            <MenuItem value="title">Title</MenuItem>
          </TextField>

          {/* Sort Order */}
          <TextField
            select
            size="small"
            label="Order"
            value={filters.sortOrder || "desc"}
            onChange={(e) =>
              setFilters({
                ...filters,
                sortOrder: e.target.value as "asc" | "desc",
                page: 1,
              })
            }
            sx={{
              "& .MuiOutlinedInput-root": {
                fontSize: "0.8125rem",
              },
            }}
          >
            <MenuItem value="desc">Newest First</MenuItem>
            <MenuItem value="asc">Oldest First</MenuItem>
          </TextField>
        </Box>

        {/* Active Filters - Compact */}
        {(filters.status || filters.search) && (
          <>
            <Divider sx={{ my: 1 }} />
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {filters.status && (
                <Chip
                  label={filters.status}
                  size="small"
                  onDelete={() =>
                    setFilters({ ...filters, status: undefined, page: 1 })
                  }
                  sx={{ fontSize: "0.7rem", height: 20 }}
                />
              )}
              {filters.search && (
                <Chip
                  label={`"${filters.search}"`}
                  size="small"
                  onDelete={() => {
                    setSearchInput("");
                    setFilters({ ...filters, search: "", page: 1 });
                  }}
                  sx={{ fontSize: "0.7rem", height: 20 }}
                />
              )}
            </Box>
          </>
        )}
      </Paper>

      {/* Task Form Dialog */}
      <Dialog
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Create New Task</DialogTitle>
        <DialogContent>
          <TaskForm onClose={() => setIsCreateModalOpen(false)} />
        </DialogContent>
      </Dialog>
    </Box>
  );
}
