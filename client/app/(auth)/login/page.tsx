"use client";

import { Formik, Form, Field } from "formik";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { loginSchema } from "@/lib/validations/auth.schema";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import styles from "../styles.module.css";

export default function LoginPage() {
  const { login } = useAuth();

  return (
    <>
      <div className={styles.authHeader}>
        <h1 className={styles.authTitle}>Welcome Back</h1>
        <p className={styles.authSubtitle}>Login to your account</p>
      </div>

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
          <Form className={styles.authForm}>
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
                  placeholder="Enter your password"
                  error={
                    touched.password && errors.password
                      ? errors.password
                      : undefined
                  }
                />
              )}
            </Field>

            <Button type="submit" fullWidth isLoading={isSubmitting}>
              Login
            </Button>
          </Form>
        )}
      </Formik>

      <div className={styles.authFooter}>
        Don&apos;t have an account?{" "}
        <Link href="/register" className={styles.authLink}>
          Register here
        </Link>
      </div>
    </>
  );
}
