"use client";

import { Box, Typography, IconButton, alpha } from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  FirstPage,
  LastPage,
} from "@mui/icons-material";
import { useTasks } from "@/contexts/TaskContext";

export function TaskPagination() {
  const { pagination, filters, setFilters } = useTasks();

  if (!pagination) return null;

  const { page, totalPages, hasPrev, hasNext } = pagination;

  const handlePageChange = (newPage: number) => {
    setFilters({ ...filters, page: newPage });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 1,
      }}
    >
      <Typography variant="caption" color="text.secondary" fontSize="0.75rem">
        Page {page} of {totalPages}
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        <IconButton
          size="small"
          onClick={() => handlePageChange(1)}
          disabled={!hasPrev}
          sx={{
            border: "1px solid",
            borderColor: "divider",
            width: 28,
            height: 28,
            "&:hover": {
              backgroundColor: alpha("#667eea", 0.1),
              borderColor: "#667eea",
            },
            "&:disabled": {
              opacity: 0.5,
            },
          }}
        >
          <FirstPage sx={{ fontSize: 16 }} />
        </IconButton>

        <IconButton
          size="small"
          onClick={() => handlePageChange(page - 1)}
          disabled={!hasPrev}
          sx={{
            border: "1px solid",
            borderColor: "divider",
            width: 28,
            height: 28,
            "&:hover": {
              backgroundColor: alpha("#667eea", 0.1),
              borderColor: "#667eea",
            },
            "&:disabled": {
              opacity: 0.5,
            },
          }}
        >
          <ChevronLeft sx={{ fontSize: 16 }} />
        </IconButton>

        <Box
          sx={{
            px: 1.5,
            py: 0.25,
            backgroundColor: alpha("#667eea", 0.1),
            borderRadius: 1,
            minWidth: 64,
            textAlign: "center",
          }}
        >
          <Typography
            variant="caption"
            fontWeight={700}
            color="primary"
            fontSize="0.75rem"
          >
            {page} / {totalPages}
          </Typography>
        </Box>

        <IconButton
          size="small"
          onClick={() => handlePageChange(page + 1)}
          disabled={!hasNext}
          sx={{
            border: "1px solid",
            borderColor: "divider",
            width: 28,
            height: 28,
            "&:hover": {
              backgroundColor: alpha("#667eea", 0.1),
              borderColor: "#667eea",
            },
            "&:disabled": {
              opacity: 0.5,
            },
          }}
        >
          <ChevronRight sx={{ fontSize: 16 }} />
        </IconButton>

        <IconButton
          size="small"
          onClick={() => handlePageChange(totalPages)}
          disabled={!hasNext}
          sx={{
            border: "1px solid",
            borderColor: "divider",
            width: 28,
            height: 28,
            "&:hover": {
              backgroundColor: alpha("#667eea", 0.1),
              borderColor: "#667eea",
            },
            "&:disabled": {
              opacity: 0.5,
            },
          }}
        >
          <LastPage sx={{ fontSize: 16 }} />
        </IconButton>
      </Box>
    </Box>
  );
}
