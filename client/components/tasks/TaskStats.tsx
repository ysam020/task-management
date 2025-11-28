"use client";

import { useTasks } from "@/contexts/TaskContext";
import styles from "./styles.module.css";

export function TaskStats() {
  const { stats } = useTasks();

  const statsData = [
    {
      label: "Total Tasks",
      value: stats?.total || 0,
      color: "blue",
    },
    {
      label: "Pending",
      value: stats?.pending || 0,
      color: "yellow",
    },
    {
      label: "In Progress",
      value: stats?.inProgress || 0,
      color: "purple",
    },
    {
      label: "Completed",
      value: stats?.completed || 0,
      color: "green",
    },
  ];

  return (
    <div className={styles.statsGrid}>
      {statsData.map((stat) => (
        <div
          key={stat.label}
          className={`${styles.statCard} ${styles[stat.color]}`}
        >
          <div className={styles.statLabel}>{stat.label}</div>
          <div className={styles.statValue}>{stat.value}</div>
        </div>
      ))}
    </div>
  );
}
