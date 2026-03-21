"use client";
import Table from "@/components/ui/table/Table";
import { ICoupon, IPagination } from "@/types";
import axiosInstance from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { columns } from "./CouponsTableColumns";

const CouponsList = () => {
  const params = useSearchParams();
  const { data, isLoading, isRefetching, refetch } = useQuery({
    queryKey: ["coupon"],
    queryFn: async () => {
      const {
        data: { data, paginate, result },
      } = await axiosInstance<{
        data: ICoupon[];
        result: number;
        paginate: IPagination;
      }>(`/coupon`);
      return { data, paginate, result };
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
        currentPage={data?.paginate.currentPage as number}
        pagesCount={data?.paginate.totalPages as number}
        numberOfAllItems={data?.result || 0}
        pageSize={data?.paginate.limit as number}
        showRefreshBtn
        queryKeys={["coupon"]}
      />
    </>
  );
};

export default CouponsList;
