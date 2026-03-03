"use client";
import Table from "@/components/common/Table";
import { IPagination, IProduct } from "@/types";
import axiosInstance from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { columns } from "./ProductTableColumns";

const ProductList = () => {
  const params = useSearchParams();
  const { data, isLoading, isRefetching, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const {
        data: { data, results, paginate },
      } = await axiosInstance<{
        data: IProduct[];
        results: number;
        paginate: IPagination;
      }>(`/products?${params.toString()}`);
      return { data, results, paginate };
    },
  });

  useEffect(() => {
    refetch();
  }, [params, refetch]);

  return (
    <>
      <Table
        columns={columns}
        isLoading={isLoading || isRefetching}
        data={data?.data || []}
        currentPage={data?.paginate.currentPage as number}
        numberOfPages={data?.paginate.totalPages as number}
        numberOfAllItems={data?.results || 0}
        numberOfShowingItems={data?.paginate.limit as number}
      />
    </>
  );
};

export default ProductList;
