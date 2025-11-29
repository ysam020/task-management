"use client";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Avatar,
  alpha,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { LogoutOutlined, ChecklistRtlOutlined } from "@mui/icons-material";
import { useAuth } from "@/contexts/AuthContext";

export function Header() {
  const { user, logout } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ py: 0.5 }}>
          {/* Logo */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              mr: 3,
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ChecklistRtlOutlined
                sx={{ color: "primary.main", fontSize: 24 }}
              />
            </Box>
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 700,
                color: "text.primary",
                fontSize: "1.25rem",
                display: { xs: "none", sm: "block" },
              }}
            >
              TaskFlow
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {/* User Section */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            {!isMobile && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.05),
                }}
              >
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: "primary.main",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                  }}
                >
                  {user?.name?.charAt(0).toUpperCase()}
                </Avatar>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    color: "text.primary",
                  }}
                >
                  {user?.name}
                </Typography>
              </Box>
            )}

            {isMobile ? (
              <IconButton
                onClick={logout}
                size="small"
                sx={{
                  color: "text.secondary",
                  "&:hover": {
                    bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
                    color: "error.main",
                  },
                }}
              >
                <LogoutOutlined fontSize="small" />
              </IconButton>
            ) : (
              <Button
                variant="outlined"
                size="small"
                startIcon={<LogoutOutlined fontSize="small" />}
                onClick={logout}
                sx={{
                  textTransform: "none",
                  fontWeight: 500,
                  borderColor: "divider",
                  color: "text.secondary",
                  "&:hover": {
                    borderColor: "error.main",
                    color: "error.main",
                    bgcolor: (theme) => alpha(theme.palette.error.main, 0.04),
                  },
                }}
              >
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
