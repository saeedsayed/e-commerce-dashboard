"use client";
import Table from "@/components/ui/table/Table";
import { IShippingMethod } from "@/types";
import axiosInstance from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { columns } from "./ShippingMethodsTableColumns";

const ShippingMethodsList = () => {
  const params = useSearchParams();
  const { data, isLoading, isRefetching, refetch } = useQuery({
    queryKey: ["shipping"],
    queryFn: async () => {
      const {
        data: { data },
      } = await axiosInstance<{
        data: IShippingMethod[];
        // result: number;
        // paginate: IPagination;
      }>(`/shipping?isActive=all`);
      return { data };
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
        numberOfAllItems={data?.data?.length || 0}
        pageSize={data?.data?.length as number}
        showRefreshBtn
        queryKeys={["shipping"]}
      />
    </>
  );
};

export default ShippingMethodsList;
