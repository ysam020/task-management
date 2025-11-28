"use client";

import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Stack,
  Paper,
  alpha,
} from "@mui/material";
import {
  InboxOutlined,
  ChevronLeftOutlined,
  ChevronRightOutlined,
} from "@mui/icons-material";
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
          minHeight: 300,
        }}
      >
        <CircularProgress size={48} />
      </Box>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <Paper
        elevation={0}
        sx={{
          textAlign: "center",
          py: 8,
          px: 3,
          bgcolor: "background.paper",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px",
          }}
        >
          <InboxOutlined
            sx={{ fontSize: 40, color: "primary.main", opacity: 0.6 }}
          />
        </Box>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          No tasks found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Create your first task to get started with organizing your work!
        </Typography>
      </Paper>
    );
  }

  return (
    <Box>
      <Stack spacing={1.5}>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </Stack>

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
            startIcon={<ChevronLeftOutlined />}
            onClick={() => setFilters({ ...filters, page: filters.page! - 1 })}
            disabled={!pagination.hasPrev}
            sx={{
              minWidth: 100,
              textTransform: "none",
              fontWeight: 500,
            }}
          >
            Previous
          </Button>

          <Paper
            elevation={0}
            sx={{
              px: 2,
              py: 0.75,
              bgcolor: "background.default",
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              Page {pagination.page} of {pagination.totalPages}
            </Typography>
          </Paper>

          <Button
            variant="outlined"
            size="small"
            endIcon={<ChevronRightOutlined />}
            onClick={() => setFilters({ ...filters, page: filters.page! + 1 })}
            disabled={!pagination.hasNext}
            sx={{
              minWidth: 100,
              textTransform: "none",
              fontWeight: 500,
            }}
          >
            Next
          </Button>
        </Box>
      )}
    </Box>
  );
}
