"use client";

import { useCallback, useEffect, useState } from "react";
import { Box, TextField, MenuItem, InputAdornment, Paper } from "@mui/material";
import {
  SearchOutlined,
  FilterListOutlined,
  SortOutlined,
} from "@mui/icons-material";
import { useTasks } from "@/contexts/TaskContext";
import { debounce } from "@/lib/utils/helper";
import { TaskStatus } from "@/lib/types";

export function TaskFilters() {
  const { filters, setFilters } = useTasks();
  const [searchInput, setSearchInput] = useState(filters.search || "");

  // Debounced search
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setFilters({ ...filters, search: value, page: 1 });
    }, 500),
    [filters]
  );

  useEffect(() => {
    debouncedSearch(searchInput);
  }, [searchInput, debouncedSearch]);

  const handleStatusChange = (value: string) => {
    setFilters({
      ...filters,
      status: value === "all" ? undefined : (value as TaskStatus),
      page: 1,
    });
  };

  const handleSortChange = (value: string) => {
    const [sortBy, sortOrder] = value.split("-");
    setFilters({
      ...filters,
      sortBy: sortBy as any,
      sortOrder: sortOrder as "asc" | "desc",
      page: 1,
    });
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        mb: 3,
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "2fr 1fr 1fr",
          },
          gap: 2,
        }}
      >
        <TextField
          fullWidth
          size="small"
          placeholder="Search tasks..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlined
                  fontSize="small"
                  sx={{ color: "text.secondary" }}
                />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              bgcolor: "background.default",
            },
          }}
        />

        <TextField
          select
          fullWidth
          size="small"
          value={filters.status || "all"}
          onChange={(e) => handleStatusChange(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FilterListOutlined
                  fontSize="small"
                  sx={{ color: "text.secondary" }}
                />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              bgcolor: "background.default",
            },
          }}
        >
          <MenuItem value="all">All Status</MenuItem>
          <MenuItem value={TaskStatus.PENDING}>Pending</MenuItem>
          <MenuItem value={TaskStatus.IN_PROGRESS}>In Progress</MenuItem>
          <MenuItem value={TaskStatus.COMPLETED}>Completed</MenuItem>
        </TextField>

        <TextField
          select
          fullWidth
          size="small"
          value={`${filters.sortBy}-${filters.sortOrder}`}
          onChange={(e) => handleSortChange(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SortOutlined
                  fontSize="small"
                  sx={{ color: "text.secondary" }}
                />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              bgcolor: "background.default",
            },
          }}
        >
          <MenuItem value="createdAt-desc">Newest First</MenuItem>
          <MenuItem value="createdAt-asc">Oldest First</MenuItem>
          <MenuItem value="title-asc">Title A-Z</MenuItem>
          <MenuItem value="title-desc">Title Z-A</MenuItem>
          <MenuItem value="updatedAt-desc">Recently Updated</MenuItem>
        </TextField>
      </Box>
    </Paper>
  );
}
