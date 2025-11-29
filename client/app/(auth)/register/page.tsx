"use client";

import { Formik, Form, Field } from "formik";
import Link from "next/link";
import { Box, Typography, TextField, Button, Stack } from "@mui/material";
import { HowToRegOutlined } from "@mui/icons-material";
import { useAuth } from "@/contexts/AuthContext";
import { registerSchema } from "@/lib/validations/auth.schema";

export default function RegisterPage() {
  const { register } = useAuth();

  return (
    <Box>
      {/* Header */}
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
          }}
        >
          <HowToRegOutlined sx={{ fontSize: 32, color: "primary.main" }} />
        </Box>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
          Create Account
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Get started with your task management
        </Typography>
      </Box>

      {/* Form */}
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={registerSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await register(values);
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
              <Field name="name">
                {({ field }: any) => (
                  <TextField
                    {...field}
                    type="text"
                    label="Full Name"
                    placeholder="John Doe"
                    fullWidth
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                    disabled={isSubmitting}
                  />
                )}
              </Field>

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
                    placeholder="Create a strong password"
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
                }}
              >
                {isSubmitting ? "Creating account..." : "Create Account"}
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
          Already have an account?{" "}
          <Link
            href="/login"
            style={{
              color: "#6366f1",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Sign in instead
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
