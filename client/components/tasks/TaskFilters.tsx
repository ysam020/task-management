"use client";

import { useTasks } from "@/contexts/TaskContext";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { debounce } from "@/lib/utils/helper";
import { TaskStatus } from "@/lib/types";
import { useCallback, useEffect, useState } from "react";
import styles from "./styles.module.css";

export function TaskFilters() {
  const { filters, setFilters } = useTasks();
  const [searchInput, setSearchInput] = useState(filters.search || "");

  // Debounced search
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setFilters({ ...filters, search: value, page: 1 });
    }, 500),
    [filters]
  );

  useEffect(() => {
    debouncedSearch(searchInput);
  }, [searchInput, debouncedSearch]);

  const handleStatusChange = (value: string) => {
    setFilters({
      ...filters,
      status: value === "all" ? undefined : (value as TaskStatus),
      page: 1,
    });
  };

  const handleSortChange = (value: string) => {
    const [sortBy, sortOrder] = value.split("-");
    setFilters({
      ...filters,
      sortBy: sortBy as any,
      sortOrder: sortOrder as "asc" | "desc",
      page: 1,
    });
  };

  return (
    <div className={styles.filters}>
      <Input
        type="text"
        placeholder="Search tasks..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className={styles.searchInput}
      />

      <Select
        value={filters.status || "all"}
        onChange={(e) => handleStatusChange(e.target.value)}
        options={[
          { value: "all", label: "All Status" },
          { value: TaskStatus.PENDING, label: "Pending" },
          { value: TaskStatus.IN_PROGRESS, label: "In Progress" },
          { value: TaskStatus.COMPLETED, label: "Completed" },
        ]}
      />

      <Select
        value={`${filters.sortBy}-${filters.sortOrder}`}
        onChange={(e) => handleSortChange(e.target.value)}
        options={[
          { value: "createdAt-desc", label: "Newest First" },
          { value: "createdAt-asc", label: "Oldest First" },
          { value: "title-asc", label: "Title A-Z" },
          { value: "title-desc", label: "Title Z-A" },
          { value: "updatedAt-desc", label: "Recently Updated" },
        ]}
      />
    </div>
  );
}
