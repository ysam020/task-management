"use client";

import { useState } from "react";
import { Box } from "@mui/material";
import { LeftSidebar } from "@/components/dashboard/LeftSidebar";
import { MainContent } from "@/components/dashboard/MainContent";
import { RightSidebar } from "@/components/dashboard/RightSidebar";

export default function DashboardPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

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
      {/* Left Sidebar */}
      <LeftSidebar
        onCreateTask={() => setIsCreateModalOpen(true)}
        isCreateModalOpen={isCreateModalOpen}
        setIsCreateModalOpen={setIsCreateModalOpen}
      />

      {/* Main Content */}
      <MainContent />

      {/* Right Sidebar  */}
      <Box sx={{ display: { xs: "none", lg: "block" } }}>
        <RightSidebar />
      </Box>
    </Box>
  );
}
