"use client";
import Table from "@/components/ui/table/Table";
import { IOrder, IPagination } from "@/types";
import axiosInstance from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { columns } from "./OrdersTableColumns";

const OrdersList = () => {
  const params = useSearchParams();
  const { data, isLoading, isRefetching, refetch } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const {
        data: { data: orders, result, paginate },
      } = await axiosInstance<{
        data: IOrder[];
        paginate: IPagination;
        result: number;
      }>(`/orders?${params.toString()}`);
      console.log("data", data);
      return { orders, result, paginate };
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
        data={data?.orders || []}
        currentPage={data?.paginate?.currentPage || 1}
        pagesCount={data?.paginate?.totalPages || 1}
        numberOfAllItems={data?.result || 0}
        pageSize={data?.paginate?.limit || 0}
        showRefreshBtn
        queryKeys={["orders"]}
      />
    </>
  );
};

export default OrdersList;
