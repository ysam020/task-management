"use client";

import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import {
  AssignmentOutlined,
  PendingActionsOutlined,
  HourglassEmptyOutlined,
  CheckCircleOutline,
} from "@mui/icons-material";
import { useTasks } from "@/contexts/TaskContext";

export function TaskStats() {
  const { stats } = useTasks();

  const statsData = [
    {
      label: "Total Tasks",
      value: stats?.total || 0,
      color: "#3b82f6",
      icon: <AssignmentOutlined sx={{ fontSize: 40, color: "#3b82f6" }} />,
    },
    {
      label: "Pending",
      value: stats?.pending || 0,
      color: "#f59e0b",
      icon: <PendingActionsOutlined sx={{ fontSize: 40, color: "#f59e0b" }} />,
    },
    {
      label: "In Progress",
      value: stats?.inProgress || 0,
      color: "#8b5cf6",
      icon: <HourglassEmptyOutlined sx={{ fontSize: 40, color: "#8b5cf6" }} />,
    },
    {
      label: "Completed",
      value: stats?.completed || 0,
      color: "#10b981",
      icon: <CheckCircleOutline sx={{ fontSize: 40, color: "#10b981" }} />,
    },
  ];

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {statsData.map((stat) => (
        <Grid item xs={12} sm={6} md={3} key={stat.label}>
          <Card
            sx={{
              borderLeft: `4px solid ${stat.color}`,
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: 4,
              },
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    {stat.label}
                  </Typography>
                  <Typography variant="h3" component="div" fontWeight="bold">
                    {stat.value}
                  </Typography>
                </Box>
                {stat.icon}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
