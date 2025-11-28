"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/Button";
import styles from "./styles.module.css";

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.headerLogo}>
          <h2 className={styles.headerTitle}>Task Manager</h2>
        </div>

        <div className={styles.headerActions}>
          <span className={styles.headerUser}>
            Welcome, <strong>{user?.name}</strong>
          </span>
          <Button variant="outline" size="sm" onClick={logout}>
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
