"use client";

import { Formik, Form, Field } from "formik";
import Link from "next/link";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { useAuth } from "@/contexts/AuthContext";
import { registerSchema } from "@/lib/validations/auth.schema";

export default function RegisterPage() {
  const { register } = useAuth();

  return (
    <>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Create Account
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Sign up to get started
        </Typography>
      </Box>

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
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Field name="name">
                {({ field }: any) => (
                  <TextField
                    {...field}
                    type="text"
                    label="Name"
                    placeholder="Enter your name"
                    fullWidth
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                )}
              </Field>

              <Field name="email">
                {({ field }: any) => (
                  <TextField
                    {...field}
                    type="email"
                    label="Email"
                    placeholder="Enter your email"
                    fullWidth
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
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
                  />
                )}
              </Field>

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={isSubmitting}
                startIcon={isSubmitting && <CircularProgress size={20} />}
              >
                Register
              </Button>
            </Box>
          </Form>
        )}
      </Formik>

      <Box sx={{ textAlign: "center", mt: 3 }}>
        <Typography variant="body2" color="text.secondary">
          Already have an account?{" "}
          <Link
            href="/login"
            style={{
              color: "#4f46e5",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            Login here
          </Link>
        </Typography>
      </Box>
    </>
  );
}
