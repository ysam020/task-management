"use client";

import { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Fade,
  alpha,
} from "@mui/material";
import { AddOutlined } from "@mui/icons-material";
import { useTasks } from "@/contexts/TaskContext";
import { TaskList } from "@/components/tasks/TaskList";
import { TaskFilters } from "@/components/tasks/TaskFilters";
import { TaskForm } from "@/components/tasks/TaskForm";

export default function DashboardPage() {
  const { fetchTasks, fetchTaskStats } = useTasks();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
    fetchTaskStats();
  }, []);

  return (
    <Container maxWidth="xl">
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 700,
              color: "text.primary",
              mb: 0.5,
            }}
          >
            My Tasks
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage and organize your tasks efficiently
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddOutlined />}
          onClick={() => setIsCreateModalOpen(true)}
          sx={{
            textTransform: "none",
            fontWeight: 600,
            px: 3,
            py: 1.25,
            borderRadius: 2,
            boxShadow: (theme) =>
              `0 4px 12px ${alpha(theme.palette.primary.main, 0.25)}`,
            "&:hover": {
              boxShadow: (theme) =>
                `0 6px 16px ${alpha(theme.palette.primary.main, 0.35)}`,
            },
          }}
        >
          Create Task
        </Button>
      </Box>

      {/* Filters Section */}
      <TaskFilters />

      {/* Task List Section */}
      <TaskList />

      {/* Create Task Dialog */}
      <Dialog
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        maxWidth="sm"
        fullWidth
        TransitionComponent={Fade}
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: (theme) =>
              `0 24px 48px ${alpha(theme.palette.common.black, 0.12)}`,
          },
        }}
      >
        <DialogTitle
          sx={{
            pb: 1,
            pt: 3,
            px: 3,
            fontSize: "1.5rem",
            fontWeight: 700,
          }}
        >
          Create New Task
        </DialogTitle>
        <DialogContent sx={{ px: 3, pb: 3 }}>
          <Box sx={{ pt: 2 }}>
            <TaskForm
              onSuccess={() => setIsCreateModalOpen(false)}
              onCancel={() => setIsCreateModalOpen(false)}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </Container>
  );
}
