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

  const handleSearch = useCallback(
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

  return { handleSearch };
};

export default useTableFilter;
