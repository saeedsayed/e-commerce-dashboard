"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

type QueryParam = {
  name: string;
  value: string;
};

type SearchParam = {
  searchBy: string;
  query: string;
};

const useTableFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const activeFilters = [
    ...new Set(
      params
        .keys()
        .toArray()
        .filter((p) => p.startsWith("table_filter_"))
        .map((p) =>
          p.replace("table_filter_", "").replace("min", "").replace("max", ""),
        ),
    ),
  ];

  const createQueryString = useCallback(
    (newParams: QueryParam[]) => {
      const currentParams = new URLSearchParams(params.toString());
      newParams.forEach(({ name, value }) => {
        const trimmedValue = value.trim();
        const currentValue = params.get(`table_filter_${name}`);
        if (!trimmedValue && !currentValue) return;
        if (!trimmedValue && currentValue) {
          currentParams.delete(`table_filter_${name}`);
          return;
        }
        if (trimmedValue !== currentValue) {
          currentParams.set(`table_filter_${name}`, trimmedValue);
        }
      });
      return currentParams.toString();
    },
    [params],
  );

  const handleFilter = useCallback(
    (searchParams: SearchParam[]) => {
      const queryString = createQueryString(
        searchParams.map(({ searchBy, query }) => ({
          name: searchBy,
          value: query,
        })),
      );
      const url = queryString ? `${pathname}?${queryString}` : pathname;
      router.push(url);
    },
    [createQueryString, pathname, router],
  );

  const removeFilter = (searchName: string) => {
    const filterList = params
      .keys()
      .toArray()
      .filter(
        (p) =>
          p.replace("min", "") === `table_filter_${searchName}` ||
          p.replace("max", "") === `table_filter_${searchName}`,
      )
      .map((s) => ({ searchBy: s.replace("table_filter_", ""), query: "" }));
    handleFilter(filterList);
  };

  const removeAllFilters = () => {
    const filterList = params
      .keys()
      .toArray()
      .filter((p) => p.startsWith("table_filter_"))
      .map((p) => ({ searchBy: p.replace("table_filter_", ""), query: "" }));
    handleFilter(filterList);
  };

  return { handleFilter, activeFilters, removeFilter, removeAllFilters };
};

export default useTableFilter;
