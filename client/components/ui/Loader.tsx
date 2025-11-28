import React from "react";
import styles from "./styles.module.css";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  fullPage?: boolean;
}

export const Loader: React.FC<LoaderProps> = ({
  size = "md",
  fullPage = false,
}) => {
  if (fullPage) {
    return (
      <div className={styles.loaderFullPage}>
        <div className={`${styles.loader} ${styles[size]}`}></div>
      </div>
    );
  }

  return <div className={`${styles.loader} ${styles[size]}`}></div>;
};
