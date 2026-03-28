"use client";

import { useCallback, useState } from "react";

export function useSmartFilter() {
  const [filters, setFilters] = useState<Record<string, string>>({});

  const getFilter = useCallback(
    (key: string): string => {
      return filters[key] || "";
    },
    [filters]
  );

  const updateFilter = useCallback(
    (key: string, value: string, _options?: { debounce?: number }) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  return { getFilter, updateFilter };
}
