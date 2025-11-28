"use client";

import { Box, Typography, CircularProgress, Button, Grid } from "@mui/material";
import { useTasks } from "@/contexts/TaskContext";
import { TaskCard } from "./TaskCard";

export function TaskList() {
  const { tasks, isLoading, pagination, setFilters, filters } = useTasks();

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 200,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <Box
        sx={{
          textAlign: "center",
          py: 8,
          backgroundColor: "background.paper",
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          No tasks found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Create your first task to get started!
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Grid container spacing={2}>
        {tasks.map((task) => (
          <Grid item xs={12} key={task.id}>
            <TaskCard task={task} />
          </Grid>
        ))}
      </Grid>

      {pagination && pagination.totalPages > 1 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            mt: 4,
          }}
        >
          <Button
            variant="outlined"
            size="small"
            onClick={() => setFilters({ ...filters, page: filters.page! - 1 })}
            disabled={!pagination.hasPrev}
          >
            Previous
          </Button>

          <Typography variant="body2" color="text.secondary">
            Page {pagination.page} of {pagination.totalPages}
          </Typography>

          <Button
            variant="outlined"
            size="small"
            onClick={() => setFilters({ ...filters, page: filters.page! + 1 })}
            disabled={!pagination.hasNext}
          >
            Next
          </Button>
        </Box>
      )}
    </Box>
  );
}
