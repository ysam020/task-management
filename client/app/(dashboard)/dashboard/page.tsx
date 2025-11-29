"use client";

import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useTasks } from "@/contexts/TaskContext";
import { LeftSidebar } from "@/components/dashboard/LeftSidebar";
import { MainContent } from "@/components/dashboard/MainContent";
import { RightSidebar } from "@/components/dashboard/RightSidebar";

export default function DashboardPage() {
  const { fetchTasks, fetchTaskStats } = useTasks();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    fetchTaskStats();
  }, [fetchTaskStats]);

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
        height: "calc(100vh - 64px)",
        overflow: "hidden",
        px: 3,
        py: 3,
      }}
    >
      {/* Left Sidebar - Filters & Quick Actions */}
      <LeftSidebar
        onCreateTask={() => setIsCreateModalOpen(true)}
        isCreateModalOpen={isCreateModalOpen}
        setIsCreateModalOpen={setIsCreateModalOpen}
      />

      {/* Main Content - Task List */}
      <MainContent />

      {/* Right Sidebar - Task Details & Activity */}
      <Box sx={{ display: { xs: "none", lg: "block" } }}>
        <RightSidebar />
      </Box>
    </Box>
  );
}
