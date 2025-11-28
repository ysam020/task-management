"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Loader } from "@/components/ui/Loader";
import styles from "./styles.module.css";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return <Loader fullPage />;
  }

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className={styles.authLayout}>
      <div className={styles.authContainer}>
        <div className={styles.authCard}>{children}</div>
      </div>
    </div>
  );
}
