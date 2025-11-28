"use client";

import { Formik, Form, Field } from "formik";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { registerSchema } from "@/lib/validations/auth.schema";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import styles from "../styles.module.css";

export default function RegisterPage() {
  const { register } = useAuth();

  return (
    <>
      <div className={styles.authHeader}>
        <h1 className={styles.authTitle}>Create Account</h1>
        <p className={styles.authSubtitle}>Sign up to get started</p>
      </div>

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
          <Form className={styles.authForm}>
            <Field name="name">
              {({ field }: any) => (
                <Input
                  {...field}
                  type="text"
                  label="Name"
                  placeholder="Enter your name"
                  error={touched.name && errors.name ? errors.name : undefined}
                />
              )}
            </Field>

            <Field name="email">
              {({ field }: any) => (
                <Input
                  {...field}
                  type="email"
                  label="Email"
                  placeholder="Enter your email"
                  error={
                    touched.email && errors.email ? errors.email : undefined
                  }
                />
              )}
            </Field>

            <Field name="password">
              {({ field }: any) => (
                <Input
                  {...field}
                  type="password"
                  label="Password"
                  placeholder="Create a password"
                  error={
                    touched.password && errors.password
                      ? errors.password
                      : undefined
                  }
                  helperText="Min 8 characters, 1 uppercase, 1 lowercase, 1 number"
                />
              )}
            </Field>

            <Button type="submit" fullWidth isLoading={isSubmitting}>
              Register
            </Button>
          </Form>
        )}
      </Formik>

      <div className={styles.authFooter}>
        Already have an account?{" "}
        <Link href="/login" className={styles.authLink}>
          Login here
        </Link>
      </div>
    </>
  );
}
