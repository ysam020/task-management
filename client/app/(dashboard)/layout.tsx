"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { TaskProvider } from "@/contexts/TaskContext";
import { Loader } from "@/components/ui/Loader";
import { Header } from "@/components/layout/Header";
import styles from "./styles.module.css";

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
    return <Loader fullPage />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <TaskProvider>
      <div className={styles.dashboardLayout}>
        <Header />
        <main className={styles.dashboardMain}>{children}</main>
      </div>
    </TaskProvider>
  );
}
