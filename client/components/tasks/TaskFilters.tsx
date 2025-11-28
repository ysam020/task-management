"use client";

import { useCallback, useEffect, useState } from "react";
import { Box, TextField, MenuItem, Grid } from "@mui/material";
import { Search } from "@mui/icons-material";
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
    <Box sx={{ mb: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            placeholder="Search tasks..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            InputProps={{
              startAdornment: (
                <Search sx={{ mr: 1, color: "text.secondary" }} />
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <TextField
            select
            fullWidth
            label="Status"
            value={filters.status || "all"}
            onChange={(e) => handleStatusChange(e.target.value)}
          >
            <MenuItem value="all">All Status</MenuItem>
            <MenuItem value={TaskStatus.PENDING}>Pending</MenuItem>
            <MenuItem value={TaskStatus.IN_PROGRESS}>In Progress</MenuItem>
            <MenuItem value={TaskStatus.COMPLETED}>Completed</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <TextField
            select
            fullWidth
            label="Sort By"
            value={`${filters.sortBy}-${filters.sortOrder}`}
            onChange={(e) => handleSortChange(e.target.value)}
          >
            <MenuItem value="createdAt-desc">Newest First</MenuItem>
            <MenuItem value="createdAt-asc">Oldest First</MenuItem>
            <MenuItem value="title-asc">Title A-Z</MenuItem>
            <MenuItem value="title-desc">Title Z-A</MenuItem>
            <MenuItem value="updatedAt-desc">Recently Updated</MenuItem>
          </TextField>
        </Grid>
      </Grid>
    </Box>
  );
}
