"use client";

import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useTasks } from "@/contexts/TaskContext";
import { LeftSidebar } from "@/components/dashboard/LeftSidebar";
import { MainContent } from "@/components/dashboard/MainContent";
import { RightSidebar } from "@/components/dashboard/RightSidebar";
import { Task } from "@/lib/types";

export default function DashboardPage() {
  const { fetchTasks, fetchTaskStats } = useTasks();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
    fetchTaskStats();
  }, []);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          md: "280px 1fr",
          lg: "280px 1fr 320px",
        },
        gap: 3,
        height: "100%",
        overflow: "hidden",
        p: 3,
      }}
    >
      {/* Left Sidebar - Filters & Quick Actions */}
      <Box
        sx={{
          height: "100%",
          overflowY: "auto",
          backgroundColor: (theme) =>
            theme.palette.mode === "dark"
              ? "rgba(0, 0, 0, 0.2)"
              : "rgba(0, 0, 0, 0.02)",
          borderRadius: 2,
          p: 2,
          "&::-webkit-scrollbar": { width: "6px" },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,0.2)",
            borderRadius: "3px",
          },
        }}
      >
        <LeftSidebar
          onCreateTask={() => setIsCreateModalOpen(true)}
          isCreateModalOpen={isCreateModalOpen}
          setIsCreateModalOpen={setIsCreateModalOpen}
        />
      </Box>

      {/* Main Content - Task List */}
      <Box
        sx={{
          height: "100%",
          overflowY: "auto",
          "&::-webkit-scrollbar": { width: "6px" },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,0.2)",
            borderRadius: "3px",
          },
        }}
      >
        <MainContent
          selectedTask={selectedTask}
          setSelectedTask={setSelectedTask}
        />
      </Box>

      {/* Right Sidebar - Task Details & Activity */}
      <Box
        sx={{
          display: { xs: "none", lg: "block" },
          height: "100%",
          overflowY: "auto",
          backgroundColor: (theme) =>
            theme.palette.mode === "dark"
              ? "rgba(0, 0, 0, 0.2)"
              : "rgba(0, 0, 0, 0.02)",
          borderRadius: 2,
          p: 2,
          "&::-webkit-scrollbar": { width: "6px" },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,0.2)",
            borderRadius: "3px",
          },
        }}
      >
        <RightSidebar selectedTask={selectedTask} />
      </Box>
    </Box>
  );
}
