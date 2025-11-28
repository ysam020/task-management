"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, CircularProgress } from "@mui/material";
import { useAuth } from "@/contexts/AuthContext";
import { TaskProvider } from "@/contexts/TaskContext";
import { Header } from "@/components/layout/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          bgcolor: "background.default",
        }}
      >
        <CircularProgress size={48} />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <TaskProvider>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          bgcolor: "background.default",
        }}
      >
        <Header />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: { xs: 3, sm: 4 },
          }}
        >
          {children}
        </Box>
      </Box>
    </TaskProvider>
  );
}
