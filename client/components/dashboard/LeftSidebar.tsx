"use client";

import {
  Box,
  Button,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  alpha,
} from "@mui/material";
import {
  Add,
  FilterList,
  CheckCircle,
  RadioButtonUnchecked,
  AccessTime,
  TrendingUp,
} from "@mui/icons-material";
import { useTasks } from "@/contexts/TaskContext";
import { TaskStatus } from "@/lib/types";
import { TaskForm } from "@/components/tasks/TaskForm";
import { useState, useEffect, useRef } from "react";

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
        const newFilters = { ...filters, page: 1 };

        if (searchInput && searchInput.trim()) {
          newFilters.search = searchInput;
        } else {
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
          p: { xs: 2, md: 1 },
          border: "1px solid",
          borderColor: "divider",
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
          <FilterList sx={{ fontSize: 16 }} />
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
            mb: 1.5,
            "& .MuiOutlinedInput-root": {
              fontSize: "0.813rem",
              borderRadius: 1.5,
              backgroundColor: "#ffffff",
              "& fieldset": {
                borderColor: alpha("#667eea", 0.2),
              },
              "&:hover fieldset": {
                borderColor: alpha("#667eea", 0.4),
              },
              "&.Mui-focused fieldset": {
                borderColor: "#667eea",
              },
            },
          }}
        />

        {/* Status Filter */}
        <TextField
          fullWidth
          select
          size="small"
          label="Status"
          value={filters.status || "all"}
          onChange={(e) =>
            setFilters({
              ...filters,
              status:
                e.target.value === "all"
                  ? undefined
                  : (e.target.value as TaskStatus),
              page: 1,
            })
          }
          sx={{
            mb: 1.5,
            "& .MuiOutlinedInput-root": {
              fontSize: "0.813rem",
              borderRadius: 1.5,
              backgroundColor: "#ffffff",
              "& fieldset": {
                borderColor: alpha("#667eea", 0.2),
              },
              "&:hover fieldset": {
                borderColor: alpha("#667eea", 0.4),
              },
              "&.Mui-focused fieldset": {
                borderColor: "#667eea",
              },
            },
            "& .MuiInputLabel-root": {
              fontSize: "0.813rem",
              "&.Mui-focused": {
                color: "#667eea",
              },
            },
          }}
        >
          <MenuItem value="all">All Tasks</MenuItem>
          <MenuItem value={TaskStatus.PENDING}>Pending</MenuItem>
          <MenuItem value={TaskStatus.IN_PROGRESS}>In Progress</MenuItem>
          <MenuItem value={TaskStatus.COMPLETED}>Completed</MenuItem>
        </TextField>

        {/* Sort Options */}
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1 }}>
          <TextField
            select
            size="small"
            label="Sort By"
            value={filters.sortBy || "createdAt"}
            onChange={(e) =>
              setFilters({
                ...filters,
                sortBy: e.target.value as "createdAt" | "updatedAt" | "title",
              })
            }
            sx={{
              "& .MuiOutlinedInput-root": {
                fontSize: "0.75rem",
                borderRadius: 1.5,
                backgroundColor: "#ffffff",
                "& fieldset": {
                  borderColor: alpha("#667eea", 0.2),
                },
                "&:hover fieldset": {
                  borderColor: alpha("#667eea", 0.4),
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#667eea",
                },
              },
              "& .MuiInputLabel-root": {
                fontSize: "0.75rem",
                "&.Mui-focused": {
                  color: "#667eea",
                },
              },
            }}
          >
            <MenuItem value="createdAt" sx={{ fontSize: "0.75rem" }}>
              Created
            </MenuItem>
            <MenuItem value="updatedAt" sx={{ fontSize: "0.75rem" }}>
              Updated
            </MenuItem>
            <MenuItem value="title" sx={{ fontSize: "0.75rem" }}>
              Title
            </MenuItem>
          </TextField>

          <TextField
            select
            size="small"
            label="Order"
            value={filters.sortOrder || "desc"}
            onChange={(e) =>
              setFilters({
                ...filters,
                sortOrder: e.target.value as "asc" | "desc",
              })
            }
            sx={{
              "& .MuiOutlinedInput-root": {
                fontSize: "0.75rem",
                borderRadius: 1.5,
                backgroundColor: "#ffffff",
                "& fieldset": {
                  borderColor: alpha("#667eea", 0.2),
                },
                "&:hover fieldset": {
                  borderColor: alpha("#667eea", 0.4),
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#667eea",
                },
              },
              "& .MuiInputLabel-root": {
                fontSize: "0.75rem",
                "&.Mui-focused": {
                  color: "#667eea",
                },
              },
            }}
          >
            <MenuItem value="desc" sx={{ fontSize: "0.75rem" }}>
              Newest
            </MenuItem>
            <MenuItem value="asc" sx={{ fontSize: "0.75rem" }}>
              Oldest
            </MenuItem>
          </TextField>
        </Box>
      </Paper>

      {/* Quick Stats */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, md: 1 },
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
          Quick Stats
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {statItems.map((item) => (
            <Box
              key={item.label}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                p: 1,
                borderRadius: 1.5,
                backgroundColor: item.bgColor,
                border: `1px solid ${alpha(item.color, 0.2)}`,
                transition: "all 0.25s ease-in-out",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: alpha(item.color, 0.15),
                  borderColor: alpha(item.color, 0.4),
                  transform: "translateX(4px)",
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 28,
                    height: 28,
                    borderRadius: 1,
                    backgroundColor: alpha(item.color, 0.15),
                    color: item.color,
                  }}
                >
                  {item.icon}
                </Box>
                <Typography
                  variant="caption"
                  fontWeight={600}
                  fontSize="0.75rem"
                >
                  {item.label}
                </Typography>
              </Box>
              <Chip
                label={item.value}
                size="small"
                sx={{
                  height: 20,
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  backgroundColor: alpha(item.color, 0.2),
                  color: item.color,
                  border: `1px solid ${alpha(item.color, 0.3)}`,
                  "& .MuiChip-label": {
                    px: 1,
                  },
                }}
              />
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
        <DialogTitle
          sx={{
            fontWeight: 700,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            py: 2,
          }}
        >
          Create New Task
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <TaskForm
            onSuccess={() => setIsCreateModalOpen(false)}
            onCancel={() => setIsCreateModalOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}
