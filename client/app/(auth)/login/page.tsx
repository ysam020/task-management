"use client";

import { Formik, Form, Field } from "formik";
import Link from "next/link";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Stack,
  alpha,
} from "@mui/material";
import {
  EmailOutlined,
  LockOutlined,
  LoginOutlined,
} from "@mui/icons-material";
import { useAuth } from "@/contexts/AuthContext";
import { loginSchema } from "@/lib/validations/auth.schema";

export default function LoginPage() {
  const { login } = useAuth();

  return (
    <Box>
      {/* Header */}
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: 3,
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
          }}
        >
          <LoginOutlined sx={{ fontSize: 32, color: "primary.main" }} />
        </Box>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
          Welcome Back
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Sign in to continue to your tasks
        </Typography>
      </Box>

      {/* Form */}
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await login(values);
          } catch (error) {
            // Error is handled in context
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <Stack spacing={2.5}>
              <Field name="email">
                {({ field }: any) => (
                  <TextField
                    {...field}
                    type="email"
                    label="Email Address"
                    placeholder="you@example.com"
                    fullWidth
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    disabled={isSubmitting}
                  />
                )}
              </Field>

              <Field name="password">
                {({ field }: any) => (
                  <TextField
                    {...field}
                    type="password"
                    label="Password"
                    placeholder="Enter your password"
                    fullWidth
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    disabled={isSubmitting}
                  />
                )}
              </Field>

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={isSubmitting}
                sx={{
                  py: 1.5,
                  fontWeight: 600,
                  textTransform: "none",
                  fontSize: "1rem",
                  mt: 1,
                  boxShadow: (theme) =>
                    `0 4px 12px ${alpha(theme.palette.primary.main, 0.25)}`,
                  "&:hover": {
                    boxShadow: (theme) =>
                      `0 6px 16px ${alpha(theme.palette.primary.main, 0.35)}`,
                  },
                }}
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>

      {/* Footer */}
      <Box
        sx={{
          textAlign: "center",
          mt: 3,
          pt: 3,
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Don't have an account?{" "}
          <Link
            href="/register"
            style={{
              color: "#6366f1",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Create one now
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
