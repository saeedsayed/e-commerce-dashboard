"use client";
import Table from "@/components/ui/table/Table";
import { ICategory } from "@/types";
import axiosInstance from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { columns } from "./CategoriesTableColumns";

const CategoriesList = () => {
  const params = useSearchParams();
  const { data, isLoading, isRefetching, refetch } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const {
        data: { data, result },
      } = await axiosInstance<{
        data: ICategory[];
        result: number;
        // paginate: IPagination;
      }>(`/categories?${params.toString()}`);
      return { data, result };
    },
  });

  useEffect(() => {
    refetch();
  }, [params, refetch]);

  return (
    <>
      <Table
        columns={columns}
        isLoading={isLoading}
        isRefresh={isRefetching}
        data={data?.data || []}
        currentPage={1}
        pagesCount={1}
        numberOfAllItems={data?.result || 0}
        pageSize={data?.data?.length as number}
        showRefreshBtn
        queryKeys={["categories"]}
      />
    </>
  );
};

export default CategoriesList;
